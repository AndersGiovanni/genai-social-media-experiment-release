import React from 'react';
import {
    Typography,
    Button,
    Container,
    Paper,
    Box,
} from '@mui/material';

import {
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';


export function TaskIntroduction({ next }) {
    return (
        <Container maxWidth="lg">
            <Paper elevation={0} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                    Welcome to Our Social Media Engagement Study!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    💡 Purpose of the Study
                </Typography>
                <Typography paragraph>
                    We are conducting a study to explore how participants engage with different types of social media posts of various topics.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    💪🏼 What You'll Do
                </Typography>
                <Typography component="div">
                    <Typography component="div" gutterBottom sx={{ mt: 2, mb: 2 }}>
                        If you choose to participate in this study, this is what you will do:
                    </Typography>
                    <UnorderedList mb={16} spacing={6}>
                        <ListItem>You will be placed in a room with [N] other participants and exposed to a social media platform. </ListItem>
                        <ListItem>During the experiment, you will see a live social media conversation with a post and a few comments. You and the other participants will have 10 minutes to <b>interact and engage</b> with the content by <b>liking and commenting</b>. </ListItem>
                        <ListItem>This process will be repeated for <b>three different posts</b>, one at a time. </ListItem>
                        <ListItem>Before and after the experiment, you will be asked to answer some <b>questions</b>.</ListItem>
                    </UnorderedList>
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    🤖 ChatGPT/AI Assistance
                </Typography>
                <Typography paragraph>
                    Throughout the experiment, you are <b>NOT ALLOWED</b> to use any EXTERNAL ChatGPT/AI-assisted functionality.
                </Typography>


                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    💸 Your Participation and Compensation
                </Typography>
                <Typography paragraph>
                    Your participation is completely voluntary, and you can choose to stop at any time without any consequences. You will receive your payment upon completing the final survey.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    🚨 Benefits and Risks
                </Typography>
                <Typography paragraph>
                    There are no anticipated risks beyond those encountered in everyday social media use. You might encounter posts and content that include misinformation or opinions that differ from your own. You might also experience exposure to negative or toxic content.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                    ⏳ Time Commitment
                </Typography>
                <Typography paragraph>
                    The study will take approximately 30-40 minutes to complete.
                </Typography>

            </Paper>
        </Container>
    );
}