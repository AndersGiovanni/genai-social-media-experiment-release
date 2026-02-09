import React from "react";
import { Box, Typography } from "@mui/material";

export function NoGames() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                p: 4
            }}
        >
            <Box
                sx={{
                    maxWidth: 600,
                    textAlign: "center",
                    backgroundColor: "white",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        color: "#2c3e50",
                        fontWeight: "medium",
                        mb: 3
                    }}
                >
                    No Experiments Available
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "#5f6368",
                        lineHeight: 1.8
                    }}
                >
                    There are currently no experiments available or all sessions are in progress.
                    <br />
                    <br />
                    Please return on Prolific at this time.
                    <br />
                    <br />
                    We regularly open new study sessions,
                    so you may check back later. Thank you for your interest and we apologize for the inconvenience!
                </Typography>
            </Box>
        </Box>
    );
}