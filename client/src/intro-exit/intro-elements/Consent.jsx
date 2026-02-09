import React from 'react';
import {
    Typography,
    Button,
    Container,
    Paper,
    Box,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export function Consent({ onConsent }) {

    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                    Consent Form
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    👤 Eligibility
                </Typography>
                <Typography paragraph>
                    Participants must be 18 years old or older.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    🔒 Confidentiality
                </Typography>
                <Typography paragraph>
                    Your data will be kept confidential and used solely for research purposes. All information will be anonymized to protect your identity. Data will be stored securely and only accessible to the research team.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    🙏🏼 Voluntary Participation
                </Typography>
                <Typography paragraph>
                    Your participation in this study is entirely voluntary. You are free to withdraw at any time.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    📞 Contact Information
                </Typography>
                <Typography paragraph>
                    If you have any questions or concerns about this study, please contact:
                </Typography>
                <Typography paragraph>
                    • Name: Anders Giovanni Møller
                </Typography>
                <Typography paragraph>
                    • Email: andermol@umich.edu
                </Typography>
                <Typography paragraph>
                    If you have any questions regarding your rights as a participant, you may contact the Institutional Review Board (IRB) of University of Michigan by email at hrppumich@umich.edu.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    🤝 Consent Statement
                </Typography>
                <Typography paragraph>
                    I have read and understood the above information, and I consent to participate in this study.
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 4
                }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onConsent}
                        startIcon={<CheckCircleOutline />}
                        sx={{
                            padding: '10px 30px',
                            fontSize: '1.1rem'
                        }}
                    >
                        I Agree to Participate
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <img src="logos/um_banner2.png" alt="Banner 1" style={{ maxWidth: '48%', height: 'auto' }} />
                    <img src="logos/itu_banner.jpg" alt="Banner 1" style={{ maxWidth: '48%', height: 'auto' }} />
                </Box>
            </Paper>
        </Container>
    );
}