import React from 'react';
import {
    Typography,
    Button,
    Container,
    Paper,
    Box,
    Alert,
    AlertTitle,
} from '@mui/material';
import { usePlayer } from "@empirica/core/player/classic/react";

export function RewardPage() {
    const player = usePlayer();
    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    🎉 Thank you for participating in our study!
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for participating in this experiment. Our goal is to explore the potential of implementing Large Language Model (LLM) interventions within a simulated social media framework. Through this study, we aim to study:
                </Typography>
                <Typography variant="body1" paragraph>
                    1. <strong>Trust Among Users:</strong> Whether the AI interventions increase trust among users towards other users and the content.
                </Typography>
                <Typography variant="body1" paragraph>
                    2. <strong>Foster More Open and Positive Discussions:</strong> Whether the AI interventions foster more open and positive discussions.
                </Typography>
                <Typography variant="body1" paragraph>
                    3. <strong>Reduce Polarization and Echo Chambers:</strong> Whether the AI interventions reduce polarization and echo chambers.
                </Typography>
                <Typography variant="body1" paragraph>
                    Your participation and feedback are invaluable in helping us understand the impact of AI interventions on social media dynamics. We hope this experience has provided you with new insights and fostered a deeper appreciation for the role of AI in enhancing online interactions. Thank you once again for your time and contribution.
                </Typography>
                <Alert severity="success">
                    <AlertTitle>Reward Token</AlertTitle>
                    The token <strong>{player.id}</strong> can be used on Prolific to receive payment.
                </Alert>
            </Paper>
        </Container>
    );
}