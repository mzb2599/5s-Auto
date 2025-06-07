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
import { Visibility, VisibilityOff, Login, PersonAdd } from "@mui/icons-material";
import { UserContext } from "../context/user.tsx";
import { useNavigate } from "react-router-dom";

// Shared components and hooks
const PasswordField = ({ showPassword, setShowPassword, value, onChange }) => (
  <TextField
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type={showPassword ? "text" : "password"}
    id="password"
    autoComplete="current-password"
    value={value}
    onChange={onChange}
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
);

const EmailField = ({ value, onChange }) => (
  <TextField
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    value={value}
    onChange={onChange}
  />
);

const AuthAlerts = ({ error, success, alertVisible }) => {
  if (!alertVisible) return null;
  
  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
    </>
  );
};

// Login Component
const LoginForm = ({ toggleAuthMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);

  const { userData, setUserData, addUser, changePasswordMail, loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await loginUser(userData.email, userData.password);
      setError(""); 
      setSuccess(result.message);
      localStorage.setItem("authToken", result.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

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
        navigate("/login");
      } else {
        setError(result.message);
        alert(result.message);
      }
    } catch (err) {
      setError("An error occurred while resetting the password.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error || success) {
      setAlertVisible(true);
      const timer = setTimeout(() => setAlertVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <CardContent>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      <AuthAlerts error={error} success={success} alertVisible={alertVisible} />

      <Box component="form" onSubmit={handleSubmit}>
        <EmailField value={userData.email} onChange={handleChange} />
        
        <PasswordField
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={userData.password}
          onChange={handleChange}
        />

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: -1, mb: 1 }}
          startIcon={<Login />}
        >
          Login
        </Button>

        <Button
          fullWidth
          onClick={toggleAuthMode}
          sx={{ textTransform: "none" }}
        >
          Don't have an account? Sign up
        </Button>
      </Box>
    </CardContent>
  );
};

// Signup Component
const SignupForm = ({ toggleAuthMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);

  const { userData, setUserData, addUser,loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await addUser(userData);
      setSuccess(result.message);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error || success) {
      setAlertVisible(true);
      const timer = setTimeout(() => setAlertVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <CardContent>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <AuthAlerts error={error} success={success} alertVisible={alertVisible} />

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Username"
          type="text"
          id="name"
          value={userData.name}
          onChange={handleChange}
        />

        <EmailField value={userData.email} onChange={handleChange} />
        
        <PasswordField
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={userData.password}
          onChange={handleChange}
        />

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
          startIcon={<PersonAdd />}
        >
          Sign Up
        </Button>

        <Button
          fullWidth
          onClick={toggleAuthMode}
          sx={{ textTransform: "none" }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </CardContent>
  );
};

// Main Auth Component
const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          {isLogin ? (
            <LoginForm toggleAuthMode={() => setIsLogin(false)} />
          ) : (
            <SignupForm toggleAuthMode={() => setIsLogin(true)} />
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default AuthForms;