import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserContext } from "../context/Customer.tsx";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from '@mui/material/Radio';


export default function SignUp() {
  const myContext = useContext(UserContext);

  if (!myContext) {
    throw new Error("SignUp must be used within a UserProvider");
  }

  const { user, setUser } = myContext;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CarRepairIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to 5 S SoftWear
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                onChange={handleChange}
          //      value={user.name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                onChange={handleChange}
                value={user.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={user.email}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                autoComplete="address-city"
                onChange={handleChange}
                value={user.city}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                autoComplete="address-state"
                onChange={handleChange}
                value={user.state}
              />
            </Grid>
            <Grid item xs={4} mb={2}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                autoComplete="address-country"
                onChange={handleChange}
                value={user.country}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" mb={4}>
            <Grid item>
              <Link href="/login" variant="body2">
                Existing Customer? log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export const SignUp2 = () => {
  const myContext = useContext(UserContext);

  if (!myContext) {
    throw new Error("SignUp must be used within a UserProvider");
  }

  const { user, setUser } = myContext;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CarRepairIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Vehicle & Payment
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Vehicle-name"
                  name="Vehicle-name"
                  required
                  fullWidth
                  id="Vehicle-name"
                  label="Vehicle-name(Eg: Honda city)"
                  autoFocus
                  onChange={handleChange}
                  value={user.vehicle}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="year"
                  label="Year of Manufacture"
                  name="Year of Manufacture"
                  onChange={handleChange}
                  value={user.yearOfManufacture}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Credit"
                  label="Credit limit"
                  name="Credit limit"
                  type="Number"
                  onChange={handleChange}
                  value={user.creditLimit}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} mb={3}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="cash"
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label="card"
                  />
                  <FormControlLabel
                    value="UPI"
                    control={<Radio />}
                    label="UPI"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
