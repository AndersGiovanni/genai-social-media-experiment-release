import React, { useState, useMemo, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Box, HStack } from '@chakra-ui/react';
import { FaRegHeart, FaThumbsUp, FaThumbsDown, FaHeart, FaAngry, FaSurprise, FaSadTear, FaLaugh } from 'react-icons/fa';
import { Button, Badge, Tooltip } from '@mui/material';
import { addLike, updateLike, removeLike } from '../utils/dataHandlers'; // Import functions

const reactions = [
    { name: 'Like', icon: <FaThumbsUp size={16} /> },
    { name: 'Dislike', icon: <FaThumbsDown size={16} /> },
    { name: 'Love', icon: <FaHeart size={16} /> },
    { name: 'Angry', icon: <FaAngry size={16} /> },
    { name: 'Wow', icon: <FaSurprise size={16} /> },
    { name: 'Sad', icon: <FaSadTear size={16} /> }, // Added sad reaction
    { name: 'Funny', icon: <FaLaugh size={16} /> }, // Added funny reaction
];

const ReactionButton = ({ data, contentId, playerId, round, game, globalActions }) => {
    const [selectedReaction, setSelectedReaction] = useState(null);

    useEffect(() => {
        const actions = round.get('actions') || [];
        const userReaction = actions.find(action =>
            action.user_id === playerId &&
            action.content_id === contentId
        );

        if (userReaction) {
            const reaction = reactions.find(r => r.name === userReaction.like_type);
            setSelectedReaction(reaction);
        }
    }, [round, playerId, contentId]);

    const handleButtonClick = () => {
        if (selectedReaction) {
            removeLike(data, contentId, playerId, round, game);
            setSelectedReaction(null);
        } else {
            const defaultReaction = reactions.find(reaction => reaction.name === 'Love');
            addLike(data, contentId, playerId, round, game, defaultReaction.name);
            setSelectedReaction(defaultReaction);
        }
    };

    const handleReactionClick = (reaction) => {
        if (selectedReaction && selectedReaction.name === reaction.name) {
            removeLike(data, contentId, playerId, round, game);
            setSelectedReaction(null);
        } else {
            if (selectedReaction) {
                updateLike(data, contentId, playerId, round, game, reaction.name);
            } else {
                addLike(data, contentId, playerId, round, game, reaction.name);
            }
            setSelectedReaction(reaction);
        }
    };

    const reactionCounts = useMemo(() => {
        if (!globalActions || globalActions.length === 0) return {};
        return globalActions.reduce((counts, action) => {
            if (action.like_type in counts) {
                counts[action.like_type]++;
            } else {
                counts[action.like_type] = 1;
            }
            return counts;
        }, {});
    }, [globalActions]);

    const renderReactionIcons = () => {
        const sortedReactions = Object.entries(reactionCounts)
            .sort(([, a], [, b]) => b - a);

        return sortedReactions.map(([type, count]) => {
            const reaction = reactions.find(r => r.name === type);
            return reaction ? (
                <Tooltip key={type} title={`${count} ${type}`}>
                    <Box
                        display="inline-flex"
                        alignItems="center"
                        mr={1.5}
                        bgcolor="gray.100"
                        borderRadius="full"
                        px={1.5}
                        py={0.5}
                    >
                        {React.cloneElement(reaction.icon, {
                            size: 14, // Reduced from 18
                            color: '#4A5568'
                        })}
                        <Box
                            ml={1.5} // Increased from 1
                            fontSize="0.7rem" // Reduced from 'sm'
                            fontWeight="semibold"
                            color="gray.700"
                        >
                            {count}
                        </Box>
                    </Box>
                </Tooltip>
            ) : null;
        });
    };


    return (
        <HStack>
            <Popover trigger="hover" placement="top">
                <PopoverTrigger>
                    <Button
                        variant={selectedReaction ? "contained" : "outlined"}
                        color="primary"
                        onClick={handleButtonClick}
                        style={{
                            borderRadius: '50px',
                            padding: '6px 16px',
                            minWidth: 'auto',
                            textTransform: 'none',
                        }}
                        startIcon={selectedReaction ? selectedReaction.icon : <FaRegHeart size={16} />}
                    >
                        {selectedReaction ? selectedReaction.name : 'React'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    boxShadow="lg"
                    width="350px"
                    p={12}
                    borderRadius="lg" // More rounded corners
                    bg="rgba(255, 255, 255, 0.9)" // Slightly transparent background
                >
                    <PopoverArrow />
                    <PopoverBody>
                        <HStack spacing={2} justifyContent="space-around" p={2}>
                            {reactions.map((reaction) => (
                                <Tooltip title={reaction.name} key={reaction.name} placement="top"> {/* Use Material-UI Tooltip with placement */}
                                    <Box
                                        onClick={() => handleReactionClick(reaction)}
                                        _hover={{ transform: 'scale(1.4)' }} // Add hover effect
                                        p={2}
                                        cursor="pointer"
                                        transition="all 0.2s"
                                    >
                                        {reaction.icon}
                                    </Box>
                                </Tooltip>
                            ))}
                        </HStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {globalActions && globalActions.length > 0 && (
                <Box display="flex" alignItems="center">
                    {renderReactionIcons()}
                </Box>
            )}
        </HStack>
    );
};

export default ReactionButton;