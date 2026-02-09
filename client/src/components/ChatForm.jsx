import React from 'react';
import { Box, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#FFFFFF', // Set background to white
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%', // Set to full width
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ChatForm = ({ userInput, setUserInput, handleSubmit, remainingInputs }) => (
  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
    <BootstrapInput
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Type your message..."
      fullWidth
      sx={{ mb: 2, pr: 2, pl: 0.3 }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pb: 2 }}>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        style={{
          borderRadius: '50px', // This makes it pill-shaped
          padding: '6px 16px', // Adjust padding as needed
          minWidth: 'auto', // Allows the button to shrink
          textTransform: 'none', // Prevents uppercase text
        }}
        disabled={remainingInputs === 0}
      >
        Send ({remainingInputs})
      </Button>
    </Box>
  </Box>
);

export default ChatForm;