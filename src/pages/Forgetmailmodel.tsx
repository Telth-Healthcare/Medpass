import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { sendforgetmail } from '../API/UserApi';
import { Box, Button, TextField, Typography } from '@mui/material';

function Forgetmailmodel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await sendforgetmail({ email });

      setMessage('Password reset email sent successfully! Please check your email.');
      toast.success('Reset email sent! Check your inbox.');
      setEmail('');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to send reset email';
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          p: 4,
          borderRadius: 4,
          boxShadow: '5px 5px 10px 2px rgba(7, 66, 143, 0.58)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className='text-center mb-4'>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
        </div>

        <Box sx={{ spaceY: 2 }}>
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            sx={{ mb: 2 }}
            required
            error={message.includes('valid') || message.includes('required')}
            helperText={message.includes('valid') || message.includes('required') ? message : ''}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading || !email.trim()}
            size="large"
            sx={{
              py: 1.5,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </Button>
        </Box>

        {message && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: message.includes('success') || message.includes('sent')
                ? 'rgba(76, 175, 80, 0.1)'
                : 'rgba(244, 67, 54, 0.1)',
              color: message.includes('success') || message.includes('sent')
                ? 'success.main'
                : 'error.main',
              border: 1,
              borderColor: message.includes('success') || message.includes('sent')
                ? 'success.main'
                : 'error.main',
              animation: 'fadeIn 0.5s ease-in',
            }}
          >
            {message}
          </Box>
        )}

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#1565c0',
              }
            }}
          >
            Back to Login
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default Forgetmailmodel;