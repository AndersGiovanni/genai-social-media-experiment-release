import React, { useEffect, useRef } from 'react';

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
        this.animationDuration = 50;
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor((i / length) * this.animationDuration * 0.5);
            const end = Math.floor((i / length) * this.animationDuration + this.animationDuration * 0.5);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class='dud'>${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Update the defaultPhrases array with more interesting content
const defaultPhrases = [
    "Welcome to the experiment! 🔬",
    "Did you know? Groups make better decisions than individuals 🤝",
    "Fun Fact: The 'wisdom of crowds' was discovered in 1907 📚",
    "Tip: Communication is key to success! 💭",
    "Remember to read instructions carefully 📖",
    "Your contribution matters! 🌟",
    "Get ready for an exciting collaboration 🚀",
    "Fun Fact: Diverse teams solve problems better! 🎯",
    "Take your time to think through decisions ⏳",
    "You'll be working with real people! 👥"
];

export function ScrambleText({ phrases = defaultPhrases, interval = 2000 }) {
    const elementRef = useRef(null);
    const scrambleRef = useRef(null);
    const counterRef = useRef(0);

    useEffect(() => {
        if (!elementRef.current) return;

        scrambleRef.current = new TextScramble(elementRef.current);
        let timeoutId;

        const next = async () => {
            // First set the text
            await scrambleRef.current.setText(phrases[counterRef.current]);

            // Update counter for next iteration
            counterRef.current = (counterRef.current + 1) % phrases.length;

            // Set timeout for next phrase
            timeoutId = setTimeout(next, interval);
        };

        // Start the sequence
        next();

        return () => {
            clearTimeout(timeoutId);
            if (scrambleRef.current) {
                cancelAnimationFrame(scrambleRef.current.frameRequest);
            }
        };
    }, [phrases, interval]);

    return (
        <div className="scramble-container">
            <div ref={elementRef} className="scramble-text"></div>
            <style>
                {`
                    .scramble-container {
                        height: 100%;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        font-family: 'Roboto Mono', monospace;
                    }
                    .scramble-text {
                        font-weight: 100;
                        font-size: 28px;
                        color: #1a1a1a;
                    }
                    .dud {
                        color: #757575;
                    }
                `}
            </style>
        </div>
    );
}