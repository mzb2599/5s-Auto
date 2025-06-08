import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { CustomerContext } from "../../context/Customer.tsx";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../context/Orders.tsx";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  area: string;
  TypeofWork: string;
  creditLimit: number;
  paymentType: string;
}

const CreateCustomer = () => {
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isCityValid, setIsCityValid] = useState<boolean>(true);
  const [isStateValid, setIsStateValid] = useState<boolean>(true);
  const [isCountryValid, setIsCountryValid] = useState<boolean>(true);
  const { CustomerData, updateCustomer } = useContext(CustomerContext);
  const { updateOrder } = useContext(OrderContext);
  const [userTemp, setUserTemp] = useState<Customer>({
    id: "",
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    area: "",
    TypeofWork: "",
    creditLimit: 0,
    paymentType: "",
  });

  const { id: custId } = useParams<{ id: string }>();

  useEffect(() => {
    const filterCustomer = CustomerData.find(
      (customer) => customer.id === custId
    );
    if (filterCustomer) {
      setUserTemp(filterCustomer);
    } else {
      console.error("Customer not found");
    }
    console.log(filterCustomer);
  }, [CustomerData, custId]);

  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)*[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateUserDetails = async () => {
    const { name, phone, email, city, state, area } = userTemp;

    setIsNameValid(name.length >= 3);
    setIsPhoneValid(phone.length === 10);
    setIsEmailValid(validateEmail(email));
    setIsCityValid(city.length > 0);
    setIsStateValid(state.length > 0);
    setIsCountryValid(area.length > 0);
  };

  const submitForm = async () => {
    await validateUserDetails();
    const { name, phone, email, city, state, area } = userTemp;
    if (
      name.length >= 3 &&
      phone.length === 10 &&
      validateEmail(email) &&
      city.length > 0 &&
      state.length > 0 &&
      area.length > 0
    ) {
      updateCustomer({
        ...userTemp,
        name: name,
        phone: phone,
        email: email,
        area: area,
        city: city,
        state: state,
      });
      updateOrder({
        orderCustomerId: userTemp.id,
        customerAddress: area.concat(",", city, ",", state),
      });
    } else {
      alert("Please fill all the fields properly before proceeding");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserTemp({ ...userTemp, [name]: value });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "lavender",
            padding: "50px",
            borderRadius: "10px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CarRepairIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to 5 S AutoMobile
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
                  value={userTemp.name}
                />
                {!isNameValid && (
                  <p style={{ color: "red" }}>
                    Name should be at least 3 characters long
                  </p>
                )}
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
                  value={userTemp.phone}
                />
                {!isPhoneValid && (
                  <p style={{ color: "red" }}>
                    Phone number should be of 10 digits
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userTemp.email}
                />
                {!isEmailValid && (
                  <p style={{ color: "red" }}>Not a valid email id</p>
                )}
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
                  value={userTemp.city}
                />
                {!isCityValid && (
                  <p style={{ color: "red" }}>City cannot be empty</p>
                )}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state"
                  autoComplete="address-state"
                  onChange={handleChange}
                  value={userTemp.state}
                />
                {!isStateValid && (
                  <p style={{ color: "red" }}>State cannot be empty</p>
                )}
              </Grid>
              <Grid item xs={3} mb={2}>
                <TextField
                  required
                  fullWidth
                  name="area"
                  label="Area"
                  id="area"
                  autoComplete="address-area"
                  onChange={handleChange}
                  value={userTemp.area}
                />
                {!isCountryValid && (
                  <p style={{ color: "red" }}>Country cannot be empty</p>
                )}
              </Grid>
            </Grid>
          </Box>
          <Button onClick={submitForm}>Submit</Button>
        </Box>
      </Container>

      {/* Form Submission Button */}
    </div>
  );
};

export default CreateCustomer;
