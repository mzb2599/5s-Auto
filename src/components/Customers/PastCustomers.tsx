import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Box,
  TableSortLabel,
} from "@mui/material";
import { subMonths } from "date-fns";
import { CustomerContext } from "../../context/Customer.tsx";
import NoDataComponent from "../NoData.tsx";

// Types
interface Customer {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  TypeofWork: string;
  // gstNo: string;
  creditLimit: number;
  paymentType: string;
  lastOrderDate: string;
}

interface PastCustomersProps {
  area?: string;
}

type SortOrder = "asc" | "desc";
type DurationType = "All" | "1" | "3" | "6";

interface Column {
  id: keyof Customer;
  label: string;
  minWidth: number;
  align?: "center";
}

// Constants
const ROWS_PER_PAGE_OPTIONS = [10, 25, 100] as const;
const DURATION_OPTIONS = [
  { value: "All", label: "All" },
  { value: "1", label: "1 Month" },
  { value: "3", label: "3 Months" },
  { value: "6", label: "6 Months" },
] as const;

const COLUMNS: Column[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "phone", label: "Phone", minWidth: 60 },
  { id: "city", label: "City", minWidth: 60 },
  { id: "state", label: "State", minWidth: 60 },
  { id: "TypeofWork", label: "Type of Work", minWidth: 120 },
  // { id: "gstNo", label: "GST No", minWidth: 120 },
  { id: "creditLimit", label: "Credit Limit", minWidth: 50 },
  { id: "paymentType", label: "Payment Type", minWidth: 40 },
  { id: "lastOrderDate", label: "Last Order Date", minWidth: 40 },
];

// Components
const TableHeader: React.FC<{
  onSort: (columnId: keyof Customer) => void;
  sortType: SortOrder;
  sortColumn: keyof Customer | null;
}> = ({ onSort, sortType, sortColumn }) => (
  <TableHead>
    <TableRow>
      {COLUMNS.map((column) => (
        <TableCell
          key={column.id}
          align={column.align || "center"}
          style={{
            minWidth: column.minWidth,
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <TableSortLabel
            active={sortColumn === column.id}
            direction={sortType}
            onClick={() => onSort(column.id)}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {column.label}
            </Typography>
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const DurationFilter: React.FC<{
  duration: DurationType;
  onDurationChange: (event: SelectChangeEvent) => void;
}> = ({ duration, onDurationChange }) => (
  <FormControl sx={{ m: 1, width: 120 }} size="small">
    <InputLabel>Duration</InputLabel>
    <Select value={duration} label="Duration" onChange={onDurationChange}>
      {DURATION_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const PastCustomers: React.FC<PastCustomersProps> = ({ area }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [sortType, setSortType] = useState<SortOrder>("asc");
  const [sortColumn, setSortColumn] = useState<keyof Customer | null>(null);
  const [duration, setDuration] = useState<DurationType>("All");
  const { CustomerData } = useContext(CustomerContext);

  // Memoized sorting function
  const sortData = (data: Customer[], column: keyof Customer, order: SortOrder) => {
    return [...data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      const stringA = String(valueA).toUpperCase();
      const stringB = String(valueB).toUpperCase();
      
      return order === "asc"
        ? stringA.localeCompare(stringB)
        : stringB.localeCompare(stringA);
    });
  };

  // Memoized filtered and sorted data
  const filteredData = useMemo(() => {
    let result = [...CustomerData];

    // Apply duration filter
    if (duration !== "All") {
      const today = new Date();
      const cutoffDate = subMonths(today, Number(duration));
      result = result.filter(
        (customer) => new Date(customer.lastOrderDate) < cutoffDate
      );
    }

    // Apply area filter
    if (area) {
      result = result.filter((customer) => 
        {
          return customer.city.toLowerCase() === area.toLowerCase()
        })
    }

    // Apply sorting
    if (sortColumn) {
      result = sortData(result, sortColumn, sortType);
    }

    return result;
  }, [CustomerData, duration, area, sortColumn, sortType]);

  // Event handlers
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: keyof Customer) => {
    const isAsc = sortColumn === column && sortType === "asc";
    setSortType(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleDurationChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value as DurationType);
    setPage(0);
  };

  if (!CustomerData?.length) {
    return (
      <NoDataComponent
        data="No customers available"
        children={
          duration === "All" && <Link to="/add-customer">Add new customers</Link>
        }
      />
    );
  }

  return (
    <Paper sx={{ width: "100%"}}>
      <Box sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h1">
            View Customers
          </Typography>
          {area===undefined && <DurationFilter
            duration={duration}
            onDurationChange={handleDurationChange}
          /> }
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: "calc(100vh)" }} >
        <Table stickyHeader>
          <TableHeader
            onSort={handleSort}
            sortType={sortType}
            sortColumn={sortColumn}
          />
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow hover key={customer.id}>
                  {COLUMNS.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                    >
                      {customer[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{marginBottom:"100px"}}
      />
    </Paper>
  );
};

export default PastCustomers;