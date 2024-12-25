import * as React from "react";
import { Link } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DownloadIcon from "@mui/icons-material/Download";

import { Divider } from "@mui/material";
const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideNavBar = ({ handleDrawerOpen, handleDrawerClose, open }) => {
  const Customers = [
    {
      text: "Add Customers",
      route: "http://localhost:3000/add-customer",
      icon: <PersonAddIcon />,
    },
    // {
    //   text: "View Customers",
    //   route: "http://localhost:3000/customers",
    //   icon: <ViewListIcon />,
    // },
    {
      text: "View Customers",
      route: "http://localhost:3000/customers",
      icon: <ViewListIcon />,
    },
    {
      text: "Customer Details",
      route: "http://localhost:3000/search-customer",
      icon: <PersonSearchIcon />,
    },
  ];
  const Navbar = [
    {
      text: "Dashboard",
      route: "http://localhost:3000/dashboard",
      icon: <DashboardIcon />,
    },
    {
      text: "Orders",
      route: "http://localhost:3000/orders",
      icon: <EditNoteIcon />,
    },
    {
      text: "New Order",
      route: "http://localhost:3000/new-order",
      icon: <AddShoppingCartIcon />,
    },
  ];
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "" }}>
        <Toolbar sx={{ backgroundColor: "#2b2d42" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 4,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <h2>5 S SoftWear</h2>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        style={{ backgroundColor: "#2b2d42" }}
      >
        <DrawerHeader style={{ backgroundColor: "#2b2d42" }}>
          <IconButton
            onClick={handleDrawerClose}
            style={{ backgroundColor: "#e0fbfc" }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider style={{ backgroundColor: "wheat" }} />
        <List
          style={{
            backgroundColor: "#2b2d42",
            color: "ghostwhite",
            height: "100%",
          }}
        >
          {Navbar.map((navItem, index) => (
            <>
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                style={{ backgroundColor: "#2b2d42" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: "#2b2d42",
                  }}
                  component={Link}
                  to={navItem.route}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      backgroundColor: "#2b2d42",
                    }}
                    style={{ color: "ghostwhite" }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      backgroundColor: "#2b2d42",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
          <Divider style={{ backgroundColor: "wheat" }} />
          {Customers.map((customer, index) => (
            <>
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                style={{ backgroundColor: "#2b2d42" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: "#2b2d42",
                  }}
                  component={Link}
                  to={customer.route}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      backgroundColor: "#2b2d42",
                    }}
                    style={{ color: "ghostwhite" }}
                  >
                    {customer.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={customer.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      backgroundColor: "#2b2d42",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
          <Divider style={{ backgroundColor: "wheat" }} />
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            style={{ backgroundColor: "#2b2d42" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: "#2b2d42",
              }}
              component={Link}
              to={"/download-report"}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  backgroundColor: "#2b2d42",
                }}
                style={{ color: "ghostwhite" }}
              >
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Download Reports"}
                sx={{
                  opacity: open ? 1 : 0,
                  backgroundColor: "#2b2d42",
                }}
              />
            </ListItemButton>
          </ListItem>
          
        </List>
      </Drawer>
    </>
  );
};

export default SideNavBar;
