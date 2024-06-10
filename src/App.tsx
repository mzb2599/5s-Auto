import React from "react";
import MainContent from "./components/MainContent.tsx";
import SideNavBar from "./components/Sidebar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import SignUpFormPagination from "./components/SignupFormPagination.tsx";
import { UserProvider } from "./context/Customer.tsx";
import ViewCustomers from "./components/ViewCustomers.tsx";
import Dashboard from "./components/Dashboard.tsx";
import './App.css'
import OrderForm from "./components/newOrder.tsx";
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
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideNavBar
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                open={open}
              />{" "}
            </Grid>
            <Grid item xs={8} style={{ marginTop: "100px" }}>
              <Item>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/signup" element={<SignUpFormPagination />} />
                  <Route path="/view-customers" element={<ViewCustomers />} />
                  <Route path="/new-order" element={<OrderForm />} />
                  <Route path="*" element={<MainContent />} />
                </Routes>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
