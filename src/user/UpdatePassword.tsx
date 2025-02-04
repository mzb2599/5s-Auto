import React, { useContext, useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../context/user.tsx";
import { useNavigate, useLocation } from "react-router-dom";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { updatePassword } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('mail');

  const handlePasswordUpdate = async () => {
    if (!newPassword || !confirmNewPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await updatePassword(email,newPassword);
      if (result.success) {
        setSuccess("Password updated successfully!");
        navigate("/login"); // Redirect to login after successful update
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while updating the password.");
    }
  };

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
              Update Password
            </Typography>

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

            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              <Button
                onClick={handlePasswordUpdate}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Update Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
