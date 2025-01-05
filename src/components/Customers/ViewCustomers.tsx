import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CustomerContext } from "../../context/Customer.tsx";
import NoDataComponent from "../NoData.tsx";
import { Button } from "@mui/material";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { CustomerData, setCustomerData } = React.useContext(CustomerContext);
  const [sortType, setSortType] = useState("asc");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const sortUserDataByHeader = (CustomerData, header, sortOrder) => {
    const sortedData = [...CustomerData];

    sortedData?.sort((a, b) => {
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
  const headers = [
    "Id",
    "NAME",
    "PHONE",
    "CITY",
    "STATE",
    "TypeofWork",
    "GST No",
    "CREDIT-LIMIT",
    "PAYMENT-TYPE",
    "ACTIONS",
  ];

  const handleDelete = (id) => {
    setCustomerData(CustomerData?.filter((customer) => customer.id !== id));
  };
  const handleSort = (header) => {
    sortType === "asc" ? setSortType("desc") : setSortType("asc");
    setCustomerData(sortUserDataByHeader(CustomerData, header, sortType));
  };
  return CustomerData ? (
    <Paper
      sx={{
        height: "max-content",
        width: "max-content",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontFamily: "cursive" }}>View Customers</h1>
      <hr />
      <TableContainer sx={{ flex: "1", overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers?.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    minWidth: 120,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: "cursive",
                  }}
                  onClick={() => handleSort(toCamelCase(header.toLowerCase()))}
                  align="center"
                  //onClick={handleClick}
                >
                  {CustomerData?.length > 0 ? header : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {CustomerData?.map((customer) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  style={{ padding: "10px", fontFamily: "cursive" }}
                  //onClick={handleClick(customer.id)}
                  key={customer.id}
                >
                  <TableCell
                    style={{ minWidth: 50, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.id}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 150, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.name}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.phone}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.city}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.state}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 120, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.TypeofWork}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 50, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.creditLimit}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 40, fontFamily: "cursive" }}
                    align="center"
                  >
                    {customer.paymentType}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 40, fontFamily: "cursive" }}
                    align="center"
                  >
                    <Button
                      style={{ backgroundColor: "#d32f2f", color: "white" }}
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{ backgroundColor: "#0288d1", color: "white" }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {CustomerData?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "25vh 26vw",
                  fontFamily: "cursive",
                }}
              >
                <h1>No Data Available</h1>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={CustomerData?.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Function to handle page changes
        onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page changes
      />
    </Paper>
  ) : (
    <NoDataComponent
      data={"No customers available"}
      children={<Link to="/add-customer">Add new customers</Link>}
    ></NoDataComponent>
  );
}
