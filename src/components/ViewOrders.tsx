import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NoDataComponent from "./NoData.tsx";
import { OrderContext } from "../context/Orders.tsx";

const ViewOrder: React.FC<ViewOrderProps> = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { ordersData } = useContext(OrderContext);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = [
    "Order ID",
    "Order Date",
    "Total Order Value",
    "Discount",
    "Number of Items",
    "Customer ID",
    "Payment Method",
    "Billing Address",
  ];

  const history = useNavigate();

  const handleClick = (orderId: string) => {
    history(`/order-details/${orderId}`); // Adjust the route as per your routing setup
  };

  return ordersData ? (
    <Paper
      sx={{
        height: "max-content",
        width: "max-content",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontFamily: "cursive" }}>View Orders</h1>
      <hr />
      <TableContainer sx={{ flex: "1", overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    minWidth: 120,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: "cursive",
                  }}
                  align="center"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                style={{ padding: "10px", fontFamily: "cursive" }}
                onClick={() => handleClick(order.orderId)}
                key={order.orderId.toString()} // Assuming orderId can be converted to string
              >
                <TableCell
                  style={{ minWidth: 50, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.orderId.toString()}{" "}
                  {/* Adjust based on actual format */}
                </TableCell>
                <TableCell
                  style={{
                    minWidth: 20,
                    fontFamily: "cursive",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  align="center"
                >
                  {order.orderDate}
                  {/* Adjust date formatting */}
                </TableCell>
                <TableCell
                  style={{ minWidth: 120, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.totalOrderValue}
                </TableCell>
                <TableCell
                  style={{ minWidth: 100, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.discount}
                </TableCell>
                <TableCell
                  style={{ minWidth: 150, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.numberOfItems}
                </TableCell>
                <TableCell
                  style={{ minWidth: 120, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.orderCustomerId}
                </TableCell>
                <TableCell
                  style={{ minWidth: 120, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.paymentMethod}
                </TableCell>
                <TableCell
                  style={{ minWidth: 200, fontFamily: "cursive" }}
                  align="center"
                >
                  {order.billingAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={ordersData.length} // Total number of orders
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Function to handle page changes
        onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page changes
      />
    </Paper>
  ) : (
    <NoDataComponent
      data="No orders yet"
      children={<Link to="/new-order">Create New Order</Link>}
    ></NoDataComponent>
  );
};

export default ViewOrder;
