import React, { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { v4 as uuidv4 } from "uuid";

interface Order {
  orderId: Date;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  numberOfItems: number;
  orderCustomerId: string;
  paymentMethod: string;
  billingAddress: string;
}

const OrderForm: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    orderId: uuidv4(),
    orderDate: new Date(),
    totalOrderValue: 0,
    discount: 0,
    numberOfItems: 0,
    orderCustomerId: "",
    paymentMethod: "",
    billingAddress: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log("Form Submitted:", order);
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
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="orderId"
                name="orderId"
                label="Order ID"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="orderDate"
                name="orderDate"
                label="Order Date"
                type="date"
                InputLabelProps={{ shrink: true, defaultValue: new Date() }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="totalOrderValue"
                name="totalOrderValue"
                label="Total Order Value"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="discount"
                name="discount"
                label="Discount"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="numberOfItems"
                name="numberOfItems"
                label="Number of Items"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="orderCustomerId"
                name="orderCustomerId"
                label="Order Customer ID"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <RadioGroup
                row
                aria-label="paymentMethod"
                name="paymentMethod"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Card"
                />
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="billingAddress"
                name="billingAddress"
                label="Billing Address"
                multiline
                rows={4}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderForm;
