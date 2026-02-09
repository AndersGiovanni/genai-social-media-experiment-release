import { Container, Typography, Grid, Box, List, ListItem, ListItemText, Chip } from "@mui/material";

export function FeedbackTraining() {
    return (
        <Box sx={{
            minHeight: '200px',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'fixed',
            top: '80px',
            bottom: '0',
            left: '0',
            right: '0',
            padding: { xs: 2, sm: 3, md: 4 }
        }}>
            <Typography variant="h4" gutterBottom>Platform Introduction</Typography>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ flexGrow: 1 }}>
                {/* Left side: Text and information */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ height: '100%', overflowY: 'auto' }}>
                        <Typography variant="body1" paragraph>
                            <strong>🙋🏼‍♂️ Introduction</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            This section provides an overview of the platform's interface. Each conversation will contain content for you to interact with, and other users will also be actively engaging. You will see an initial post accompanied by comments. You can interact by clicking the "Comment" button to add a comment or the "React" button to express a reaction.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>📋 Instructions</strong>
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="- Once the timer here ends, you will be presented with a social media-like platform, as shown on the right." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<>- First, carefully read the content shown when you enter the conversation.</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<>- Your task is to <strong>engage with the content by expressing your opinions, commenting on posts, and reacting to them.</strong></>} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<>- You will have <strong>10 minutes</strong> to interact with each conversation.</>} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<>- There are a total of <strong>3 conversations</strong> to participate in.</>} />
                            </ListItem>
                        </List>

                        <Typography variant="body1" paragraph>
                            <strong>🤖 AI Feature</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You have been selected to try our{' '}
                            <Chip
                                label="AI Feedback"
                                size="small"
                                sx={{
                                    backgroundColor: '#E6F3FF', // Light blue color
                                    color: '#0066CC', // Darker blue text for contrast
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    height: '25px',
                                    display: 'inline-flex',
                                    verticalAlign: 'middle',
                                }}
                            />
                            {' '}tool.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            With the AI Feedback feature, you can get assistance to enhance your comments when responding to posts or other comments. After you've written your response, you can ask the AI to provide reflections and suggestions on various aspects of your comment. This feedback can help you improve the quality, clarity, and effectiveness of your contributions to the discussion. Feel free to use these insights to refine your thoughts and engage more meaningfully with the content and other users.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right side: Placeholder GIF */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            mb: -2  // Reduces margin bottom to 8px (theme spacing unit)
                        }}
                    >
                        <strong>Platform Demo</strong>
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: '200px', sm: '300px', md: '100%' },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <video
                            src="/demos/feedback.mov"
                            controls
                            controlsList="nodownload"
                            muted
                            playsInline
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}