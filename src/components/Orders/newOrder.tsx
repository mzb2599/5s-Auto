import React, { useState, useContext, useRef } from "react";
import { format } from "date-fns";
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
import { Link } from "react-router-dom";
import NoDataComponent from "../NoData.tsx";
import { OrderContext } from "../../context/Orders.tsx";
import { CustomerContext } from "../../context/Customer.tsx";
import { generateUniqueId } from "../../helpers/helpers.tsx";
import { FormHelperText, Input } from "@mui/material";
import { getCustomerId } from "../helpers/order.tsx";

interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  numberOfItems: number;
  orderCustomerId: string;
  paymentMethod: string;
  billingAddress: string;
  paidAmount: number;
}

const OrderForm: React.FC = () => {
  const { CustomerData, updateCustomer } = useContext(CustomerContext);
  const { ordersData, addOrder } = useContext(OrderContext);
  const [order, setOrder] = useState<Order>({
    orderId: "",
    orderDate: format(String(new Date()).substring(0, 25), "yyyy-MM-dd"),
    totalOrderValue: 0,
    discount: 0,
    numberOfItems: 0,
    orderCustomerId: "",
    paymentMethod: "",
    billingAddress: "",
    paidAmount: 0,
  });
  const imageRef = useRef();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Get the filtered customer
    const filteredCustomer = await getCustomerId(
      CustomerData,
      order.orderCustomerId
    );

    if (!filteredCustomer) {
      alert("Customer not found");
      return; // exit early if no customer found
    }

    let flag = 0; // Initialize flag

    // Update customer data
    CustomerData.map((customer) => {
      if (customer.id === filteredCustomer.id) {
        flag = 1;
        return {
          ...customer, // spread the existing customer data
          lastOrderDate: order.orderDate, // set lastOrderDate to order.orderDate
        };
      }
      debugger;
      return customer; // always return the customer if id doesn't match
    });

    // If flag is still 0, show alert
    if (flag === 0) {
      alert("Invalid customer id");
    } else {
      console.log("filteredCustomer", filteredCustomer);
      let billingAddress =
        filteredCustomer.area +
        "," +
        filteredCustomer.city +
        "," +
        filteredCustomer.state;
      // Add the order to ordersData

      addOrder({
        ...order,
        orderId: generateUniqueId(ordersData?.length),
        customerAddress: billingAddress,
        itemDetails: {},
        balanceAmount: order.totalOrderValue - order.paidAmount - order.discount,
      });

      // updateCustomer({
      //   lastOrderDate: order.orderDate,
      //   id: order.orderCustomerId,
      // });
    }
  };

  return CustomerData?.length > 0 ? (
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
              <TextField
                required
                fullWidth
                id="orderCustomerId"
                name="orderCustomerId"
                label="CustomerId"
                type="text"
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
            <Grid item xs={12} ml={14}>
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
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                <FormControlLabel
                  value="Credit"
                  control={<Radio />}
                  label="Credit"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="paidAmount"
                name="paidAmount"
                label="Paid Amount"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <Grid item xs={4} style={{ marginRight: "16px" }}>
                {" "}
                <label
                  htmlFor="order-image"
                  style={{
                    display: "inline",
                    marginBottom: "8px",
                    textAlign: "left",
                  }}
                >
                  Order Image
                </label>
              </Grid>
              <Grid item xs={8}>
                {" "}
                {/*- Adjusted width to take more space for the input */}
                <Input
                  id="order-image"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  ref={imageRef}
                />
                <FormHelperText>Select an image to upload</FormHelperText>{" "}
              </Grid>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 8 }}
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
