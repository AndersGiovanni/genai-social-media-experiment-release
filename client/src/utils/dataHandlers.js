import { formatPostForLLM } from './formatPostForLLM.js';
import { usePlayer, useRound, useStage, useGame } from "@empirica/core/player/classic/react";

// Utility function to organize comments by parent ID
export const organizeCommentsByParent = (comments) => {
    const commentsByParent = {};
    comments.forEach((comment) => {
        const parentId = comment.parent_content_id;
        if (!commentsByParent[parentId]) {
            commentsByParent[parentId] = [];
        }
        commentsByParent[parentId].push(comment);
    });
    return commentsByParent;
};

// Function to handle adding a comment
export const addComment = (data, commentText, playerId, round, game, parentContentId = null, contentId) => {


    const dataFileId = round.get('name');
    const allComments = game.get(`comments-${dataFileId}`) || [];
    const latestComments = round.get('comments') || []; // Get the latest comments
    const participants = round.get('participants') || []; // Get the participants

    // Add the current player to participants if not already present
    if (!participants.some(p => p.user_id === playerId)) {
        participants.push({
            user_id: playerId,
            username: `Player ${playerId.toString().slice(-4)}` // Generate a short unique name based on playerId
        });
        round.set('participants', participants); // Update global state
        game.set(`participants-${dataFileId}`, [...participants]);
    }

    const timestamp = new Date().toISOString();
    const newComment = {
        content_id: contentId,
        parent_content_id: parentContentId,
        user_id: playerId,
        content: commentText,
        timestamp: timestamp,
    };

    // Update the comments in the round data
    const currentComments = round.get('comments') || [];
    const updatedComments = [...currentComments, newComment];
    round.set('comments', updatedComments);

    // Update post content
    round.set("post_content", formatPostForLLM(round, playerId));

    game.set(`comments-${dataFileId}`, [...allComments, newComment]);

    // Update the latestAlert in the round data
    const newAlert = parentContentId
        ? `New reply to comment #${parentContentId}`
        : `New comment added`;

    round.set('latestAlert', { message: newAlert, timestamp: Date.now() });

};

// Function to handle adding a like
export const addLike = (data, contentId, playerId, round, game, likeType = 'heart') => {
    if (!round || typeof round.get !== 'function' || typeof round.set !== 'function') {
        console.error('Invalid round object');
        return;
    }

    const dataFileId = round.get('name');

    const latestActions = round.get('actions') || []; // Get the latest actions
    const participants = round.get('participants') || []; // Get the participants

    // Add the current player to participants if not already present
    if (!participants.some(p => p.user_id === playerId)) {
        participants.push({
            user_id: playerId,
            username: `Player ${playerId.toString().slice(-4)}` // Generate a short unique name based on playerId
        });
        round.set('participants', participants); // Update global state
    }

    const newLikeAction = {
        user_id: playerId,
        content_id: contentId,
        like_type: likeType,
        timestamp: new Date().toISOString()
    };

    latestActions.push(newLikeAction);
    round.set('actions', [...latestActions]); // Update global state
    game.set(`actions-${dataFileId}`, [...latestActions]);

    // Update post content
    round.set("post_content", formatPostForLLM(round, playerId));
};

// Function to handle updating a like
export const updateLike = (data, contentId, playerId, round, game, newLikeType) => {
    if (!round || typeof round.get !== 'function' || typeof round.set !== 'function') {
        console.error('Invalid round object');
        return;
    }

    const dataFileId = round.get('name');

    const latestActions = round.get('actions') || [];
    const actionIndex = latestActions.findIndex(action => action.user_id === playerId && action.content_id === contentId);

    if (actionIndex !== -1) {
        latestActions[actionIndex].like_type = newLikeType;
        latestActions[actionIndex].timestamp = new Date().toISOString();
        round.set('actions', [...latestActions]);
        game.set(`actions-${dataFileId}`, [...latestActions]);

        // Update post content
        round.set("post_content", formatPostForLLM(round, playerId));
    } else {
        console.error(`Action not found for player ${playerId} and content ${contentId}`);
    }
};

// Function to handle removing a like
export const removeLike = (data, contentId, playerId, round, game) => {
    if (!round || typeof round.get !== 'function' || typeof round.set !== 'function') {
        console.error('Invalid round object');
        return;
    }

    const dataFileId = round.get('name');

    let latestActions = round.get('actions') || [];
    latestActions = latestActions.filter(action => !(action.user_id === playerId && action.content_id === contentId));
    round.set('actions', [...latestActions]);
    game.set(`actions-${dataFileId}`, [...latestActions]);

    // Update post content
    round.set("post_content", formatPostForLLM(round, playerId));
};

// Function to fetch data periodically
export const fetchData = async (game, stage, round, player) => {
    try {
        const dataFileId = round.get('name');
        const roundId = round.get('roundId');
        const gameId = game.id;

        // Check if data has already been fetched for this round
        if (round.get('dataFetched') === `${gameId}-${dataFileId}-${roundId}`) {
            return;
        }

        const playerId = player.id;

        const [postsResponse, commentsResponse, participantsResponse] = await Promise.all([
            fetch(`posts/posts-${dataFileId}.json`),
            fetch(`posts/comments-${dataFileId}.json`),
            fetch(`posts/participants-${dataFileId}.json`)
        ]);

        const posts = await postsResponse.json();
        const comments = await commentsResponse.json();
        const participants = await participantsResponse.json();

        // Merge posts into comments
        const allComments = [...posts, ...comments];

        // Add the current player to participants if not already present
        if (!participants.some(p => p.user_id === player.id)) {
            participants.push({
                user_id: player.id,
                username: `Player ${player.id.toString().slice(-4)}` // Generate a short unique name based on playerId
            });
        }


        const initialData = {
            comments: allComments,
            participants: Array.isArray(participants) ? participants : [],
            actions: []
        };

        round.set('data', initialData); // Set initial data to stage
        round.set('posts', posts); // Set initial posts to stage
        round.set('comments', initialData.comments); // Set initial comments to stage
        round.set('actions', initialData.actions); // Set initial actions to stage
        round.set('participants', initialData.participants); // Set initial participants to stage
        round.set('startTime', new Date().toISOString());
        game.set(`data-${dataFileId}`, initialData);

        round.set("post_content", formatPostForLLM(round, player.id));

        // Mark this round as having completed data fetch
        round.set('dataFetched', `${gameId}-${dataFileId}-${roundId}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
