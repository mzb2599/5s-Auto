import React, { useState, useContext, useEffect } from "react";
import { CustomerContext } from "../context/Customer.tsx";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
} from "@mui/material";

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
  balanceAmount: number; // Adding the balanceAmount field
}

const UpdateBalanceForm = () => {
  const { CustomerData, updateCustomer } = useContext(CustomerContext);
  const [customerId, setCustomerId] = useState<string>("");
  const [balanceAmount, setBalanceAmount] = useState<number>(0);
  const [isBalanceValid, setIsBalanceValid] = useState<boolean>(true);
  useEffect(() => {
    const customer = CustomerData.find((customer) => customer.id === customerId);
    if (customer) {
      setUserTemp({
        ...userTemp,
        balanceAmount: customer.balanceAmount,
      });
    }
  }, [CustomerData, customerId]);
  
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
    balanceAmount: Number;
  }
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
    balanceAmount: 0,
  });
  const handleCustomerIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerId(event.target.value);
  };
  const handleBalanceAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBalanceAmount(Number(event.target.value));
  };
  const updateBalance = () => {
    if (balanceAmount < 0) {
      setIsBalanceValid(false);
      return;
    }

    const customerToUpdate = CustomerData.find(
      (customer) => customer.id === customerId
    );

    if (customerToUpdate && balanceAmount > 0) {
      // Updating the balanceAmount in the customer object
      const updatedCustomer = { ...customerToUpdate, balanceAmount: customerToUpdate.balanceAmount -balanceAmount };
      // Update the customer context with the new balanceAmount
      updateCustomer(updatedCustomer);
      alert("Balance updated successfully!");
    } else if(balanceAmount <=0){
      alert(`Invalid update Amount: ${balanceAmount}`)
    } 
    else  {
      alert("Customer not found.");
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ padding: "25px" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lavender",
          padding: "50px",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PaymentIcon />
        </Avatar>
        <h1>Update Payment</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="customerId"
              required
              fullWidth
              id="customerId"
              label="Customer Id"
              autoFocus
              onChange={handleCustomerIdChange}
              value={customerId}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="balanceAmount"
              label="Balance Amount"
              name="balanceAmount"
              onChange={handleBalanceAmountChange}
              value={balanceAmount}
            />
          </Grid>
        </Grid>
        <br/>
        <b>{customerId && `Your Balance Amount is: ${userTemp.balanceAmount}`}</b>
        <Button
          onClick={updateBalance}
          style={{ margin: "25px", backgroundColor: "blue", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateBalanceForm;
