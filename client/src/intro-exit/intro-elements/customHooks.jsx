import { useState } from "react";
import { knowledgeAssessmentQuestions, demographicQuestions, socialMediaQuestions } from "./questions";

// Generic hook for handling form sections
function useFormSection(questionConfig) {
    // Initialize state based on question configuration
    const initialState = Object.keys(questionConfig).reduce((acc, questionId) => {
        const config = questionConfig[questionId];

        if (config.type === "multiple") {
            acc[questionId] = [];
        } else if (config.type === "likert") {
            if (config.topics) {
                // For multi-topic Likert questions
                config.topics.forEach(topic => {
                    acc[`${questionId}_${topic}`] = "";
                });
            } else {
                // For single Likert questions
                acc[questionId] = "";
            }
        } else {
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

    // Validate all questions are answered
    const isComplete = () => {
        return Object.entries(questionConfig).every(([questionId, config]) => {
            if (config.type === "likert") {
                if (config.topics) {
                    // Check all topics for multi-topic Likert
                    return config.topics.every(topic => {
                        const answer = answers[`${questionId}_${topic}`];
                        return answer !== "" && answer !== undefined;
                    });
                } else {
                    // Check single Likert question
                    return answers[questionId] !== "" && answers[questionId] !== undefined;
                }
            }

            const answer = answers[questionId];

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
function useDemographicInfo() {
    return useFormSection(demographicQuestions);
}

function useSocialMediaInfo() {
    return useFormSection(socialMediaQuestions);
}

function useKnowledgeAssessment() {
    return useFormSection(questionsKnowledgeAssessment);
}

// Validation functions for each section
function allFieldsAssignedDemographicInfo() {
    const formSection = useFormSection(demographicQuestions);
    return formSection.isComplete();
}

function allFieldsAssignedSocialMediaInfo() {
    const formSection = useFormSection(socialMediaQuestions);
    return formSection.isComplete();
}

function allFieldsAssignedKnowledgeAssessment() {
    const formSection = useFormSection(questionsKnowledgeAssessment);
    return formSection.isComplete();
}

export {
    useDemographicInfo,
    useSocialMediaInfo,
    useKnowledgeAssessment,
    useFormSection,
    allFieldsAssignedDemographicInfo,
    allFieldsAssignedSocialMediaInfo,
    allFieldsAssignedKnowledgeAssessment
};