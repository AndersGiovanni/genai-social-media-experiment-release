import React, { useEffect, useState, useCallback } from 'react';
import { usePlayer, useRound, useStage, useGame } from "@empirica/core/player/classic/react";
import { Container, Grid, Typography, Box, Button, Alert, Snackbar, AlertTitle } from '@mui/material';
import { ContentCard } from '../components/MediaComponents';
import { fetchData, addComment as addCommentHandler, addLike as addLikeHandler, organizeCommentsByParent } from '../utils/dataHandlers';
import { formatPostForLLM } from '../utils/formatPostForLLM';
import ChatHf from '../components/Chat';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';

export function Media() {
    const player = usePlayer();
    const round = useRound();
    const stage = useStage();
    const game = useGame();
    const [contentId, setContentId] = useState(0); // State to hold the global content_id
    const { chatEnabled, suggestionsEnabled, feedbackEnabled, conversationStarter } = game.get("treatment");
    const [globalActions, setGlobalActions] = useState([]);
    const [alert, setAlert] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [modalText, setModalText] = useState('');

    useEffect(() => {
        const fetchDataAndUpdate = () => {
            fetchData(game, stage, round, player);
        };
        fetchDataAndUpdate();
        round.set("post_content", formatPostForLLM(round, player.id));
    }, [round.get('name')]);

    useEffect(() => {
        const fetchCommentsAndActions = () => {
            const globalComments = round.get('comments');
            if (globalComments) {
                // Find the current max content_id
                const maxContentId = Math.max(...globalComments.map(comment => comment.content_id), 0);
                setContentId(maxContentId + 1); // Set the next content_id
            }
        };
        fetchCommentsAndActions();
        const interval = setInterval(fetchCommentsAndActions, 10); // Check every 5 seconds
        return () => clearInterval(interval);
    }, [round]);

    useEffect(() => {
        const fetchActions = () => {
            const actions = round.get('actions') || [];
            setGlobalActions(actions);
        };

        fetchActions();
        const interval = setInterval(fetchActions, 10);

        return () => clearInterval(interval);
    }, [round]);

    useEffect(() => {
        if (chatEnabled || suggestionsEnabled || feedbackEnabled || conversationStarter) {
            round.set("post_content", formatPostForLLM(round, player.id));
        }
    }, [chatEnabled, suggestionsEnabled, feedbackEnabled, conversationStarter, round, player, alert]);

    function onClick() {
        player.stage.set("submit", true);
    }

    useEffect(() => {
        const alertCheck = setInterval(() => {
            const latestAlert = round.get('latestAlert');
            if (latestAlert && (!alert || latestAlert.timestamp !== alert.timestamp)) {
                setAlert(latestAlert);
                setTimeout(() => {
                    setAlert(null);
                    round.set('latestAlert', null); // Clear the alert from the round
                }, 5000); // Automatically clear alert after 5 seconds
            }
        }, 1000);
        return () => clearInterval(alertCheck);
    }, [alert]);

    const setModalOpen = (contentId) => {
        setActiveModal(contentId);
    };

    const addComment = (commentText, parentContentId = null) => {
        const data = round.get('data');
        if (data) {
            addCommentHandler(data, commentText, player.id, round, game, parentContentId, contentId); // Pass the current contentId
            setContentId(contentId + 1); // Increment the contentId
        }
    };

    const likeComment = (contentId, likeType = 'heart') => {
        const data = round.get('data');
        if (data) {
            addLikeHandler(data, contentId, player.id, round, game, likeType); // Pass player.id
        }
    };

    const renderContentCard = (content, isNested = false) => (
        <ContentCard
            key={content.content_id}
            content={content}
            onAddComment={(text) => addComment(text, content.content_id)}
            onLikeComment={() => likeComment(content.content_id)}
            round={round}
            game={game}
            playerId={player.id}
            contentId={contentId}
            setContentId={setContentId}
            suggestionsEnabled={suggestionsEnabled}
            feedbackEnabled={feedbackEnabled}
            conversationStarter={conversationStarter}
            isNested={isNested}
            globalActions={globalActions.filter(action => action.content_id === content.content_id)}
            modalOpen={activeModal === content.content_id}
            setModalOpen={() => setModalOpen(content.content_id)}
            modalText={modalText}
            setModalText={setModalText}
            handleClose={() => setActiveModal(null)}
        />
    );

    const renderComments = (comments, commentsByParent, depth = 0) => {
        const indentValue = 24; // Fixed indentation value for each level
        const maxDepth = 50; // Maximum depth for indentation

        if (depth >= maxDepth) {
            return null; // Stop recursion if max depth is reached
        }

        const sortedComments = [...comments]
            .filter(comment => comment.content_id !== comment.parent_content_id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


        return sortedComments.map((comment, index) => (
            <Box
                key={`${comment.content_id}-${index}`}
                sx={{
                    position: 'relative',
                    marginLeft: depth > 0 ? `${indentValue}px` : 0,
                    paddingLeft: depth > 0 ? '20px' : '20px',
                    marginBottom: '16px',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        bottom: '16px', // Stop before the next comment
                        width: '2px',
                        backgroundColor: '#E2E8F0', // A light gray color
                        background: 'linear-gradient(to bottom, #e0e0e0 50%, transparent 50%)',
                        backgroundSize: '2px 8px', // Creates a dotted line effect
                        opacity: 0.7,
                    }
                }}
            >
                {renderContentCard(comment, depth > 0)}
                {commentsByParent[comment.content_id] && renderComments(commentsByParent[comment.content_id], commentsByParent, Math.min(depth + 1, maxDepth))}
            </Box>
        ));
    };

    return (
        <Container style={{ minHeight: '200px', minWidth: '100vw', display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'fixed', top: '80px', bottom: '0' }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(alert)}
                autoHideDuration={5000}
                onClose={() => setAlert(null)} // Clear alert state after 5 seconds
            >
                <Alert
                    severity="info"
                    sx={{
                        width: '120%', // Increased from 100%
                        maxWidth: '400px',
                        '& .MuiAlert-message': {
                            padding: '20px 0', // Add some vertical padding to the message
                        },
                        '& .MuiAlert-icon': {
                            fontSize: '2.5rem', // Larger icon
                        },
                    }}
                >
                    <AlertTitle>
                        🚨 New Comment!
                    </AlertTitle>
                    {alert?.message}
                </Alert>
            </Snackbar>
            <Box sx={{
                position: 'sticky',
                bottom: 0,
                py: { xs: 1, sm: 2 },
                px: { xs: 2, sm: 3, md: 4 },
                backgroundColor: 'background.paper',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                maxWidth: { sm: '600px', md: '900px', lg: '1200px' },
                margin: '0 auto'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                    sx={{
                        minWidth: { xs: '100px', sm: '120px' },
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                >
                    Next Conversation
                </Button>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
                📱 Social Media Content
            </Typography>
            <Typography paragraph>
                Below you find the social media conversation we invite you to engage with.
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={chatEnabled ? 12 : 12} sx={{ pr: chatEnabled ? '30%' : 0 }}>
                    {(() => {
                        const allComments = round.get('comments') || [];
                        const commentsByParent = organizeCommentsByParent(allComments);
                        const post = allComments.find(comment => !comment.parent_content_id);

                        return (
                            <>
                                {post && renderContentCard(post)}
                                {renderComments(commentsByParent[post?.content_id] || [], commentsByParent)}

                            </>
                        );
                    })()}
                </Grid>
                {chatEnabled && (
                    <Grid item xs={12} sm={4} sx={{ position: 'fixed', right: 0, top: '80px', bottom: 0, width: '30%' }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            borderLeft: '1px solid #e0e0e0', // Added subtle vertical line
                            pl: 2, // Added padding to avoid content touching the border
                            pr: 2 // Added padding to the right
                        }}>
                            <ChatHf />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container >
    );
}



