const knowledgeAssessmentQuestions = {
    topicsOfInterest: {
        type: "multiple",
        label: "Which topics are you most interested in? (Select all that apply)",
        options: [
            "Technology",
            "Science",
            "Health",
            "Finance",
            "Education",
            "Entertainment",
            "Politics",
            "Sports",
            "Environment",
            "Other (please specify)"
        ],
        hasOther: true
    },
    opinions: {
        type: "likert",
        label: "For the questions below, please select how much you agree with the statements.",
        topics: [
            "I stay informed about current events and issues in US politics.",
            "I think climate change is one of the most pressing issues of our time.",
            "I think healthcare should be accessible to everyone regardless of their financial status.",
            "I believe in the necessity of vaccination to prevent disease outbreaks.",
            "I think social media platforms should do more to combat misinformation.",
            "I feel that social media often promotes unhealthy comparisons and lifestyles.",
            "I think social media influences people’s perceptions of reality.",
        ],
        options: {
            1: "Strongly Disagree",
            2: "Disagree",
            3: "Neutral",
            4: "Agree",
            5: "Strongly Agree",
            6: "Prefer not to answer"
        }
    }
};

const demographicQuestions = {
    age: {
        type: "single",
        label: "What is your age group?",
        options: [
            "Under 18",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65+",
            "Prefer not to answer"
        ]
    },
    gender: {
        type: "single",
        label: "How do you identify your gender?",
        options: [
            "Male",
            "Female",
            "Non-binary",
            "Prefer not to answer"
        ]
    },
    education: {
        type: "single",
        label: "What is the highest level of education you have completed?",
        options: [
            "Did not graduate from high school",
            "High school graduate",
            "Some college but no degree",
            "2-year college degree",
            "4-year college degree",
            "Postgraduate degree (MA, MBA, JD, PhD, etc)",
            "Prefer not to answer"
        ]
    },
    occupation: {
        type: "multiple",
        label: "What is your current occupation or employment status?",
        options: [
            "Student",
            "Employed full-time",
            "Employed part-time",
            "Self-employed",
            "Unemployed",
            "Retired",
            "Other (please specify)",
            "Prefer not to answer"
        ],
        hasOther: true
    },
    partyAffiliation: {
        type: "single",
        label: "Which of the following best describes your political party affiliation or the political group you most closely align with? Please choose the option that best reflects your stance, even if you don't fully agree with everything that party stands for.",
        options: [
            "Strong Democrat",
            "Moderate Democrat",
            "Independent",
            "Moderate Republican",
            "Strong Republican",
            "Other (Libertarian, Green Party, etc.)",
            "Prefer not to answer"
        ]
    }
};

const socialMediaQuestions = {
    socialMediaPlatforms: {
        type: "multiple",
        label: "Which social media platforms do you use most frequently? (Select all that apply)",
        options: [
            "Facebook",
            "Twitter (X)",
            "Instagram",
            "LinkedIn",
            "TikTok",
            "Reddit",
            "Bluesky",
            "Mastodon",
            "Snapchat",
            "Other (please specify)",
            "Prefer not to answer"
        ],
        hasOther: true
    },
    healthcare: {
        type: "likert",
        label: "I seek information about health and wellbeing practices on online social media platforms.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    usPolitics: {
        type: "likert",
        label: "I stay informed about current events and issues in US politics.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    onlineParticipation: {
        type: "likert",
        label: "I often participate in online discussions on social media.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    easyEngagement: {
        type: "likert",
        label: "It is easy for me to engage in online conversations",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    informativeDiscussion: {
        type: "likert",
        label: "I find discussions on social media informative and high-quality",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    trustInformation: {
        type: "likert",
        label: "I trust the information shared by other users on social media.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    changeOpinion: {
        type: "likert",
        label: "I recall changing my opinion based on interactions on social media.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    agreeOpinions: {
        type: "likert",
        label: "I tend to agree with the opinions I see on social media.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    barriersPosting: {
        type: "multiple",
        label: "Do you face any barriers when posting content on social media? (Select all that apply):",
        options: [
            "None",
            "Lack of ideas",
            "Time constraints",
            "Fear of negative feedback",
            "Technical difficulties",
            "Privacy concerns",
            "Other (please specify)",
            "Prefer not to answer"
        ],
        hasOther: true
    }
};

const socialMediaAndAIQuestions = {
    comfortableWithAI: {
        type: "likert",
        label: "I feel comfortable with AI being used on social media platforms.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    aiSuggestions: {
        type: "likert",
        label: "AI suggestions can make it more likely for me to participate in online discussions.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    lessToxic: {
        type: "likert",
        label: "AI can make online discussions more positive and less toxic.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    lessPolarizing: {
        type: "likert",
        label: "AI can make discussions less polarizing.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    reduceMisinformation: {
        type: "likert",
        label: "AI can help reduce misinformation on social media.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    aiContentAccurate: {
        type: "likert",
        label: "AI-generated content is accurate and reliable.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    },
    aiRegulation: {
        type: "likert",
        label: "AI should be regulated to prevent misuse and ensure ethical use.",
        options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
            "Prefer not to answer"
        ]
    }
}

export { knowledgeAssessmentQuestions, demographicQuestions, socialMediaQuestions, socialMediaAndAIQuestions };