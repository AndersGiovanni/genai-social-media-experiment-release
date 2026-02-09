import React from "react";
import { Box, FormControl, FormLabel, Grid, Typography, RadioGroup, Radio, FormControlLabel, Checkbox, TextField } from "@mui/material";

export function KnowledgeAssessment({ questions, answers, onAnswer, onOtherInput }) {
    const renderQuestion = (questionId, questionConfig) => {
        const { type, label, options, topics } = questionConfig;

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

        if (type === "likert") {
            return (
                <Grid item xs={12} key={questionId}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">{label}</FormLabel>
                        {topics.map((topic) => (
                            <React.Fragment key={topic}>
                                <FormLabel component="legend" sx={{ fontSize: '0.875rem', mt: 5 }}>
                                    {topic}
                                </FormLabel>
                                <Box sx={{ display: 'flex', mt: 3, mb: 3 }}>
                                    <RadioGroup
                                        value={answers[`${questionId}_${topic}`] || ""}
                                        onChange={(e) => onAnswer(`${questionId}_${topic}`, e.target.value)}
                                        row
                                    >
                                        {Object.entries(options).map(([key, value]) => (
                                            <FormControlLabel
                                                key={key}
                                                value={key}
                                                control={<Radio />}
                                                label={value}
                                            />
                                        ))}
                                    </RadioGroup>
                                </Box>
                            </React.Fragment>
                        ))}
                    </FormControl>
                </Grid>
            );
        }
    };

    return (
        <Box sx={{ p: 3, mb: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                🧠 Topic Interests and Opinions
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                This is the last page before the experiment starts, we promise! The questions here are meant to get an idea of what you are interested in and what you think about certain topics.
            </Typography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {Object.entries(questions).map(([questionId, questionConfig]) =>
                    renderQuestion(questionId, questionConfig)
                )}
            </Grid>
        </Box>
    );
}