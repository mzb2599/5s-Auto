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
import { Link, useNavigate } from "react-router-dom";
import NoDataComponent from "../NoData.tsx";
import { OrderContext } from "../../context/Orders.tsx";
import { CustomerContext } from "../../context/Customer.tsx";
import { generateUniqueId } from "../../helpers/helpers.tsx";
import { FormHelperText, Input } from "@mui/material";
import { getCustomerId, getTotalOrderValue } from "../helpers/order.tsx";

interface OrderItem {
  name: string;
  value: number;
}

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
  itemDetails: OrderItem[];
}

const OrderForm: React.FC = () => {
  const { CustomerData, updateCustomer } = useContext(CustomerContext);
  const { ordersData, addOrder } = useContext(OrderContext);
  const navigate =useNavigate();
  const [order, setOrder] = useState<Order>({
    orderId: "",
    orderDate: format(String(new Date()).substring(0, 25), "yyyy-MM-dd"),
    totalOrderValue: 0,
    discount: 0,
    numberOfItems: 0,
    orderCustomerId: "",
    itemDetails: [],
    paymentMethod: "",
    billingAddress: "",
    paidAmount: 0,
  });
  const imageRef = useRef();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = event.target;

    if (index !== undefined && (name === "itemName" || name === "value")) {
      // Handle item details updates
      const updatedItems = [...order.itemDetails];
      if (name === "itemName") {
        updatedItems[index] = {
          ...updatedItems[index],
          name: value,
        };
      } else if (name === "value") {
        updatedItems[index] = {
          ...updatedItems[index],
          value: Number(value) || 0,
        };
      }

      setOrder({
        ...order,
        itemDetails: updatedItems,
      });
    } else {
      // Handle other fields
      setOrder((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    CustomerData?.map((customer) => {
      if (customer.id === filteredCustomer.id) {
        flag = 1;
        return {
          ...customer, // spread the existing customer data
          lastOrderDate: order.orderDate, // set lastOrderDate to order.orderDate
        };
      }
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
      let creditCheck=true;
      if(filteredCustomer?.balanceAmount +  getTotalOrderValue(order.itemDetails) - order.paidAmount > filteredCustomer.creditLimit)
        creditCheck=window.confirm("Credit limit exceeded, do you still want to create order?")
      
      if (creditCheck){
      // Add the order to ordersData
      addOrder({
        ...order,
        orderId: generateUniqueId(ordersData?.length),
        customerAddress: billingAddress,
        itemDetails: order.itemDetails,
        totalOrderValue: getTotalOrderValue(order.itemDetails),
        balanceAmount:
          getTotalOrderValue(order.itemDetails) -
          order.paidAmount -
          order.discount,
      });

      updateCustomer({
        lastOrderDate: order.orderDate,
        id: order.orderCustomerId,
        balanceAmount: filteredCustomer?.balanceAmount +  getTotalOrderValue(order.itemDetails) - order.paidAmount

      });
      alert('Order created successfully');
      navigate('/dashboard')
    }
    else{
      alert('Order cancelled')
    }
    }
  };

  return CustomerData?.length > 0 ? (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container>
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

            <Grid container spacing={2} alignItems="center">
              {order.itemDetails?.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={8}>
                    <TextField
                      required
                      fullWidth
                      id={`itemName-${index}`}
                      name="itemName"
                      label="Enter product name"
                      value={item.name}
                      onChange={(e: any) => handleChange(e, index)} // Passing the index for item update
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      required
                      fullWidth
                      id={`itemValue-${index}`}
                      name="value"
                      label="Total Value"
                      value={item.value}
                      type="number"
                      onChange={(e: any) => handleChange(e, index)} // Passing the index for item update
                    />
                  </Grid>
                </React.Fragment>
              ))}

              {/* Add a new item button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setOrder({
                      ...order,
                      itemDetails: [
                        ...order.itemDetails,
                        { name: "", value: 0 },
                      ],
                    });
                  }} // Add a new empty item
                >
                  Add New Item
                </Button>
              </Grid>
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
                <Input
                  id="order-image"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  ref={imageRef}
                />
                <FormHelperText>Select an image to upload</FormHelperText>
              </Grid>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 8 }}
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
