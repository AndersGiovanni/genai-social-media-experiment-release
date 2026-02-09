import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, TextField, Box } from '@mui/material';

export function DemographicInformation({ questions, answers, onAnswer, onOtherInput }) {
    const renderQuestion = (questionId, questionConfig) => {
        const { type, label, options, hasOther } = questionConfig;

        if (type === "single") {
            return (
                <FormControl key={questionId} component="fieldset" fullWidth margin="normal">
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup
                        value={answers[questionId] || ""}
                        onChange={(e) => onAnswer(questionId, e.target.value)}
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
                    {hasOther && answers[questionId] === "Other (please specify)" && (
                        <TextField
                            fullWidth
                            label="Please specify"
                            value={answers[`${questionId}Other`] || ""}
                            onChange={(e) => onOtherInput(questionId, e.target.value)}
                            margin="normal"
                        />
                    )}
                </FormControl>
            );
        }

        if (type === "multiple") {
            return (
                <FormControl key={questionId} component="fieldset" fullWidth margin="normal">
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
            );
        }
    };

    return (
        <Box>
            {Object.entries(questions).map(([questionId, questionConfig]) =>
                renderQuestion(questionId, questionConfig)
            )}
        </Box>
    );
}