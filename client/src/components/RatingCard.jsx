import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SingleCategoricalQuestion } from './Questionaire/SingleCategoricalQuestion';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    borderRadius: theme.shape.borderRadius * 2,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const RatingGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
}));

const ContentTypography = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const QuoteTypography = styled(Typography)(({ theme }) => ({
    fontStyle: 'italic',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
}));

const optionsMapping = {
    politicalAffiliation: ["Democrat", "Republican", "Other", "Don't know"],
    sharedValues: ["Yes", "No", "Don't know"],
    isBot: ["Yes", "No", "Don't know"],
    usedAI: ["Yes", "No", "Don't know"],
    default: ["1", "2", "3", "4", "5"]
};

export function RatingCard({ user, content, aspects, aspectLabels, ratings, onRatingChange, parentContent, comments }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <StyledCard>
            <StyledCardContent>
                <HeaderBox>
                    <StyledAvatar>{user[0].toUpperCase()}</StyledAvatar>
                    <Typography variant="h6" component="div">{user}</Typography>
                </HeaderBox>
                {parentContent ? (
                    <Button size="small" variant="outlined" onClick={handleClickOpen} sx={{ mt: 1, mb: 2 }}>
                        View Your Comment
                    </Button>
                ) : comments && comments.length > 0 && (
                    <Button size="small" variant="outlined" onClick={handleClickOpen} sx={{ mt: 1, mb: 2 }}>
                        View All Comments
                    </Button>
                )}
                {content && (
                    <ContentTypography variant="body2" component="p">
                        {content}
                    </ContentTypography>
                )}
                <StyledDivider />
                <RatingGrid container spacing={2}>
                    {aspects.map(aspect => (
                        <Grid item xs={12} key={aspect}>
                            <SingleCategoricalQuestion
                                label={aspectLabels[aspect] || `Rate ${aspect}`}
                                name={`${aspect}`}
                                value={ratings[aspect] || ""}
                                options={optionsMapping[aspect] || optionsMapping.default}
                                onChange={(e) => onRatingChange(aspect, e.target.value)}
                                horizontal={true}
                            />
                        </Grid>
                    ))}
                </RatingGrid>
            </StyledCardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>{parentContent ? "Your Comment" : "All Comments"}</DialogTitle>
                <DialogContent>
                    {parentContent ? (
                        <QuoteTypography>"{parentContent}"</QuoteTypography>
                    ) : (
                        comments && comments.map((comment, index) => (
                            <React.Fragment key={index}>
                                <QuoteTypography>{comment}</QuoteTypography>
                                {index < comments.length - 1 && <StyledDivider />}
                            </React.Fragment>
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </StyledCard>
    );
}