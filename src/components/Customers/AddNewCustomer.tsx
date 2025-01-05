import React, { useState, useContext } from "react";
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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { v4 as uuidv4 } from "uuid";

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
  balanceAmount:Number;
}
const SignUpFormPagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isCityValid, setIsCityValid] = useState<boolean>(true);
  const [isStateValid, setIsStateValid] = useState<boolean>(true);
  const [isAreaValid, setIsAreaValid] = useState<boolean>(true);
  const [code, setCode] = useState("");
  const { CustomerData, setCustomerData, addCustomer } =
    useContext(CustomerContext);
  const generateUniqueId = (): string => {
    let Ccount = CustomerData?.length + 1;
    return code + String(Ccount);
  };
  const [userTemp, setUserTemp] = useState<Customer>({
    id: "",
    name: " ",
    phone: " ",
    email: " ",
    city: "",
    state: "",
    area: "",
    TypeofWork: " ",
    creditLimit: 0,
    paymentType: "cash",
    balanceAmount:0,
  });

  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)*[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateUserDetails = async () => {
    const { name, phone, email, city, state, area } = userTemp;

    setIsNameValid(name?.length >= 3);
    setIsPhoneValid(phone?.length === 10);
    setIsEmailValid(validateEmail(email));
    setIsCityValid(city?.length > 0);
    setIsStateValid(state?.length > 0);
    setIsAreaValid(area?.length > 0);
  };
  const nextPage = async () => {
    await validateUserDetails(); //validateUserDetails();
    const { name, phone, email, city, state, area } = userTemp;
    debugger;
    if (
      name?.length >= 3 &&
      phone?.length === 10 &&
      validateEmail(email) &&
      city?.length > 0 &&
      state?.length > 0 &&
      area?.length > 0 &&
      code?.length > 3
    ) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("Please fill all the fields properly before proceeding");
    }
  };

  const prevPage = () => {
    setUserTemp(userTemp);
    setCustomerData(CustomerData);
    setCurrentPage(currentPage - 1);
  };

  const submitForm = () => {
    const { TypeofWork, creditLimit } = userTemp;
    if (TypeofWork?.length > 0 && creditLimit >= 0) {
      // setCustomerData((prevData) => {
      //   return CustomerData?.length>0 ? [...prevData, userTemp]:[userTemp];
      // });
      setUserTemp({ ...userTemp, id: generateUniqueId() });
      debugger;
      addCustomer(userTemp);
    } else {
      alert("Please fill all the fields properly before submit");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserTemp({ ...userTemp, [name]: value });
  };
  return (
    <div>
      {currentPage === 1 && (
        <>
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
                      value={userTemp.name}
                    />
                    {!isNameValid && (
                      <p style={{ color: "red" }}>
                        Name should be atleast 3 chaarcters long
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
                  <Grid item xs={5} ml={1}>
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
                  <Grid item xs={5} ml={1}>
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
                  <Grid item xs={5} ml={1}>
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
                    {!isAreaValid && (
                      <p style={{ color: "red" }}>Country cannot be empty</p>
                    )}
                  </Grid>
                  <Grid item xs={5} ml={1}>
                    <TextField
                      required
                      fullWidth
                      name="code"
                      label="Area code"
                      id="code"
                      autoComplete="code"
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </>
      )}
      {currentPage === 2 && (
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
                TypeofWork & Payment
              </Typography>
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="TypeofWork"
                      name="TypeofWork"
                      required
                      fullWidth
                      id="TypeofWork"
                      label="TypeofWork"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="TypeofWork"
                      name="gstNo"
                      required
                      fullWidth
                      id="gstNo"
                      label="GST No"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="creditLimit"
                      label="Credit limit"
                      name="creditLimit"
                      type="Number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                          step: 500,
                        },
                      }}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} mb={3}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="paymentType"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="cash"
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
      )}

      {/* Pagination Controls */}
      <Button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </Button>
      {currentPage !== 2 && (
        <Button onClick={nextPage} disabled={currentPage === 4}>
          Next
        </Button>
      )}
      {/* {currentPage == 1 && <button onClick={prevPage} >Previous</button>}
      {currentPage < 2 && <button onClick={nextPage}>Next</button>} */}

      {/* Form Submission Button */}
      {currentPage === 2 && (
        <Button onClick={submitForm} disabled={currentPage !== 2}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default SignUpFormPagination;
