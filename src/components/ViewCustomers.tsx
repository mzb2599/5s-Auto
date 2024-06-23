import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { UserContext } from "../context/Customer.tsx";
import NoDataComponent from "./NoData.tsx";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { userData } = React.useContext(UserContext);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = [
    "Id",
    "NAME",
    "PHONE",
    "CITY",
    "STATE",
    "VEHICLE",
    "CREDIT-LIMIT",
    "PAYMENT-TYPE",
  ];
  const history = useNavigate();
  const handleClick = (id) => {
    history(`/user-details`);
  };
  return userData ? (
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
                  //onClick={handleClick}
                >
                  {userData.length > 0 ? header : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => {
              //const value = row[column.id];
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  style={{ padding: "10px", fontFamily: "cursive" }}
                  onClick={handleClick(user.id)}
                  key={user.id}
                >
                  <TableCell
                    style={{ minWidth: 50, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 150, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.phone}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.city}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 60, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.state}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 120, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.vehicle}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 50, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.creditLimit}
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 40, fontFamily: "cursive" }}
                    align="center"
                  >
                    {user.paymentType}
                  </TableCell>
                </TableRow>
              );
            })}
            {userData.length === 0 && (
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
        count={userData.length} // Total number of rows
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
