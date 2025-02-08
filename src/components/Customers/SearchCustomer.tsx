import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { CustomerContext } from "../../context/Customer.tsx";
import NoDataComponent from "../NoData.tsx";
import { Customer } from "../../context/Customer.tsx";
import { Link } from "react-router-dom";
export default function FullWidthTextField() {
  const { CustomerData } = React.useContext(CustomerContext);
  const [customerSearch, setCustId] = useState("");
  const [customers, setCustomers] = useState<Customer | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  const handleChange = (e) => {
    setCustId(e.target.value);
  };

  const handleSearch = () => {
    setCustomers(null);
    const foundCustomer = CustomerData.find(
      (customer) =>
        customer.id === customerSearch || customer.phone === customerSearch
    );
    setCustomers(foundCustomer || null);
    setFlag(true);
  };
  const linkToCustomerOrders = `/orders/${customers?.id}`;
  const linkEditCustomers = `/customer/${customers?.id}`;
  return (
    <Box
      sx={{
        width: 980,
        ml: 1,
        borderRadius: 5,
        backgroundColor: "#87CEEB",
        padding: "20px",
        maxHeight: "620px",
        marginLeft: "75px",
      }}
    >
      <h1>Search Customers</h1>
      <br />
      <TextField
        fullWidth
        label="Customer ID"
        id="customer-id"
        value={customerSearch}
        onChange={handleChange}
      />
      {/* <TextField
        fullWidth
        label="City"
        id="city"
        value={city}
        onChange={handleCityChange}
      /> */}
      <Button
        style={{ backgroundColor: "#0288d1", color: "white", margin: "5px" }}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        style={{ backgroundColor: "#d32f2f", color: "white", margin: "5px" }}
        onClick={() => {
          setCustomers(null);
          setCustId("");
          setFlag(false);
        }}
      >
        Reset
      </Button>
      {customers && (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "25px",
              fontSize: "21px",
              fontStyle: "oblique",
              fontFamily: "cursive",
            }}
          >
            <div>
              <strong>Customer ID:</strong> {customers.id}
            </div>
            <div>
              <strong>Customer Name:</strong> {customers.name}
            </div>
            <div>
              <strong>Phone:</strong> {customers.phone}
            </div>
            <div>
              <strong>Email:</strong> {customers.email}
            </div>
            <div>
              <strong>Location:</strong> {customers.area}, {customers.city},
              {customers.state}
            </div>
            <div>
              <strong>TypeofWork:</strong> {customers.TypeofWork}
            </div>
            <div>
              <strong>GST Number:</strong> {customers.gstNo}
            </div>
            <div>
              <strong>Credit Limit:</strong> {customers.creditLimit}
            </div>
            <div>
              <strong>Payment Type:</strong> {customers.paymentType}
            </div>
            <div>
              <strong>Last Order date:</strong> {customers.lastOrderDate}
            </div>
            <div>
              <strong>Balance Amount:</strong> {customers.balanceAmount}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained">
                <strong>
                  <Link
                    to={linkToCustomerOrders}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    Go to Orders
                  </Link>{" "}
                </strong>
              </Button>
              <Button variant="contained" style={{ marginLeft: "20px" }}>
                <strong>
                  <Link
                    to={linkEditCustomers}
                    style={{ textDecoration: "none" }}
                  >
                    Edit details
                  </Link>{" "}
                </strong>
              </Button>
            </div>
          </div>
        </div>
      )}
      {flag && customerSearch && customers === null && (
        <NoDataComponent data={"No Customer found for the ID"} />
      )}
    </Box>
  );
}
