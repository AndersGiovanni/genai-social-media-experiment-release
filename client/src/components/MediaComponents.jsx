import React, { useState } from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Grid, Fab, Button, Box, Chip } from '@mui/material';
import { AddCommentOutlined } from '@mui/icons-material';
import ReactionButton from './ReactionButton';
import CommentModalButton from './CommentModalButton';
import { addComment } from '../utils/dataHandlers';
import { ConversationStarterButton } from '../treatments/conversation-starter/ConversationStarter';

const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postTime) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute(s) ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour(s) ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} day(s) ago`;
    return postTime.toLocaleDateString();
};

export const ContentCard = ({
    content,
    onAddComment,
    onLikeComment,
    round,
    game,
    playerId,
    suggestionsEnabled,
    feedbackEnabled,
    conversationStarter,
    isNested,
    globalActions,
    modalOpen,
    setModalOpen,
    modalText,
    setModalText,
    handleClose
}) => {
    const participants = round.get('participants') || [];
    const player = participants.find(p => p.user_id === content.user_id);
    const playerName = player ? player.username : 'Unknown';
    const [showConversationStarter, setShowConversationStarter] = useState(false);

    const isPost = !content.parent_content_id;

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 1,
                ml: isPost ? 0 : 2,
                width: '100%',
                borderRadius: 2,
                marginBottom: isNested ? '8px' : '16px',
                boxShadow: isNested ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }
            }}
        >
            <CardContent sx={{ p: 0.8 }}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{playerName.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle2" sx={{ lineHeight: '24px' }}>
                            {playerName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: 12, mt: 0.2 }}>
                            #{content.content_id}
                            {!isPost && ` replying to #${content.parent_content_id}`}
                            {' - '}
                            {formatTimestamp(content.timestamp)}
                        </Typography>
                        <Box display="inline-block" ml={1}>
                            {formatTimestamp(content.timestamp) === 'Just now' && (
                                <Chip
                                    label="NEW"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#90EE90',
                                        color: '#006400',
                                        fontWeight: 'bold',
                                        fontSize: '0.7rem',
                                        height: '20px',
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {content.content || 'No content available'}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: 0.8 }}>
                <Grid container alignItems="center">
                    <Grid item xs={4} container justifyContent="center">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setModalOpen(true)}
                            startIcon={<AddCommentOutlined style={{ fontSize: 16 }} />}
                            style={{
                                borderRadius: '50px',
                                padding: '6px 16px',
                                minWidth: 'auto',
                                textTransform: 'none',
                            }}
                        >
                            Comment
                        </Button>
                        {conversationStarter && (
                            <ConversationStarterButton
                                setModalOpen={setModalOpen}
                                onConversationStart={() => {
                                    setShowConversationStarter(true);
                                }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={8} container justifyContent="center">
                        <ReactionButton
                            data={content}
                            contentId={content.content_id}
                            playerId={playerId}
                            round={round}
                            game={game}
                            globalActions={globalActions}
                        />
                    </Grid>
                </Grid>
            </CardActions>
            <CommentModalButton
                open={modalOpen}
                handleClose={handleClose}
                onSubmit={onAddComment}
                content={content}
                comments={round.get('comments') || []}
                participants={participants}
                suggestionsEnabled={suggestionsEnabled}
                feedbackEnabled={feedbackEnabled}
                conversationStarter={conversationStarter}
                showConversationStarter={showConversationStarter}
                setShowConversationStarter={setShowConversationStarter}
                modalText={modalText}
                setModalText={setModalText}
            />
        </Card>
    );
};