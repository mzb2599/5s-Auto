import * as React from "react";
import { Link } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  EditNote as EditNoteIcon,
  AddShoppingCart as AddShoppingCartIcon,
  PersonAdd as PersonAddIcon,
  ViewList as ViewListIcon,
  PersonSearch as PersonSearchIcon,
  Download as DownloadIcon,
  CurrencyBitcoin,
  CurrencyRupee,
} from "@mui/icons-material";

// Constants
const DRAWER_WIDTH = 220;
const BASE_URL = "http://localhost:3000";
const THEME_COLORS = {
  primary: "#2b2d42",
  text: "ghostwhite",
  divider: "wheat",
  iconButton: "#e0fbfc",
} as const;

// Types
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface NavItem {
  text: string;
  route: string;
  icon: React.ReactElement;
}

interface SideNavBarProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  open: boolean;
}

// Navigation Data
const NAV_ITEMS: Record<string, NavItem[]> = {
  main: [
    {
      text: "Dashboard",
      route: `${BASE_URL}/dashboard`,
      icon: <DashboardIcon />,
    },
    {
      text: "Orders",
      route: `${BASE_URL}/orders`,
      icon: <EditNoteIcon />,
    },
    {
      text: "New Order",
      route: `${BASE_URL}/new-order`,
      icon: <AddShoppingCartIcon />,
    },
  ],
  customers: [
    {
      text: "Add Customers",
      route: `${BASE_URL}/add-customer`,
      icon: <PersonAddIcon />,
    },
    {
      text: "View Customers",
      route: `${BASE_URL}/customers`,
      icon: <ViewListIcon />,
    },
    {
      text: "Customer Details",
      route: `${BASE_URL}/search-customer`,
      icon: <PersonSearchIcon />,
    },
    {
      text: "Update Payment Details",
      route: `${BASE_URL}/update-payment`,
      icon: <CurrencyRupee />,
    },
  ],
};

// Styled Components
const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
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

// Components
const NavListItem: React.FC<{ item: NavItem; open: boolean }> = ({ item, open }) => (
  <ListItem disablePadding sx={{ display: "block" }}>
    <ListItemButton
      component={Link}
      to={item.route}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
        bgcolor: THEME_COLORS.primary,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
          color: THEME_COLORS.text,
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={{
          opacity: open ? 1 : 0,
        }}
      />
    </ListItemButton>
  </ListItem>
);

const SideNavBar: React.FC<SideNavBarProps> = ({
  handleDrawerOpen,
  handleDrawerClose,
  open,
}) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: THEME_COLORS.primary }}>
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
        PaperProps={{
          sx: { bgcolor: THEME_COLORS.primary },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ bgcolor: THEME_COLORS.iconButton }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <List sx={{ color: THEME_COLORS.text, height: "100%" }}>
          {/* Main Navigation Items */}
          {NAV_ITEMS.main.map((item, index) => (
            <NavListItem key={`main-${index}`} item={item} open={open} />
          ))}

          <Divider sx={{ bgcolor: THEME_COLORS.divider }} />

          {/* Customer Navigation Items */}
          {NAV_ITEMS.customers.map((item, index) => (
            <NavListItem key={`customer-${index}`} item={item} open={open} />
          ))}

          <Divider sx={{ bgcolor: THEME_COLORS.divider }} />

          {/* Download Reports */}
          <NavListItem
            item={{
              text: "Download Reports",
              route: "/download-report",
              icon: <DownloadIcon />,
            }}
            open={open}
          />
        </List>
      </Drawer>
    </>
  );
};

export default SideNavBar;