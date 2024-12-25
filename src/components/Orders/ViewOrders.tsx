import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoDataComponent from "../NoData.tsx";
import { OrderContext } from "../../context/Orders.tsx";

const ViewOrder: React.FC<ViewOrderProps> = () => {
  const { ordersData, setOrdersData } = useContext(OrderContext);
  const [filteredOrdersData, setFilteredOrdersData] = useState();
  const [sortType, setSortType] = useState("asc");
  const id = useParams();
  useEffect(() => {
    
    if (id?.id && Array.isArray(ordersData) && ordersData.length > 0) {
      const filteredOrders = ordersData?.filter((order) => {
        const customerId = parseInt(order.orderCustomerId);
        const parsedId = parseInt(id?.id);
        if (isNaN(customerId) || isNaN(parsedId)) {
          console.warn("Invalid customer ID or id:", customerId, parsedId);
        }
        return customerId === parsedId;
      });

      setFilteredOrdersData(filteredOrders); // Update state with filtered orders
    }
    else{
      setFilteredOrdersData(ordersData)
    }
  }, [ordersData, id]); // Run effect when either ordersData or id changes

  const sortUserDataByHeader = (CustomerData, header, sortOrder) => {
    const sortedData = [...CustomerData];

    sortedData.sort((a, b) => {
      const valueA = a[header];
      const valueB = b[header];

      // Convert values to strings and handle numeric strings
      const stringA = String(valueA);
      const stringB = String(valueB);

      // Check if both values are numeric strings
      const isNumericA = /^\d+$/.test(stringA);
      const isNumericB = /^\d+$/.test(stringB);

      if (isNumericA && isNumericB) {
        const numA = parseInt(stringA, 10);
        const numB = parseInt(stringB, 10);
        return sortOrder === "asc" ? numA - numB : numB - numA;
      }

      // Handle numeric vs. string comparison
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle string comparison
      const stringValueA = stringA.toUpperCase();
      const stringValueB = stringB.toUpperCase();

      if (sortOrder === "asc") {
        return stringValueA.localeCompare(stringValueB);
      } else {
        return stringValueB.localeCompare(stringValueA);
      }
    });

    return sortedData;
  };
  const toCamelCase = (input) => {
    // Split the input string by spaces, dashes, or underscores
    const words = input.split(/[\s\-_]+/);

    // Capitalize the first letter of all words after the first one
    const camelCaseWords = words?.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase(); // Keep the first word lowercase
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });

    // Join the words back together
    return camelCaseWords.join("");
  };
  const handleSort = (header) => {
    sortType === "asc" ? setSortType("desc") : setSortType("asc");
    setFilteredOrdersData(sortUserDataByHeader(ordersData, header, sortType));
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

  return ordersData ? (
    <Paper
      sx={{
        overflowX: "auto", // Allows horizontal scrolling if the table is too wide
        width: "100%", // Ensures the table fits the container width
      }}
    >
      <h1 style={{ fontFamily: "cursive" }}>View Orders</h1>
      <hr />
      <TableContainer sx={{ flex: "1", overflow: "auto" }}>
        <Table stickyHeader={true} aria-label="sticky table">
          <TableHead>
            <TableRow
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 1,
              }}
            >
              {headers?.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    minWidth: 120,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: "cursive",
                    textAlign: "center",
                  }}
                  onClick={() => handleSort(toCamelCase(header.toLowerCase()))}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrdersData?.map((order) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                style={{ padding: "10px", fontFamily: "cursive" }}
                //onClick={() => handleClick(order.orderId)}
                key={order?.orderId?.toString()} // Assuming orderId can be converted to string
              >
                <TableCell
                  style={{ minWidth: 50, fontFamily: "cursive" }}
                  align="center"
                >
                  {order?.orderId?.toString()}{" "}
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
                  {order.customerAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  ) : (
    <NoDataComponent
      data="No orders yet"
      children={<Link to="/new-order">Create New Order</Link>}
    ></NoDataComponent>
  );
};

export default ViewOrder;
