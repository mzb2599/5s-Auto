import React, { useState, useContext } from "react";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import NoDataComponent from "../NoData.tsx";
import { OrderContext } from "../../context/Orders.tsx";
import { UserContext } from "../../context/Customer.tsx";
import { generateUniqueId } from "../../helpers/helpers.tsx";

interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  numberOfItems: number;
  orderCustomerId: string;
  paymentMethod: string;
  billingAddress: string;
}

const OrderForm: React.FC = () => {
  const { userData } = useContext(UserContext);
  const { ordersData, setOrdersData } = useContext(OrderContext);
  const [order, setOrder] = useState<Order>({
    orderId: generateUniqueId("ORD"),
    orderDate: String(new Date()).substring(0, 25),
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
    setOrdersData([...ordersData, order]);
  };

  return userData?.length > 0 ? (
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
            <Grid item xs={12}>
              <Select
                required
                fullWidth
                id="orderCustomerId"
                name="orderCustomerId"
                onChange={handleChange}
                label="Customer ID"
              >
                {/* Placeholder or default state */}
                <MenuItem value="">
                  <em>Select a customer</em>
                </MenuItem>
                {/* List of actual users */}
                {userData?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.id}
                  </MenuItem>
                ))}
              </Select>
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
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  ) : (
    <NoDataComponent
      data={"No customers available to create order"}
      children={<Link to="/add-customer">Add new customers</Link>}
    />
  );
};

export default OrderForm;
