import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    InputAdornment,
    TextField,
    Dialog,
    DialogContent,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Chip
} from '@mui/material';
import { ReplyGenerator } from './ReplyGenerator';
import { formatPostForLLM } from '../utils/formatPostForLLM';
import { useGame, usePlayer, useRound } from "@empirica/core/player/classic/react";
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const CommentIconButton = ({ onClick }) => {
    return (
        <Tooltip title="Get AI suggestions" placement='left' arrow>
            <IconButton
                onClick={onClick}
                aria-label="comment"
                color="info"
                sx={{
                    backgroundColor: 'rgba(128, 0, 128, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(128, 0, 128, 0.3)',
                    },
                    borderRadius: '50%',
                    transition: 'background-color 0.3s',
                    padding: '4px', // Smaller padding for smaller button
                }}
            >
                <AutoAwesomeIcon sx={{ color: 'purple', fontSize: '25px' }} />
            </IconButton>
        </Tooltip>
    );
};

const ReplyDialog = ({ isOpen, onClose, replies, onSelectReply, loading, onRefetch, refetchCount }) => {
    const theme = useTheme();

    const getChipProps = (index) => {
        const theme = useTheme();
        switch (index) {
            case 0:
                return {
                    label: "Agree",
                    sx: {
                        bgcolor: alpha(theme.palette.success.main, 0.3),
                        color: theme.palette.success.dark,
                        height: '24px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: alpha(theme.palette.success.main, 0.2),
                        },
                    }
                };
            case 1:
                return {
                    label: "Neutral",
                    sx: {
                        bgcolor: alpha(theme.palette.primary.main, 0.3),
                        color: theme.palette.primary.dark,
                        height: '24px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                        },
                    }
                };
            case 2:
                return {
                    label: "Disagree",
                    sx: {
                        bgcolor: alpha(theme.palette.error.main, 0.3),
                        color: theme.palette.error.dark,
                        height: '24px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.2),
                        },
                    }
                };
            default:
                return { label: "", sx: { bgcolor: theme.palette.grey[100] } };
        }
    };
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent>
                <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap" justifyContent="center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card
                            key={index}
                            onClick={() => !loading && replies && replies[index] && onSelectReply(replies[index].reply)}
                            sx={{
                                marginBottom: '10px',
                                cursor: loading ? 'default' : 'pointer',
                                boxShadow: 3,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    backgroundColor: loading ? 'inherit' : 'rgba(128, 0, 128, 0.2)',
                                    transform: loading ? 'none' : 'scale(1.02)',
                                },
                                width: 'calc(100% - 20px)', // Adjust width for bigger boxes
                                padding: '20px', // Increase padding for better spacing
                            }}
                        >
                            <CardContent>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{}} aria-label="recipe">
                                            🤖
                                        </Avatar>
                                    }
                                    title="AI Assistant"
                                />
                                <Typography variant="h5" component="div" fontWeight="bold">
                                    {index + 1}
                                    <Chip {...getChipProps(index)} ml={2} />
                                </Typography>
                                {loading ? (
                                    <Box display="flex" justifyContent="flex-start"> {/* Align to the left */}
                                        <img src="/writing3.gif" alt="Loading..." width="50" height="50" /> {/* Use the GIF from the public folder */}
                                    </Box>
                                ) : (
                                    <Typography variant="body2">
                                        {replies && replies[index] ? replies[index].reply : 'No suggestion available'}
                                    </Typography> // Access the reply property
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onRefetch}
                        disabled={refetchCount >= 3 || loading} // Disable after 3 clicks or if loading
                    >
                        Try Again ({3 - refetchCount} left)
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

// Define BootstrapInput styled component
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#FFFFFF', // Set background to white
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: '100%', // Set to full width
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const CommentSection = ({ onSubmitComment, specificPart, modalText, setModalText, parentContentId }) => {
    const [refetchCount, setRefetchCount] = useState(0); // Track refetch count
    const [specificPartState, setSpecificPartState] = useState(specificPart); // Initialize with prop

    const game = useGame();
    const round = useRound();
    const player = usePlayer();

    const fetchReplies = async () => {
        player.round.set("load_suggestions", true)
        const timestamp = new Date().toISOString();
        const result = await ReplyGenerator(formatPostForLLM(round, player.id), specificPartState);
        if (result.replies) {
            // Get the current suggestions list or initialize it as an empty array
            const suggestions = player.round.get('suggestions') || [];
            // Add the tuple (specificPartState, result.replies) to the list
            suggestions.push([specificPartState, result.replies, timestamp, parentContentId]);
            // Update the player state with the new list
            player.round.set('suggestions', suggestions);
        } else {
            console.error(result.error);
        }
        player.round.set("load_suggestions", false)
    };

    const handleIconClick = async () => {
        player.round.set("suggestions_modal_open", true)
        await fetchReplies();
    };

    const handleRefetch = async () => {
        if (refetchCount < 3) {
            setRefetchCount(refetchCount + 1);
            await fetchReplies();
        }
    };

    const handleSelectReply = (replyContent) => {
        setModalText(replyContent);
        const timestamp = new Date().toISOString();
        // Get the current suggestionsSelected list or initialize it as an empty array
        const suggestionsSelected = player.round.get('suggestionsSelected') || [];
        // Push the new replyContent to the list
        suggestionsSelected.push([replyContent, timestamp]);
        // Update the player state with the new list
        player.round.set('suggestionsSelected', suggestionsSelected);
        player.round.set("suggestions_modal_open", false)
    };

    useEffect(() => {
        setRefetchCount(0); // Reset refetch count when specificPart changes
    }, [specificPartState]);

    const handleButtonClick = () => {
        onSubmitComment(modalText);
        setModalText('');
        player.round.set("suggestions_modal_open", false)
    };

    return (
        <Box>
            <FormControl variant="standard" fullWidth>
                <BootstrapInput
                    placeholder="Write a comment..." // Use placeholder
                    value={modalText}
                    onChange={(e) => setModalText(e.target.value)}
                    id="bootstrap-input"
                    multiline // Enable multiline input
                    rows={4} // Set the number of rows to 4
                    startAdornment={
                        <InputAdornment position="start">
                            <CommentIconButton onClick={handleIconClick} />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                sx={{ mt: 2 }} // Add margin-top of 2 (theme spacing unit)
            >
                Post
            </Button>
            <ReplyDialog
                isOpen={player.round.get("suggestions_modal_open")}
                onClose={() => player.round.set("suggestions_modal_open", false)}
                replies={player.round.get("suggestions")?.at(-1)?.[1]}
                onSelectReply={handleSelectReply}
                loading={player.round.get("load_suggestions")} // Pass loading state to ReplyDialog
                onRefetch={handleRefetch} // Pass refetch handler to ReplyDialog
                refetchCount={refetchCount} // Pass refetch count to ReplyDialog
            />
        </Box>
    );
};

export { CommentSection, CommentIconButton };