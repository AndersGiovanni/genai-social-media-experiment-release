import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import styled from 'styled-components';
import { CommentInput } from './SocialMediaStyles';
import { CommentSection } from './Suggestions';
import { FeedbackButton, FeedbackGenerator, FeedbackBoxes } from '../treatments/feedback/FeedbackGenerator';
import { ConversationStarterBox, ConversationStarterButton } from '../treatments/conversation-starter/ConversationStarter';
import ReactMarkdown from 'react-markdown';
import { usePlayer } from "@empirica/core/player/classic/react";

const StyledTextField = styled(CommentInput).attrs({
    as: 'textarea',
    rows: 4,
})`
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #e1e8ed;
    border-radius: 5px;
`;

const CommentModalButton = ({
    open,
    handleClose,
    onSubmit,
    content,
    suggestionsEnabled,
    feedbackEnabled,
    conversationStarter,
    showConversationStarter,
    setShowConversationStarter,
    modalText,
    setModalText
}) => {
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (isSubmitting) return;
        if (modalText && modalText.trim()) {
            setIsSubmitting(true);
            onSubmit(modalText, content.content_id); // Make sure content.content_id is the correct parent ID
            setModalText('');
            handleClose();
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    };

    return (
        <>
            <IconButton
                color="primary"
                onClick={handleClose}
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'grey.100',
                            p: 1,
                            borderRadius: 1,
                            mb: 2,
                            maxHeight: 200,
                            overflowY: 'auto',
                        }}
                    >
                        <Typography variant="body2" component="p" sx={{ fontStyle: 'italic' }}>
                            {content.content}
                        </Typography>
                    </Box>
                    {suggestionsEnabled ? (
                        <CommentSection
                            onSubmitComment={(comment) => {
                                onSubmit(comment, content.content_id);
                                handleClose();
                            }}
                            specificPart={content.content}
                            modalText={modalText}
                            setModalText={setModalText}
                            parentContentId={content.content_id}
                        />
                    ) : (
                        <>
                            <StyledTextField
                                placeholder="Type your comment here..."
                                value={modalText}
                                onChange={(e) => setModalText(e.target.value)}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Posting...' : 'Post'}
                                </Button>
                            </Box>
                            {feedbackEnabled && (
                                <FeedbackGenerator
                                    loading={loading}
                                    setLoading={setLoading}
                                    originalPost={content.content}
                                    userComment={modalText}
                                    contentId={content.content_id}
                                />
                            )}
                            {conversationStarter && (
                                <ConversationStarterBox
                                    onClose={() => setShowConversationStarter(false)}
                                    replyToComment={content.content}
                                    demographics={{}} // Add demographics if available
                                    triggerGeneration={showConversationStarter} // New prop to trigger generation
                                    contentId={content.content_id}
                                />
                            )}

                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default CommentModalButton;