import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import { UserContext } from "../context/user.tsx";
import { useNavigate } from "react-router-dom";

const AuthForms = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState(true); // To control visibility of alerts

  const {
    userData,
    setUserData,
    addUser,
    isLogin,
    setIsLogin,
    changePasswordMail,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle form submission (login/signup)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const result = await addUser(userData);
      setSuccess(result.message);

      // Redirect based on login state
      if (isLogin) {
        localStorage.setItem('authToken', result.token)        
        navigate("/dashboard");
      } else {
        navigate("/login"); // Redirect after successful signup
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Handle password reset (forgot password)
  const handleForgotPassword = async (email: string) => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const result = await changePasswordMail(email);
      if (result.success) {
        setSuccess(result.message);
        alert(result.message);
        navigate("/login"); // Redirect to login after password reset
      } else {
        setError(result.message);
        alert(result.message);
      }
    } catch (err) {
      setError("An error occurred while resetting the password.");
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (error || success) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
    }
  }, [error, success]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isLogin ? "Login" : "Sign Up"}
            </Typography>

            {/* Display Error or Success Alerts */}
            {alertVisible && error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {alertVisible && success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {/* Signup Form */}
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                value={userData.username}
                onChange={handleChange}
              />
            )}

            {/* Main Form (Email & Password) */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={userData.password}
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

              {/* Confirm Password Field (only for Sign Up) */}
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
              )}

              {/* Forgot Password (only for Login) */}
              {isLogin && (
                <Button
                  onClick={() => handleForgotPassword(userData.email)}
                  sx={{
                    textTransform: "none",
                    display: "block",
                    marginLeft: "auto",
                    mb: 2,
                  }}
                >
                  Forgot password? Reset now
                </Button>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: isLogin ? -1 : 2, mb: 1 }}
                startIcon={isLogin ? <Login /> : <PersonAdd />}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>

              {/* Toggle Between Login and Signup */}
              <Button
                fullWidth
                onClick={() => setIsLogin(!isLogin)}
                sx={{ textTransform: "none" }}
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
