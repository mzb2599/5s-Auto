import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import { CustomerContext } from "../../context/Customer.tsx";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import getCityCode from "../helpers/cityCode.tsx";

interface Customer {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  area: string;
  TypeofWork: string;
  creditLimit: number;
  paymentType: string;
  balanceAmount: number;
  gstNo: string;
}

const CreateCustomer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { CustomerData, addCustomer } = useContext(CustomerContext);
  const [code, setCode] = useState<string>("");
  const [userTemp, setUserTemp] = useState<Customer>({
    id: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    area: "",
    TypeofWork: "",
    creditLimit: 0,
    paymentType: "cash",
    balanceAmount: 0,
    gstNo: "",
  });
  useEffect(() => {
    if (userTemp.city.trim().length > 0) {
      const areaCode = getCityCode(userTemp.city);
      setCode(areaCode);
    }
  }, [userTemp.city]);

  const validateEmail = (email: string) => {
    if (!email) {
      return true; // If email is empty, return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUserDetails = () => {
    const { name, phone, email, city, state, area } = userTemp;

    let isValid =
      name.length >= 3 &&
      phone.length === 10 &&
      validateEmail(email) &&
      city.length > 0 &&
      state.length > 0 &&
      area.length > 0;
    debugger;

    return isValid;
  };

  const nextPage = () => {
    if (validateUserDetails()) {
      setCurrentPage(currentPage + 1);
    } else {
      setSnackbarMessage("Please fill all fields correctly.");
      setSnackbarOpen(true);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const submitForm = () => {
    const { TypeofWork, creditLimit } = userTemp;
    if (userTemp.gstNo.length === 0) {
      setUserTemp({ ...userTemp, gstNo: " " });
    }
    if (TypeofWork.length > 0 && creditLimit >= 0) {
      const newId = `${code}${CustomerData.length + 1}`;
      const newUser = { ...userTemp, id: newId };
      addCustomer(newUser);
      setSnackbarMessage("Customer successfully added!");
      setSnackbarOpen(true);
      setUserTemp({
        id: "",
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        area: "",
        TypeofWork: "",
        creditLimit: 0,
        paymentType: "cash",
        balanceAmount: 0,
        gstNo: "",
      });
      setCurrentPage(1); // Reset to the first page
    } else {
      setSnackbarMessage("Please fill all fields correctly before submitting.");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "code") {
      setCode(value);
    } else {
      setUserTemp({ ...userTemp, [name]: value });
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <CssBaseline />
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", mx: "auto" }}>
          <CarRepairIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {currentPage === 1
            ? "Customer Information"
            : "Type of Work & Payment"}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {currentPage === 1 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Full Name"
                    value={userTemp.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contactPerson"
                    label="Contact Person"
                    value={userTemp.contactPerson}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    value={userTemp.phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    label="Email Address"
                    value={userTemp.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                {/* Keeping City and State on the same line */}
                <Grid item xs={5}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="City"
                    value={userTemp.city}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item ml={3} xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="state"
                    label="State"
                    value={userTemp.state}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                {/* Keeping Area and Area Code on the same line */}
                <Grid item xs={5}>
                  <TextField
                    required
                    fullWidth
                    name="area"
                    label="Area"
                    value={userTemp.area}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item ml={3} xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="code"
                    label="Area Code"
                    value={code}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </>
            )}
            {currentPage === 2 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="TypeofWork"
                    label="Type of Work"
                    value={userTemp.TypeofWork}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="gstNo"
                    label="GST No"
                    value={userTemp.gstNo}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="creditLimit"
                    label="Credit Limit"
                    type="number"
                    value={userTemp.creditLimit}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    row
                    name="paymentType"
                    value={userTemp.paymentType}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="UPI"
                      control={<Radio />}
                      label="UPI"
                    />
                  </RadioGroup>
                </Grid>
              </>
            )}
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {currentPage === 1 ? (
              <Button variant="contained" color="primary" onClick={nextPage}>
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={submitForm}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateCustomer;
