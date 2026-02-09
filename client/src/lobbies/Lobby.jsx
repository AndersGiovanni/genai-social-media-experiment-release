import { useGame, usePlayer } from "@empirica/core/player/classic/react";
import React, { useState, useEffect } from "react";

import { Loading } from "@empirica/core/player/react";
import { ScrambleText } from './ScrambleText';
import { HoloCard } from "./Cards";

// Add this array at the top of the file, outside the component
const waitingRoomTips = [
    "Tip: Communication is key to success in group tasks! 🗣️",
    "Did you know? Groups often make better decisions than individuals 🤝",
    "Fun fact: The wisdom of crowds was first documented in 1907 📚",
    "Remember: Every team member's perspective is valuable 💡",
    "Tip: Take time to understand the task before starting ⏳",
];

export function Lobby() {
    const game = useGame();
    const player = usePlayer();
    const [tipIndex, setTipIndex] = useState(0);

    // Rotate through tips every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((current) => (current + 1) % waitingRoomTips.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (!player) {
        return <Loading />;
    }

    const treatment = player.get("treatment");

    if (!treatment || !treatment.playerCount) {
        warn("lobby: no treatment found on player");

        return <Loading />;
    }

    const customPhrases = [
        "Welcome to the experiment! 🔬",
        "We're glad that you are here! 🤗",
        "We're still waiting for the other players to join. 😴",
        "When they do, we'll start the experiment! 🚀",
        "It is a matter of minutes, maybe even seconds, before we start! 🕒",
        "Your contribution matters a lot! 🌟",
        "You'll be engaging with others! 🤝",
        "We will guide you through the experiment 📖",
        "At first, we will ask you a few questions. 🤔",
        "In the end, we will provide your token. 💰",
    ];

    return (
        <div className="flex h-full items-center justify-center background-animate">
            {/* Gradient Circles */}
            <div className="gradient-circle circle-1"></div>
            <div className="gradient-circle circle-2"></div>
            <div className="gradient-circle circle-3"></div>
            <div className="gradient-circle circle-4"></div>

            <div className="text-center max-w-md relative z-10">

                <div className="mt-6 h-24">
                    <ScrambleText
                        phrases={customPhrases}
                        interval={5000} // Adjust this value to make text stay longer/shorter
                    />
                </div>
            </div>

            <style>
                {`
                    .background-animate {
                        background: #f1f1f1;  /* Slightly darker background */
                        position: relative;
                        height: 100vh;
                        width: 100vw;
                        overflow: hidden;
                    }

                    .gradient-circle {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(40px);
                        opacity: 0.6;
                        transition: all 0.5s ease;
                    }

                    .circle-1 {
                        background: linear-gradient(#48cae4, #90e0ef);
                        width: 400px;
                        height: 400px;
                        top: -100px;
                        right: -100px;
                        animation: float1 15s ease-in-out infinite;
                    }

                    .circle-2 {
                        background: linear-gradient(#ffd6cc, #ffafcc);
                        width: 300px;
                        height: 300px;
                        bottom: -50px;
                        left: -50px;
                        animation: float2 10s ease-in-out infinite;
                    }

                    .circle-3 {
                        background: linear-gradient(#90e0ef, #48cae4);
                        width: 250px;
                        height: 250px;
                        bottom: 100px;
                        right: 100px;
                        animation: float3 12s ease-in-out infinite;
                    }

                    .circle-4 {
                        background: linear-gradient(#ffafcc, #ffd6cc);
                        width: 350px;
                        height: 350px;
                        top: 100px;
                        left: 100px;
                        animation: float4 18s ease-in-out infinite;
                    }

                    @keyframes float1 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(-30px, 30px) rotate(5deg); }
                        50% { transform: translate(-60px, 0) rotate(0deg); }
                        75% { transform: translate(-30px, -30px) rotate(-5deg); }
                    }

                    @keyframes float2 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(20px, -20px) scale(1.1); }
                    }

                    @keyframes float3 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        33% { transform: translate(-25px, -25px) rotate(10deg); }
                        66% { transform: translate(25px, 25px) rotate(-10deg); }
                    }

                    @keyframes float4 {
                        0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                        25% { transform: translate(25px, 25px) scale(1.05) rotate(5deg); }
                        50% { transform: translate(50px, 0) scale(1.1) rotate(0deg); }
                        75% { transform: translate(25px, -25px) scale(1.05) rotate(-5deg); }
                    }
                `}
            </style>
        </div>
    );
}