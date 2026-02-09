import { useState } from "react";
import {
    overallExperienceQuestions,
    aiEvaluationQuestions,
    socialMediaAIQuestions,
    openFeedbackQuestions
} from "./exitQuestions";

function useFormSection(questionConfig) {
    // Initialize state based on question configuration
    const initialState = Object.keys(questionConfig).reduce((acc, questionId) => {
        const config = questionConfig[questionId];

        if (config.type === "multiple") {
            acc[questionId] = [];
        } else if (config.type === "text") {
            acc[questionId] = "";
        } else {
            // single or likert
            acc[questionId] = "";
        }

        if (config.hasOther) {
            acc[`${questionId}Other`] = "";
        }
        return acc;
    }, {});

    const [answers, setAnswers] = useState(initialState);

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleOtherInput = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [`${questionId}Other`]: value
        }));
    };

    const isComplete = () => {
        return Object.entries(questionConfig).every(([questionId, config]) => {
            const answer = answers[questionId];

            // Text fields are optional
            if (config.type === "text") {
                return true;
            }

            // Check if answer exists
            const hasAnswer = config.type === "multiple"
                ? Array.isArray(answer) && answer.length > 0
                : answer !== "" && answer !== undefined;

            // If has other option and "Other" is selected, check other text
            if (config.hasOther &&
                ((config.type === "multiple" && answer?.includes("Other (please specify)")) ||
                    (config.type === "single" && answer === "Other (please specify)"))) {
                return hasAnswer && answers[`${questionId}Other`] !== "";
            }

            return hasAnswer;
        });
    };

    return {
        answers,
        handleAnswer,
        handleOtherInput,
        isComplete
    };
}

// Specific hooks for each section
function useOverallExperience() {
    return useFormSection(overallExperienceQuestions);
}

function useAIEvaluation() {
    return useFormSection(aiEvaluationQuestions);
}

function useSocialMediaAI() {
    return useFormSection(socialMediaAIQuestions);
}

function useOpenFeedback() {
    return useFormSection(openFeedbackQuestions);
}

// Keep the existing useUserRating hook
function useUserRating() {
    const [commentRatings, setCommentRatings] = useState({});
    const [participantRatings, setParticipantRatings] = useState({});

    return {
        commentRatings, setCommentRatings,
        participantRatings, setParticipantRatings
    };
}

export {
    useOverallExperience,
    useAIEvaluation,
    useSocialMediaAI,
    useOpenFeedback,
    useUserRating,
    useFormSection
};