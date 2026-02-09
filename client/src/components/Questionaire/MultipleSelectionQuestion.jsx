import React from "react";
import { FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Box } from "@mui/material";
import { Input } from "@chakra-ui/react";

export function MultipleSelectionQuestion({ label, name, values, options, onChange, otherValue, setOtherValue }) {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{label}</FormLabel>
            <Box>
                {options.map((option) => (
                    <React.Fragment key={option}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={name}
                                    value={option}
                                    checked={values.includes(option)}
                                    onChange={(e) => onChange(option, e.target.checked)}
                                />
                            }
                            label={option}
                        />
                        {option === "Other (please specify)" && values.includes(option) && (
                            <TextField
                                name="other"
                                label="Please specify (saves when you type)"
                                value={otherValue}
                                onChange={(e) => setOtherValue(e.target.value)}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </FormControl>
    );
}