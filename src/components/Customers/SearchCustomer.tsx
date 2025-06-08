import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import { CustomerContext } from "../../context/Customer.tsx";
import NoDataComponent from "../NoData.tsx";
import { Customer } from "../../context/Customer.tsx";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function CustomerSearch() {
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

  const handleReset = () => {
    setCustomers(null);
    setCustId("");
    setFlag(false);
  };

  const linkToCustomerOrders = `/orders/${customers?.id}`;
  const linkEditCustomers = `/customer/${customers?.id}`;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 980,
        borderRadius: 2,
        overflow: "hidden",
        mx: "auto",
        mb: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <PersonIcon sx={{ mr: 1 }} />
        <Typography variant="h5" component="h1" fontWeight="500">
          Customer Search
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search by Customer ID or Phone"
              id="customer-id"
              value={customerSearch}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter Customer ID or Phone Number"
              InputProps={{
                endAdornment: (
                  <IconButton
                    color="primary"
                    onClick={handleSearch}
                    disabled={!customerSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && customerSearch) {
                  handleSearch();
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                disabled={!customerSearch}
                fullWidth
                sx={{ py: 1 }}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
                fullWidth
                sx={{ py: 1 }}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>

        {flag && customerSearch && customers === null && (
          <Box sx={{ mt: 4 }}>
            <NoDataComponent
              data={"No customer found with the provided ID or phone number"}
            />
          </Box>
        )}

        {customers && (
          <Card
            variant="outlined"
            sx={{
              mt: 4,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon
                  sx={{ color: "primary.main", mr: 1, fontSize: 28 }}
                />
                <Typography variant="h5" fontWeight="500">
                  {customers.name}
                </Typography>
                <Chip
                  label={customers.id}
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
                <Typography variant="h6" fontWeight="500" ml={4}>
                  Contact: {customers.contactPerson}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                {/* Phone */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<PhoneIcon color="action" />}
                    label="Phone"
                    value={customers.phone}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<EmailIcon color="action" />}
                    label="Email"
                    value={customers.email}
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<LocationOnIcon color="action" />}
                    label="Address"
                    value={`${customers.area}, ${customers.city}, ${customers.state}`}
                  />
                </Grid>

                {/* Type of Work */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<WorkIcon color="action" />}
                    label="Type of Work"
                    value={customers.TypeofWork}
                  />
                </Grid>

                {/* GST Number */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<ReceiptIcon color="action" />}
                    label="GST Number"
                    value={customers.gstNo}
                  />
                </Grid>

                {/* Credit Limit */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<AccountBalanceWalletIcon color="action" />}
                    label="Credit Limit"
                    value={customers.creditLimit}
                  />
                </Grid>

                {/* Payment Type */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<PaymentIcon color="action" />}
                    label="Payment Type"
                    value={customers.paymentType}
                  />
                </Grid>

                {/* Last Order Date */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<CalendarTodayIcon color="action" />}
                    label="Last Order Date"
                    value={customers.lastOrderDate}
                  />
                </Grid>

                {/* Balance Amount */}
                <Grid item xs={12} sm={6} md={4}>
                  <CustomerInfoItem
                    icon={<AttachMoneyIcon color="action" />}
                    label="Balance Amount"
                    value={customers.balanceAmount}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to={linkToCustomerOrders}
                  startIcon={<ShoppingBagIcon />}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    fontWeight: 500,
                  }}
                >
                  View Orders
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={linkEditCustomers}
                  startIcon={<EditIcon />}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    fontWeight: 500,
                  }}
                >
                  Edit Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Paper>
  );
}

// Helper component for customer information items
const CustomerInfoItem = ({ icon, label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Box sx={{ mr: 1.5, color: "text.secondary" }}>{icon}</Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  </Box>
);
