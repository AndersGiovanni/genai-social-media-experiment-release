import React, { useState } from 'react';
import { Button, Box, Skeleton, Typography, Avatar, Alert, List, ListItem, ListItemText } from '@mui/material';
import { AutoAwesome, SmartToy, Comment } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { OpenAI } from 'openai';
import { FeedbackPrompt } from '../../prompts/ChatPrompts';
import { usePlayer } from "@empirica/core/player/classic/react";
import { IconButton, Tooltip } from '@mui/material';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const FeedbackBox = ({ content, loading, index, userComment, totalFeedbacks }) => {
    const [isCommentVisible, setIsCommentVisible] = useState(false);

    const displayIndex = totalFeedbacks - index;

    return (
        <Box
            className="feedback-box"
            sx={{
                border: 1,
                borderColor: 'secondary.main',
                padding: 2,
                marginTop: 2,
                borderRadius: 2
            }}
        >
            {loading ? (
                <>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar>
                            <SmartToy />
                        </Avatar>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            Feedback #{displayIndex}
                        </Typography>
                        <Tooltip title="Show your comment">
                            <IconButton
                                size="small"
                                onClick={() => setIsCommentVisible(!isCommentVisible)}
                                sx={{ ml: 'auto' }}
                            >
                                <Comment fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box
                        id={`user-comment-${displayIndex}`}
                        sx={{
                            display: isCommentVisible ? 'block' : 'none',
                            mb: 2,
                            p: 1.5,
                            bgcolor: 'grey.100',
                            borderRadius: 1,
                            borderLeft: '4px solid',
                            borderColor: 'secondary.main',
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Your comment:
                        </Typography>
                        <Typography variant="body2">
                            {userComment}
                        </Typography>
                    </Box>

                    <List>
                        {Object.entries(content).map(([key, value]) => (
                            <ListItem key={key} sx={{ padding: 0 }}>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" component="span">
                                            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" paragraph>
                                            {Array.isArray(value) ? value.join('. ') : value}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export const FeedbackBoxes = ({ feedbacks, originalPost }) => (
    <Box sx={{ mt: 2 }}>
        {feedbacks && feedbacks.length > 0 ? (
            [...feedbacks].reverse().map((feedback, index) => (
                <FeedbackBox
                    key={feedback.id}
                    content={feedback.content}
                    loading={feedback.loading}
                    index={index}
                    userComment={feedback.userComment}
                    totalFeedbacks={feedbacks.length}
                />
            ))
        ) : (
            <Typography variant="body2" color="text.secondary">
                {originalPost ?
                    "No feedback generated yet. Click the button above to get AI feedback on your comment." :
                    "Please wait for the original post to be loaded before generating feedback."
                }
            </Typography>
        )}
    </Box>
);

const FeedbackButton = ({ onAddFeedback, disabled, remainingAttempts }) => (
    <Button
        variant="outlined"
        color="secondary"
        startIcon={<AutoAwesome />}
        onClick={onAddFeedback}
        disabled={disabled}
        sx={{
            mt: 2,
        }}
    >
        AI Feedback ({remainingAttempts})
    </Button>
);

const generateFeedback = async (originalPost, userComment) => {
    const systemPrompt = FeedbackPrompt({ originalPost, userComment });
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
        seed: 0,
    });


    if (response.choices && response.choices.length > 0) {
        const messageContent = response.choices[0].message.content;
        return JSON.parse(messageContent);
    } else {
        throw new Error('No feedback generated');
    }
};

export const FeedbackGenerator = ({ loading, setLoading, originalPost, userComment, contentId }) => {
    const [error, setError] = useState(null);
    const player = usePlayer();

    const handleAddFeedback = async () => {
        if (!userComment.trim()) {
            setError("Please enter a comment before requesting feedback.");
            return;
        }

        if (!originalPost) {
            setError("Please wait for the original post to be loaded before generating feedback.");
            return;
        }

        setError(null);
        const allFeedbackPosts = player.round.get('feedback_posts') || {};
        const feedbackPosts = allFeedbackPosts[contentId] || [];
        if (feedbackPosts.length >= 3) return;

        setLoading(true);
        const newFeedback = { id: feedbackPosts.length, content: null, loading: true, userComment: userComment };
        player.round.set('feedback_posts', {
            ...allFeedbackPosts,
            [contentId]: [...feedbackPosts, newFeedback]
        });

        try {
            const feedback = await generateFeedback(originalPost, userComment, {/* Add demographics here */ });

            // Log the input text, generated feedback, and timestamp
            const currentFeedbackLog = player.round.get('feedback') || {};
            const timestamp = new Date().toISOString();
            player.round.set('feedback', {
                ...currentFeedbackLog,
                [contentId]: [...(currentFeedbackLog[contentId] || []), [userComment, feedback, timestamp]]
            });

            const updatedAllFeedbackPosts = player.round.get('feedback_posts');
            const updatedFeedbackPosts = updatedAllFeedbackPosts[contentId].map(fb =>
                fb.id === newFeedback.id
                    ? { ...fb, content: feedback, loading: false, timestamp }
                    : fb
            );
            player.round.set('feedback_posts', {
                ...updatedAllFeedbackPosts,
                [contentId]: updatedFeedbackPosts
            });
        } catch (error) {
            console.error('Error generating feedback:', error);
            const updatedAllFeedbackPosts = player.round.get('feedback_posts');
            const filteredFeedbackPosts = updatedAllFeedbackPosts[contentId].filter(fb => fb.id !== newFeedback.id);
            player.round.set('feedback_posts', {
                ...updatedAllFeedbackPosts,
                [contentId]: filteredFeedbackPosts
            });
        } finally {
            setLoading(false);
        }
    };

    const allFeedbackPosts = player.round.get('feedback_posts') || {};
    const feedbackPosts = allFeedbackPosts[contentId] || [];

    return (
        <>
            {error && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    {error}
                </Alert>
            )}
            <FeedbackButton
                onAddFeedback={handleAddFeedback}
                disabled={feedbackPosts.length >= 3 || loading || !userComment.trim() || !originalPost}
                remainingAttempts={3 - feedbackPosts.length}
            />

            <FeedbackBoxes feedbacks={feedbackPosts} originalPost={originalPost} />
        </>
    );
};

export { FeedbackButton, FeedbackBox };
