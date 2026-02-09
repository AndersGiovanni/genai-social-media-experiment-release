import React, { useState, useEffect, useRef } from 'react';
import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import { Box, Typography, Container } from '@mui/material';
import { IntroStepper } from "../components/Stepper";
import { UserExperience } from "./exit-elements/UserExperience";
import { UserRating } from "./exit-elements/UserRating";
import { RewardPage } from "./exit-elements/RewardPage";
import {
  useOverallExperience,
  useAIEvaluation,
  useSocialMediaAI,
  useOpenFeedback,
  useUserRating
} from "./exit-elements/customHooksExit";

export function ExitSurvey({ next }) {
  const player = usePlayer();
  const game = useGame();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['User Experience', 'User Rating', 'Exit (Reward)'];

  // Initialize all form sections
  const overallExperience = useOverallExperience();
  const aiEvaluation = useAIEvaluation();
  const socialMediaAI = useSocialMediaAI();
  const openFeedback = useOpenFeedback();
  const userRating = useUserRating();
  const [allAnswered, setAllAnswered] = useState(false);

  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep === 0) {
      const currentData = player.get("exitSurvey") || {};
      const newData = {
        ...currentData,
        openFeedback: openFeedback.answers
      };
      player.set("exitSurvey", newData);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    const surveyData = {
      overallExperience: overallExperience.answers,
      aiEvaluation: aiEvaluation.answers,
      socialMediaAI: socialMediaAI.answers,
      openFeedback: openFeedback.answers,
      userRating: {
        commentRatings: userRating.commentRatings,
        participantRatings: userRating.participantRatings
      }
    };
    player.set("exitSurvey", surveyData);
    next();
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0: {
        const { chatEnabled, suggestionsEnabled, feedbackEnabled, conversationStarter } = game.get("treatment");
        const showAIQuestions = chatEnabled || suggestionsEnabled || feedbackEnabled || conversationStarter;

        const isOverallComplete = overallExperience.isComplete();
        const isAIComplete = !showAIQuestions || aiEvaluation.isComplete();
        const isSocialMediaComplete = socialMediaAI.isComplete();

        return isOverallComplete && isAIComplete && isSocialMediaComplete;
      }
      case 1:
        return allAnswered;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UserExperience
            overallExperience={overallExperience}
            aiEvaluation={aiEvaluation}
            socialMediaAI={socialMediaAI}
            openFeedback={openFeedback}
          />
        );
      case 1:
        return (
          <UserRating
            userRating={userRating}
            onAllAnsweredChange={setAllAnswered}
          />
        );
      case 2:
        return <RewardPage />;
      default:
        return 'Unknown step';
    }
  };

  // Save overall experience answers when they change
  useEffect(() => {
    if (Object.keys(overallExperience.answers).length > 0) {
      const currentData = player.get("exitSurvey") || {};
      const newData = {
        ...currentData,
        overallExperience: overallExperience.answers
      };
      player.set("exitSurvey", newData);
    }
  }, [overallExperience.answers]);

  // Save AI evaluation answers when they change
  useEffect(() => {
    if (Object.keys(aiEvaluation.answers).length > 0) {
      const currentData = player.get("exitSurvey") || {};
      const newData = {
        ...currentData,
        aiEvaluation: aiEvaluation.answers
      };
      player.set("exitSurvey", newData);
    }
  }, [aiEvaluation.answers]);

  // Save social media AI answers when they change
  useEffect(() => {
    if (Object.keys(socialMediaAI.answers).length > 0) {
      const currentData = player.get("exitSurvey") || {};
      const newData = {
        ...currentData,
        socialMediaAI: socialMediaAI.answers
      };
      player.set("exitSurvey", newData);
    }
  }, [socialMediaAI.answers]);

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
        top: '1px',
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
    </Container>
  );
}