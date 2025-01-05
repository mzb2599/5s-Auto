import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login,
  PersonAdd
} from '@mui/icons-material';

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card sx={{ width: '100%', p: 2 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isLogin ? 'Login' : 'Sign Up'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={isLogin ? <Login /> : <PersonAdd />}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>

              <Button
                fullWidth
                onClick={() => setIsLogin(!isLogin)}
                sx={{ textTransform: 'none' }}
              >
                {isLogin 
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AuthForms;