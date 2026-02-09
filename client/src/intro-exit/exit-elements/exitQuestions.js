const overallExperienceQuestions = {
    overallExperience: {
        type: "likert",
        label: "Rate your overall experience with the platform",
        options: ["Very Poor", "Poor", "Fair", "Good", "Excellent", "Prefer not to answer"]
    },
    participation: {
        type: "likert",
        label: "I participated in the discussions more than I usually do on social media.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    engagement: {
        type: "likert",
        label: "It was easy for me to engage in the conversations.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    informative: {
        type: "likert",
        label: "I found the comments from other participants to be informative and high-quality.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    trust: {
        type: "likert",
        label: "I trust the information provided by other participants.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    agreement: {
        type: "likert",
        label: "I tended to agree with the other participants.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    time: {
        type: "likert",
        label: "I feel like I had enough time for each conversation.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    barriers: {
        type: "multiple",
        label: "Did you face any barriers when posting content?",
        options: [
            "None",
            "Lack of ideas",
            "Time Constraints",
            "Fear of negative feedback",
            "Technical difficulties",
            "Privacy concerns",
            "Other (please specify)"
        ],
        hasOther: true
    }
};

const aiEvaluationQuestions = {
    easyParticipation: {
        type: "likert",
        label: "The AI made it easier for me to participate in the discussion, compared to my usual experience on social media.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    naturalDiscussion: {
        type: "likert",
        label: "The AI felt natural in the context of the discussions.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    contentQuality: {
        type: "likert",
        label: "The content I created using the AI was high-quality.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    usefulness: {
        type: "likert",
        label: "I can imagine situations in which I would use this AI if it was available on social media.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    feedbackAI: {
        type: "text",
        label: "Any other feedback you would like to share about the AI.",
        multiline: true,
        rows: 4
    }
};

const socialMediaAIQuestions = {
    aiComfortability: {
        type: "likert",
        label: "I feel comfortable with AI being used on social media platforms.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiParticipation: {
        type: "likert",
        label: "AI suggestions can make it more likely for me to participate in online discussions.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiLessToxic: {
        type: "likert",
        label: "AI can make online discussions more positive and less toxic.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiLessPolarizing: {
        type: "likert",
        label: "AI can make discussions less polarizing.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiReducesMisinformation: {
        type: "likert",
        label: "AI can help reduce misinformation on social media.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiAccuracy: {
        type: "likert",
        label: "AI-generated is accurate and reliable.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    },
    aiRegulation: {
        type: "likert",
        label: "AI should be regulated to prevent misuse and ensure ethical use.",
        options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree", "Prefer not to answer"]
    }
};

const openFeedbackQuestions = {
    feedbackPlatform: {
        type: "text",
        label: "General feedback about the platform",
        multiline: true,
        rows: 4
    },
};

export {
    overallExperienceQuestions,
    aiEvaluationQuestions,
    socialMediaAIQuestions,
    openFeedbackQuestions
};