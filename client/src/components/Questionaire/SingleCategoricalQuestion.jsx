import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Box } from "@mui/material";

export function SingleCategoricalQuestion({ label, name, value, options, onChange, horizontal = false }) {
    return (
        <FormControl component="fieldset" fullWidth>
            <Box display="flex" flexDirection="column" alignItems="left" width="100%">
                <FormLabel component="legend" sx={{ mb: 2 }}>{label}</FormLabel>
                <RadioGroup
                    row={horizontal}
                    name={name}
                    value={value}
                    onChange={onChange}
                    sx={{
                        width: '100%',
                        justifyContent: horizontal ? 'center' : 'flex-start'
                    }}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{
                                width: horizontal ? 'auto' : '100%',
                                justifyContent: 'flex-start'
                            }}
                        />
                    ))}
                </RadioGroup>
            </Box>
        </FormControl>
    );
}