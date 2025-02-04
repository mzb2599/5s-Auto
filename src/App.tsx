import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// Component imports
import MainContent from "./components/Dashboard.tsx";
import SideNavBar from "./components/Sidebar.tsx";
import CreateCustomer from "./components/Customers/AddNewCustomer.tsx";
import PaymentUpdate from "./components/PaymentUpdate.tsx";
import OrderForm from "./components/Orders/newOrder.tsx";
import ViewOrder from "./components/Orders/ViewOrders.tsx";
import SearchCustomer from "./components/Customers/SearchCustomer.tsx";
import PastCustomers from "./components/Customers/PastCustomers.tsx";
import DownloadReport from "./components/download/Downloads.tsx";
import EditCustomers from "./components/Customers/EditCustomers.tsx";
import AreawiseCustomer from "./components/Customers/AreawiseCustomer.tsx";
import AuthForms from "./user/login.tsx";
import PrivateRoute from "./user/PrivateRoute.tsx";

// Context imports
import { CustomerProvider } from "./context/Customer.tsx";
import { OrderProvider } from "./context/Orders.tsx";
import { UserContext, UserProvider } from "./context/user.tsx";

// Styles
import "./App.css";
import ForgotPassword from "./user/forgot.tsx";
import UpdatePassword from "./user/UpdatePassword.tsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Main Layout Component
const AppLayout = () => {
  const { isLogin } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const url = useLocation();
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <SideNavBar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
          isLogin={url.pathname !== "/login"}
        />
      </Grid>
      <Grid
        item
        xs={9}
        style={{ marginTop: url.pathname == "/login" ? "-25px" : "100px" }}
      >
        <Item>
          <Routes>
            <Route path="/login" element={<AuthForms />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id" element={<UpdatePassword />} />
            <Route path="/" element={<PrivateRoute element={<Outlet />} />}>
              <Route path="dashboard" element={<MainContent />} />
              <Route path="add-customer" element={<CreateCustomer />} />
              <Route path="search-customer" element={<SearchCustomer />} />
              <Route
                path="customers"
                element={<PastCustomers area={undefined} />}
              />
              <Route
                path="customers/areawise/:area"
                element={<AreawiseCustomer />}
              />
              <Route path="customer/:id" element={<EditCustomers />} />
              <Route path="update-payment" element={<PaymentUpdate />} />
              <Route path="new-order" element={<OrderForm />} />
              <Route path="orders" element={<ViewOrder />} />
              <Route path="orders/:id" element={<ViewOrder />} />
              <Route path="download-report" element={<DownloadReport />} />
              <Route path="*" element={<MainContent />} />
            </Route>
          </Routes>
        </Item>
      </Grid>
    </Grid>
  );
};

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CustomerProvider>
          <OrderProvider>
            <AppLayout />
          </OrderProvider>
        </CustomerProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
