import React from "react";
import { Box, FormControl, FormLabel, Grid, Typography, RadioGroup, Radio, FormControlLabel, TextField, Checkbox } from "@mui/material";

export function AiAssessment({ questions, answers, onAnswer, onOtherInput }) {
    const renderQuestion = (questionId, questionConfig) => {
        const { type, label, options, topics } = questionConfig;

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
                        {questionConfig.hasOther && answers[questionId]?.includes("Other (please specify)") && (
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
    };

    return (
        <Box sx={{ p: 3, mb: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                📱 Social Media and AI
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                Here we want to know what you think about AI and social media.
            </Typography>
            <Grid container spacing={5} sx={{ mt: 3 }}>
                {Object.entries(questions).map(([questionId, questionConfig]) =>
                    renderQuestion(questionId, questionConfig)
                )}
            </Grid>
        </Box>
    );
}