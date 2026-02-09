import { OpenAI } from 'openai';
import { GenerateRepliesPrompt } from '../prompts/ChatPrompts';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function generateReplies(post_content, specificPart) {
    const systemPrompt = GenerateRepliesPrompt({ content: post_content, specificPart });
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt }
        ],
        max_tokens: 1000,
        temperature: 1.0,
        seed: Math.floor(Math.random() * 1000000)
    });

    if (response.choices && response.choices.length > 0) {
        const messageContent = response.choices[0].message.content;
        return { replies: JSON.parse(messageContent) };
    } else {
        return { error: 'No replies generated' };
    }
}

export async function ReplyGenerator(post_content, specificPart) {
    try {
        const result = await generateReplies(post_content, specificPart);
        return result;
    } catch (error) {
        return { error: error.message };
    }
}