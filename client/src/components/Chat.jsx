import React, { useState, useEffect } from 'react';
import { OpenAI } from 'openai';
import ChatForm from './ChatForm';
import MessageList from './MessageList';
import { Typography, Divider } from '@mui/material';
import { EngagingSciencePrompt } from '../prompts/ChatPrompts';
import { formatPostForLLM } from '../utils/formatPostForLLM';
import { useGame, usePlayer, useRound, useStage } from "@empirica/core/player/classic/react";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});
const MAX_INTERACTIONS = 5; // Define the maximum number of interactions to keep in history
const MAX_USER_INPUTS = 8; // Define the maximum number of user inputs allowed

function encodeInteractions(interactions) {
    return interactions.map(({ role, content }) => `${role}: ${content}`).join('\n');
}

async function fetchChatCompletion(userInput, post_content, setOutput, setLoading, output, player) {
    setLoading(true);

    // Get the last n interactions
    const recentMessages = output.slice(0, MAX_INTERACTIONS * 2).reverse();

    const systemPrompt = EngagingSciencePrompt({ content: post_content });

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            ...recentMessages,
            { role: "user", content: userInput }
        ],
        max_tokens: 1000,
        temperature: 1.0,
        seed: Math.floor(Math.random() * 1000000),
    });
    if (response.choices && response.choices.length > 0) {
        const out = response.choices[0].message.content;
        const newOutput = [{ role: "assistant", content: out }, { role: "user", content: userInput }, ...output];
        setOutput(newOutput);
        const timestamp = new Date().toISOString();
        const chatLog = player.round.get('chat') || [];
        chatLog.push([`assistant: ${out}`, timestamp]);
        player.round.set('chat', chatLog); // Log conversation as list of strings
    }
    setLoading(false);
}

export function ChatHf() {
    const [output, setOutput] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [remainingInputs, setRemainingInputs] = useState(MAX_USER_INPUTS);
    const game = useGame();
    const round = useRound();
    const player = usePlayer();
    const stage = useStage();
    const initialSurvey = player.get('initialSurvey');


    useEffect(() => {
        player.round.set("remainingInputs", MAX_USER_INPUTS);
    }, []);

    useEffect(() => {
        setRemainingInputs(MAX_USER_INPUTS);
        player.round.set("remainingInputs", MAX_USER_INPUTS);
    }, [round.get('name')]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (remainingInputs > 0) {
            const userMessage = { role: "user", content: userInput };
            const chatLog = player.round.get('chat') || [];
            const timestamp = new Date().toISOString();
            chatLog.push([`user: ${userInput}`, timestamp]);
            player.round.set('chat', chatLog); // Log user message
            setOutput([userMessage, ...output]);
            setUserInput(""); // Clear input field
            await fetchChatCompletion(userInput, formatPostForLLM(round, player.id), setOutput, setLoading, output, player);

            const newRemainingInputs = remainingInputs - 1;
            setRemainingInputs(newRemainingInputs);
            player.round.set("remainingInputs", newRemainingInputs);
        }
    };

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto">
            <Typography variant="h5" gutterBottom align='center' sx={{ mb: 2 }}>
                🤖 AI Assistant
            </Typography>
            <Typography paragraph sx={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'gray' }}>
                The assistant is here to provide context, answer questions, and help you navigate the posts you’ll be engaging with. You can prompt it 8 times for each post.
            </Typography>
            <Divider></Divider>
            <MessageList messages={output} loading={loading} />
            <ChatForm
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
                remainingInputs={remainingInputs}
            />
        </div>
    );
}

export default ChatHf;