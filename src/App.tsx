import React from "react";
import MainContent from "./components/Dashboard.tsx";
import SideNavBar from "./components/Sidebar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import SignUpFormPagination from "./components/Customers/AddNewCustomer.tsx";
import { UserProvider } from "./context/Customer.tsx";
//import ViewCustomers from "./components/Customers/ViewCustomers.tsx";
import "./App.css";
import OrderForm from "./components/Orders/newOrder.tsx";
import ViewOrder from "./components/Orders/ViewOrders.tsx";
import SearchCustomer from "./components/Customers/SearchCustomer.tsx";
import PastCustomers from "./components/Customers/PastCustomers.tsx";
import { OrderProvider } from "./context/Orders.tsx";
import DownloadReport from "./components/download/Downloads.tsx";
import EmailReport from "./components/download/emailReport.tsx";
import EditCustomers from "./components/Customers/EditCustomers.tsx";
import AreawiseCustomer from "./components/Customers/AreawiseCustomer.tsx";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <UserProvider>
      <OrderProvider>
        <BrowserRouter>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideNavBar
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                open={open}
              />{" "}
            </Grid>
            <Grid item xs={9} style={{ marginTop: "100px" }}>
              <Item>
                <Routes>
                  <Route path="/dashboard" element={<MainContent />} />
                  <Route
                    path="/add-customer"
                    element={<SignUpFormPagination />}
                  />
                  <Route path="/search-customer" element={<SearchCustomer />} />
                  <Route path="/customers" element={<PastCustomers area={undefined} />} />
                  <Route path="/customers/areawise/:area" element={<AreawiseCustomer />} />
                  <Route path="/customer/:id" element={<EditCustomers />} />
                  <Route path="/new-order" element={<OrderForm />} />
                  <Route path="/orders" element={<ViewOrder />} />
                  <Route path={`/orders/:id`} element={<ViewOrder />} />
                  <Route path="/download-report" element={<DownloadReport />} />
                  <Route path="*" element={<MainContent />} />
                </Routes>
              </Item>
            </Grid>
          </Grid>
        </BrowserRouter>
      </OrderProvider>
    </UserProvider>
  );
};

export default App;
