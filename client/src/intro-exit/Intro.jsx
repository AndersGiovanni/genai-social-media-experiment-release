import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { usePlayer, useGame, useStageTimer } from "@empirica/core/player/classic/react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { IntroStepper } from "../components/Stepper";
import { DemographicInformation } from "./intro-elements/DemographicInformation";
import { SocialMediaUsage } from "./intro-elements/SocialMediaUsage";
import { KnowledgeAssessment } from "./intro-elements/KnowledgeAssessment";
import { AiAssessment } from "./intro-elements/AiAssessment";
import { TaskIntroduction } from "./intro-elements/TaskIntroduction";
import { Container } from "@mui/material";
import { humanTimer } from "../components/Timer";
import { useFormSection } from "./intro-elements/customHooks";
import { demographicQuestions, socialMediaQuestions, knowledgeAssessmentQuestions, socialMediaAndAIQuestions } from "./intro-elements/questions";

export function InitialSurvey({ }) {
    const player = usePlayer();
    const stageTimer = useStageTimer();
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Task Introduction', 'Demographic Information', 'Social Media Usage', 'AI and Social Media'];

    const demographicForm = useFormSection(demographicQuestions);
    const socialMediaForm = useFormSection(socialMediaQuestions);
    const knowledgeAssessmentForm = useFormSection(knowledgeAssessmentQuestions);
    const aiAssessmentForm = useFormSection(socialMediaAndAIQuestions);

    useEffect(() => {
        if (Object.keys(demographicForm.answers).length > 0) {
            const currentData = player.get("initialSurvey") || {};
            const newData = {
                ...currentData,
                demographicInfo: demographicForm.answers
            };
            player.set("initialSurvey", newData);
        }
    }, [demographicForm.answers]);

    useEffect(() => {
        if (Object.keys(socialMediaForm.answers).length > 0) {
            const currentData = player.get("initialSurvey") || {};
            const newData = {
                ...currentData,
                socialMediaInfo: socialMediaForm.answers
            };
            player.set("initialSurvey", newData);
        }
    }, [socialMediaForm.answers]);

    useEffect(() => {
        if (Object.keys(aiAssessmentForm.answers).length > 0) {
            const currentData = player.get("initialSurvey") || {};
            const newData = {
                ...currentData,
                aiAssessmentInfo: aiAssessmentForm.answers
            };
            player.set("initialSurvey", newData);
        }
    }, [aiAssessmentForm.answers]);

    const handleNext = () => {
        if (isStepValid()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        player.set("initialSurveyFinished", true);
        setOpen(true);
    };

    const handleClose = () => {
        // Prevent closing the modal
    };

    const containerRef = useRef(null);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToTop();
    }, [activeStep]);

    const isStepValid = () => {
        let isValid;
        switch (activeStep) {
            case 0:
                isValid = true;
                break;
            case 1:
                isValid = demographicForm.isComplete();
                break;
            case 2:
                isValid = socialMediaForm.isComplete();
                break;
            case 3:
                isValid = aiAssessmentForm.isComplete();
                break;
            default:
                isValid = false;
        }

        return isValid;
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <TaskIntroduction />;

            case 1:
                return (
                    <DemographicInformation
                        questions={demographicQuestions}
                        answers={demographicForm.answers}
                        onAnswer={demographicForm.handleAnswer}
                        onOtherInput={demographicForm.handleOtherInput}
                    />
                );
            case 2:
                return (
                    <SocialMediaUsage
                        questions={socialMediaQuestions}
                        answers={socialMediaForm.answers}
                        onAnswer={socialMediaForm.handleAnswer}
                        onOtherInput={socialMediaForm.handleOtherInput}
                    />
                );
            case 3:
                return (
                    <AiAssessment
                        questions={socialMediaAndAIQuestions}
                        answers={aiAssessmentForm.answers}
                        onAnswer={aiAssessmentForm.handleAnswer}
                        onOtherInput={aiAssessmentForm.handleOtherInput}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container
            ref={containerRef}
            style={{
                minHeight: 'calc(100vh - 80px)',
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                position: 'fixed',
                top: '80px',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '20px',
            }}
        >
            <Box className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <IntroStepper
                    activeStep={activeStep}
                    steps={steps}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleFinish={handleFinish}
                    isStepValid={isStepValid()}
                >
                    <Box component="form" className="mt-8 space-y-8 divide-y divide-gray-400">
                        {getStepContent(activeStep)}
                    </Box>
                </IntroStepper>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: '10px', // Rounded corners
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
                        p: 4,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: 'lightgreen',
                            mb: 2
                        }}
                    >
                        <CheckCircleOutline sx={{ fontSize: 60, color: 'white' }} />
                    </Box>
                    <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Questionnaire Finished 🎉
                    </Typography>
                    <Typography id="modal-description">
                        You were quicker than average! Soon you will proceed to the next part of the experiment.
                    </Typography>
                    <Typography id="modal-description" variant="h6">
                        {stageTimer ? humanTimer(Math.round(stageTimer.remaining / 1000)) : 'Loading...'}
                    </Typography>
                </Box>
            </Modal>
        </Container>
    );
}
