import React, { useState, useEffect } from 'react';
import { TipsAndUpdates } from '@mui/icons-material';
import { Box, Typography, Skeleton, List, ListItem, ListItemText, Avatar, Fab, Tooltip } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { OpenAI } from 'openai';
import { ConversationStarterPrompt } from '../../prompts/ChatPrompts';
import { useRound, usePlayer, useGame } from "@empirica/core/player/classic/react";
import { formatPostForLLM } from '../../utils/formatPostForLLM';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const ConversationStarterButton = ({ setModalOpen, onConversationStart }) => {
    const handleClick = () => {
        setModalOpen(true);
        if (onConversationStart) {
            onConversationStart();
        }
    };

    return (
        <Tooltip title="AI-generated conversation starter" arrow>
            <Fab
                aria-label="conversation-starter"
                onClick={handleClick}
                size="small"
                sx={{
                    marginLeft: 2,
                    backgroundColor: deepPurple[200],
                    color: 'rgba(255, 255, 255, 1.0)',
                    '&:hover': {
                        backgroundColor: deepPurple[400],
                    },
                }}
            >
                <TipsAndUpdates style={{ fontSize: 16, transition: 'transform 0.9s' }} />
            </Fab>
        </Tooltip>
    );
};

const ConversationStarterBox = ({ onClose, replyToComment, triggerGeneration, contentId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const round = useRound();
    const player = usePlayer();
    const game = useGame();
    const postContent = formatPostForLLM(round, player.id);
    const { aiAccessToDemographics } = game.get("treatment");
    const demographics = aiAccessToDemographics ? player.get('demographics') : {};

    useEffect(() => {
        let isMounted = true;

        const generateStarter = async () => {
            const existingStarterContent = player.round.get("starterContent") || {};
            if (existingStarterContent[contentId]) {
                // Starter content already exists for this contentId, no need to generate
                return;
            }

            if (triggerGeneration && isMounted) {
                setIsLoading(true);
                try {
                    const generatedStarter = await generateConversationStarter(postContent, replyToComment, demographics);
                    if (isMounted) {
                        const updatedStarterContent = { ...existingStarterContent, [contentId]: generatedStarter };
                        player.round.set("starterContent", updatedStarterContent);

                        // Log generations
                        const existingStarters = player.round.get('conversation_starter') || [];
                        const timestamp = new Date().toISOString();
                        const newStarter = [replyToComment, generatedStarter, timestamp];
                        player.round.set('conversation_starter', [...existingStarters, newStarter]);
                    }
                } catch (error) {
                    console.error('Error generating conversation starter:', error);
                } finally {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                }
            }
        };

        generateStarter();

        return () => {
            isMounted = false;
        };
    }, [triggerGeneration, replyToComment, contentId]);

    const renderStarterContent = () => {
        const starterContent = player.round.get("starterContent") || {};
        const currentStarter = starterContent[contentId];
        if (!currentStarter) return null;

        return (
            <List>
                {Object.entries(currentStarter).map(([key, value]) => (
                    <ListItem key={key} sx={{ padding: 0 }}>
                        <ListItemText
                            primary={<Typography variant="body2" component="span"><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong></Typography>}
                            secondary={<Typography variant="body2" paragraph>{value}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    const starterContent = player.round.get("starterContent") || {};
    const hasExistingStarter = !!starterContent[contentId];

    return (
        <Box
            sx={{
                border: 1,
                borderColor: 'secondary.main',
                padding: 2,
                marginTop: 2,
                borderRadius: 2,
                position: 'relative'
            }}
        >
            {isLoading && !hasExistingStarter ? (
                <>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: deepPurple[400], mr: 2 }}>
                            <TipsAndUpdates />
                        </Avatar>
                        <Typography variant="h6">Conversation Starter</Typography>
                    </Box>
                    {hasExistingStarter ? renderStarterContent() : (
                        <Typography variant="body2">No conversation starter generated yet.</Typography>
                    )}
                </>
            )}
        </Box>
    );
};


const generateConversationStarter = async (content, replyToComment, demographics) => {
    const systemPrompt = ConversationStarterPrompt({ content, replyToComment, demographics });
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt }
        ],
        max_tokens: 1000,
        temperature: 1.0,
        seed: Math.floor(Math.random() * 1000000),
    });

    if (response.choices && response.choices.length > 0) {
        const messageContent = response.choices[0].message.content;
        return JSON.parse(messageContent);
    } else {
        throw new Error('No conversation starter generated');
    }
};

export { generateConversationStarter, ConversationStarterBox, ConversationStarterButton };