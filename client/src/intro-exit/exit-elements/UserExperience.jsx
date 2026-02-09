import React from 'react';
import { useGame } from "@empirica/core/player/classic/react";
import { Box, Typography, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { overallExperienceQuestions, aiEvaluationQuestions, socialMediaAIQuestions, openFeedbackQuestions } from './exitQuestions';

export function UserExperience({ overallExperience, aiEvaluation, socialMediaAI, openFeedback }) {
    const game = useGame();
    const { chatEnabled, suggestionsEnabled, feedbackEnabled, conversationStarter } = game.get("treatment");
    const showAIQuestions = chatEnabled || suggestionsEnabled || feedbackEnabled || conversationStarter;

    const renderQuestion = (questionId, questionConfig, answers, onAnswer, onOtherInput) => {
        const { type, label, options, hasOther } = questionConfig;

        if (type === "single" || type === "likert") {
            return (
                <Grid item xs={12} key={questionId}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">{label}</FormLabel>
                        <RadioGroup
                            value={answers[questionId] || ""}
                            onChange={(e) => onAnswer(questionId, e.target.value)}
                            row={type === "likert"}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            );
        }

        if (type === "multiple") {
            return (
                <Grid item xs={12} key={questionId}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">{label}</FormLabel>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option}
                                control={
                                    <Checkbox
                                        checked={answers[questionId]?.includes(option) || false}
                                        onChange={(e) => {
                                            const newValue = e.target.checked
                                                ? [...(answers[questionId] || []), option]
                                                : (answers[questionId] || []).filter(item => item !== option);
                                            onAnswer(questionId, newValue);
                                        }}
                                    />
                                }
                                label={option}
                            />
                        ))}
                        {hasOther && answers[questionId]?.includes("Other (please specify)") && (
                            <TextField
                                fullWidth
                                label="Please specify"
                                value={answers[`${questionId}Other`] || ""}
                                onChange={(e) => onOtherInput(questionId, e.target.value)}
                                margin="normal"
                            />
                        )}
                    </FormControl>
                </Grid>
            );
        }

        if (type === "text") {
            return (
                <Grid item xs={12} key={questionId}>
                    <TextField
                        fullWidth
                        multiline
                        rows={questionConfig.rows || 4}
                        label={label}
                        value={answers[questionId] || ""}
                        onChange={(e) => onAnswer(questionId, e.target.value)}
                        margin="normal"
                    />
                </Grid>
            );
        }
    };

    return (
        <Box sx={{ maxWidth: 1000, margin: 'auto', p: 3, mb: 6 }}>
            <Typography variant="h4" gutterBottom>Experience on the platform</Typography>

            {/* Overall Experience Section */}
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
                Overall Experience
            </Typography>
            <Grid container spacing={3}>
                {Object.entries(overallExperienceQuestions).map(([questionId, questionConfig]) =>
                    renderQuestion(
                        questionId,
                        questionConfig,
                        overallExperience.answers,
                        overallExperience.handleAnswer,
                        overallExperience.handleOtherInput
                    )
                )}
            </Grid>

            {/* AI Evaluation Section - Conditional Rendering */}
            {showAIQuestions && (
                <>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
                        AI Evaluation
                    </Typography>
                    <Grid container spacing={3}>
                        {Object.entries(aiEvaluationQuestions).map(([questionId, questionConfig]) =>
                            renderQuestion(
                                questionId,
                                questionConfig,
                                aiEvaluation.answers,
                                aiEvaluation.handleAnswer,
                                aiEvaluation.handleOtherInput
                            )
                        )}
                    </Grid>
                </>
            )}

            {/* Social Media and AI Section */}
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
                Social Media and AI
            </Typography>
            <Grid container spacing={3}>
                {Object.entries(socialMediaAIQuestions).map(([questionId, questionConfig]) =>
                    renderQuestion(
                        questionId,
                        questionConfig,
                        socialMediaAI.answers,
                        socialMediaAI.handleAnswer,
                        socialMediaAI.handleOtherInput
                    )
                )}
            </Grid>

            {/* Open Feedback Section */}
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
                Open Feedback
            </Typography>
            <Grid container spacing={3}>
                {Object.entries(openFeedbackQuestions).map(([questionId, questionConfig]) =>
                    renderQuestion(
                        questionId,
                        questionConfig,
                        openFeedback.answers,
                        openFeedback.handleAnswer,
                        openFeedback.handleOtherInput
                    )
                )}
            </Grid>
        </Box>
    );
}