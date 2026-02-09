import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

// GradientCircularProgress component
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

const MessageList = ({ messages, loading }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '20px', backgroundColor: '#ffffff', overflowY: 'auto' }}>
    {loading && (
      <Box sx={{ alignSelf: 'flex-start', margin: '10px 0' }}>
        <GradientCircularProgress />
      </Box>
    )}
    {messages.map((msg, index) => (
      <Box key={index} sx={{ margin: '10px 0', padding: '10px', borderRadius: '5px', backgroundColor: msg.role === "user" ? "#e1f5fe" : "#f8f9fa", alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: '80%', fontSize: '14px' }}>
        <Typography variant="body2">{msg.content}</Typography>
      </Box>
    ))}
  </Box>
);

export default MessageList;
