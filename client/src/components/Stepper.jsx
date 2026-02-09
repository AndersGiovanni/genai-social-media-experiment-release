import React from 'react';
import { Stepper, Step, StepLabel, Button, Tooltip, Box } from '@mui/material';

export const IntroStepper = ({ activeStep, steps, handleNext, handleBack, handleFinish, isStepValid, children }) => {
    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 4, mb: 2 }}>
                {children}
            </Box>
            <Box sx={{
                mt: 4,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                position: 'sticky',
                backgroundColor: 'background.paper',
                padding: 2,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Tooltip title={!isStepValid ? "Please answer all questions before proceeding" : ""} arrow>
                    <span>
                        <Button
                            onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                            disabled={!isStepValid}
                            variant="contained"
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </span>
                </Tooltip>
            </Box>
        </>
    );
};

export default IntroStepper;