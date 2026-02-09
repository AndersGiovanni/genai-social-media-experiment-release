import React, { useState, useEffect } from 'react';
import { usePlayer, useGame, usePlayers } from "@empirica/core/player/classic/react";
import { Button, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RatingCard } from '../../components/RatingCard';

const StyledBox = styled(Box)(({ theme }) => ({
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(3),
}));

export function UserRating({ userRating, next, onAllAnsweredChange }) {
    const player = usePlayer();
    const game = useGame();
    const players = usePlayers();

    const [comments, setComments] = useState([]);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const rounds = [0, 1, 2];
        const allComments = rounds.flatMap(round =>
            (game.get(`comments-${round}`) || []).map(comment => ({
                ...comment,
                uniqueId: `${round}-${comment.content_id}`
            }))
        );
        const allParticipants = players.filter((p) => p.id !== player.id);

        // Filter comments to only include responses to the current player's comments
        const playerComments = allComments.filter(comment => comment.user_id === player.id);
        const responsesToPlayer = allComments.filter(comment =>
            playerComments.some(playerComment =>
                playerComment.content_id === comment.parent_content_id &&
                comment.user_id !== player.id // Exclude self-responses
            )
        );

        // Shuffle and select up to 10 comments
        const shuffledComments = responsesToPlayer.sort(() => 0.5 - Math.random()).slice(0, 10);

        // Create a map of content_id to comment for easy lookup
        const commentMap = new Map(allComments.map(comment => [comment.uniqueId, comment]));

        setComments(shuffledComments.map(comment => ({
            ...comment,
            parentComment: commentMap.get(`${comment.round}-${comment.parent_content_id}`)
        })));

        const userComments = allComments.reduce((acc, comment) => {
            if (!acc[comment.user_id]) {
                acc[comment.user_id] = [];
            }
            acc[comment.user_id].push(comment.content);
            return acc;
        }, {});

        setParticipants(allParticipants.map(p => ({
            id: p.id,
            comments: userComments[p.id] || [] // Use p.id to match user_id
        })));
    }, [game, player.id]);

    useEffect(() => {
        const checkAllAnswered = () => {
            const allCommentRatings = comments.every(comment =>
                commentAspects.every(aspect =>
                    userRating.commentRatings[comment.uniqueId]?.[aspect]
                )
            );
            const allParticipantRatings = participants.every(participant =>
                participantAspects.every(aspect =>
                    userRating.participantRatings[participant.id]?.[aspect]
                )
            );
            const allAnswered = allCommentRatings && allParticipantRatings;
            onAllAnsweredChange(allAnswered);
        };

        checkAllAnswered();
    }, [comments, participants, userRating.commentRatings, userRating.participantRatings, onAllAnsweredChange]);


    const handleCommentRating = (uniqueId, aspect, rating) => {
        userRating.setCommentRatings(prev => ({
            ...prev,
            [uniqueId]: { ...prev[uniqueId], [aspect]: rating }
        }));
    };

    const handleParticipantRating = (userId, aspect, rating) => {
        userRating.setParticipantRatings(prev => ({
            ...prev,
            [userId]: { ...prev[userId], [aspect]: rating }
        }));
    };

    const ratingOptions = ["1", "2", "3", "4", "5"];
    const commentAspects = ["valueComment"];
    const participantAspects = ["positivity", "engagement", "politeness", "politicalAffiliation", "sharedValues", "isBot", "usedAI"];
    const aspectLabels = {
        positivity: "Rate the user's positivity",
        engagement: "Rate the user's engagement",
        politeness: "Rate the user's politeness",
        politicalAffiliation: "Rate the user's political affiliation",
        sharedValues: "Do you feel like you share the same values with the user?",
        isBot: "Do you think the user is a bot?",
        usedAI: "Do you think the user used AI assistance?",
        valueComment: "Rate the comment's value to the discussion"
    };

    return (
        <StyledBox>
            <Typography variant="h4" gutterBottom>Rate Comments</Typography>
            <Typography variant="h6" gutterBottom>Here we want your thoughts on all the responses you got to your own comments.</Typography>
            <Typography
                variant="body1"
                gutterBottom
                sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic'
                }}
            >
                Please rate the following comments from 1 (low) to 5 (high), with higher meaning better.
            </Typography>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <React.Fragment key={comment.uniqueId}>
                        <RatingCard
                            key={comment.uniqueId} // Ensure unique key for each RatingCard
                            user={comment.user_id.slice(-4)}
                            content={comment.content}
                            aspects={commentAspects}
                            aspectLabels={aspectLabels}
                            ratings={userRating.commentRatings[comment.uniqueId] || {}}
                            onRatingChange={(aspect, rating) => handleCommentRating(comment.uniqueId, aspect, rating)}
                            parentContent={comment.parentComment?.content}
                        />
                    </React.Fragment>
                ))
            ) : (
                <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                    You didn't receive any responses to your comments.
                </Typography>
            )}
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Rate Participants</Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Please give your overall impression of the other players.</Typography>
            <Typography
                variant="body1"
                gutterBottom
                sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic'
                }}
            >
                For numerical ratings, please rate from 1 (low) to 5 (high), with higher meaning better.
            </Typography>
            {participants.length > 0 ? (
                participants.map(participant => (
                    <React.Fragment key={participant.id}>
                        <RatingCard
                            key={participant.id} // Ensure unique key for each RatingCard
                            user={participant.id.slice(-4)}
                            aspects={participantAspects}
                            aspectLabels={aspectLabels}
                            ratings={userRating.participantRatings[participant.id] || {}} // Use participant.id
                            onRatingChange={(aspect, rating) => handleParticipantRating(participant.id, aspect, rating)} // Use participant.id
                            comments={participant.comments}
                        />
                    </React.Fragment>
                ))
            ) : (
                <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                    There were no other participants who made comments.
                </Typography>
            )}
        </StyledBox>
    );
}