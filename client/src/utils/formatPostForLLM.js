import { organizeCommentsByParent } from './dataHandlers';

export function formatPostForLLM(round, playerId) {
    const posts = round.get('posts') || [];
    const comments = round.get('comments') || [];
    const actions = round.get('actions') || [];
    const participants = round.get('participants') || [];

    const commentsByParent = organizeCommentsByParent(comments);

    const getUsername = (userId) => {
        if (userId === playerId) {
            return 'You';
        }
        const participant = participants.find(p => p.user_id === userId);
        const result = participant ? participant.username : 'Unknown';
        return result;
    };

    const getLikes = (contentId) => {
        const likes = actions.filter(action => action.content_id === contentId);
        const likeTypes = likes.reduce((acc, action) => {
            const isCurrentUser = action.user_id === playerId;
            const key = isCurrentUser ? `${action.like_type} (You)` : action.like_type;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(likeTypes).length > 0 ? likeTypes : "No likes yet";
    };

    const formatLikes = (likeTypes) => {
        if (likeTypes === "No likes yet") return likeTypes;
        return Object.entries(likeTypes)
            .map(([type, count]) => `${type}${count > 1 ? ` (${count})` : ''}`)
            .join(', ');
    };

    const formatComment = (comment, depth = 1) => { // Start depth at 1 for small indent
        const indent = ' '.repeat(depth * 2);
        const username = getUsername(comment.user_id);
        const likeTypes = getLikes(comment.content_id);
        const formattedLikes = formatLikes(likeTypes);
        let formattedComment = `\n${indent}${username}: ${comment.content}\n`;
        formattedComment += `${indent}  Likes: ${formattedLikes}\n`;

        const childComments = commentsByParent[comment.content_id] || [];
        const formattedChildComments = childComments.map(child => formatComment(child, depth + 1)).join('');
        return `${formattedComment}${formattedChildComments}`;
    };

    const formattedPosts = posts.map(post => {
        const username = getUsername(post.user_id);
        const likeTypes = getLikes(post.content_id);
        const formattedLikes = formatLikes(likeTypes);
        let result = `Post by ${username}:\n${post.content}\n`;
        result += `Likes: ${formattedLikes}\n`;

        const postComments = commentsByParent[post.content_id] || [];
        const formattedComments = postComments.map(comment => formatComment(comment)).join('');
        return `${result}${formattedComments}`;
    }).join('\n\n');

    return formattedPosts;
}
