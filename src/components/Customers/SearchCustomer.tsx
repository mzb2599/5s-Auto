import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { UserContext } from "../../context/Customer.tsx";
import NoDataComponent from "../NoData.tsx";
import { Customer } from "../../context/Customer.tsx";
export default function FullWidthTextField() {
  const { userData } = React.useContext(UserContext);
  const [custId, setCustId] = useState("");
  const [customers, setCustomers] = useState<Customer | null>(null);
  const [flag,setFlag]=useState<boolean>(false)

  const handleChange = (e) => {
    setCustId(e.target.value);
  };

  const handleSearch = () => {
    setCustomers(null);
    const foundCustomer = userData.find((user) => user.id === custId);
    console.log("foundCustomer", foundCustomer);
    setCustomers(foundCustomer || null);
    setFlag(true)
  };

  return (
    <Box
      sx={{
        width: 980,
        ml: 1,
        borderRadius: 5,
        backgroundColor: "#87CEEB",
        padding: "20px",
        maxHeight: "600px",
      }}
    >
      <h1>Search Customers</h1>
      <br />
      <TextField
        fullWidth
        label="Customer ID"
        id="customer-id"
        value={custId}
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
          setFlag(false)
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
          </div>
        </div>
      )}
      {flag && custId && customers === null && <NoDataComponent data={"No Customer found for the ID"}/> }
    </Box>
  );
}
