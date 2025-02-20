import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import "jspdf-autotable";
import { CustomerContext } from "../../context/Customer.tsx";
import { OrderContext } from "../../context/Orders.tsx";
import {
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jsPDF } from "jspdf";
import "../../css/downloads.css";
import dayjs, { Dayjs } from 'dayjs';

interface Field {
  label: string;
  key: string;
  selected?: boolean;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  area: string;
  TypeofWork: string;
  credit: number;
  creditLimit: number;
  paymentType: string;
}

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  numberOfItems: number;
  itemDetails: OrderItem[];
  orderCustomerId: string;
  paymentMethod: string;
  balanceAmount: number;
  customerAddress: string;
}

const CustomerFields: Field[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Area ", key: "area" },
  { label: "Type of Work", key: "TypeofWork" },
  { label: "Credit", key: "credit" },
  { label: "Credit Limit", key: "creditLimit" },
  { label: "Pay Type", key: "paymentType" },
];

const OrderFields: Field[] = [
  { label: "Order ID", key: "orderId" },
  { label: "Order Date", key: "orderDate" },
  { label: "Total Order Value", key: "totalOrderValue" },
  { label: "Discount", key: "discount" },
  { label: "Number of Items", key: "numberOfItems" },
  { label: "Item Details", key: "itemDetails" },
  { label: "Order Customer ID", key: "orderCustomerId" },
  { label: "Payment Method", key: "paymentMethod" },
  { label: "Balance Amount", key: "balanceAmount" },
  { label: "Customer Address", key: "customerAddress" },
];

const DownloadReport: React.FC = () => {
  const { CustomerData: customerData } = useContext(CustomerContext);
  const { ordersData } = useContext(OrderContext);
  const [reportType, setReportType] = useState<"Customers" | "Orders">("Customers");
  const [selectedFields, setSelectedFields] = useState<Field[]>(
    CustomerFields.map((field) => ({ ...field, selected: true }))
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [cardLabel] = useState<string>("Report");
  const [data, setData] = useState<any[]>([]);
  const [fileType, setFileType] = useState<"CSV" | "PDF">("CSV");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    setSelectedFields(
      reportType === "Customers"
        ? CustomerFields.map((field) => ({ ...field, selected: true }))
        : OrderFields.map((field) => ({ ...field, selected: true }))
    );
  }, [reportType]);

  const filterOrdersByDate = (orders: Order[]) => {
    if (!startDate || !endDate) return orders;
    return orders.filter((order) => {
      const orderDate = dayjs(order.orderDate);
      return orderDate.isAfter(startDate) && orderDate.isBefore(endDate);
    });
  };

  const filterCustomersByOrderDate = (customers: Customer[]) => {
    if (!startDate || !endDate) return customers;
    return customers.filter((customer) => {
      const customerOrders = ordersData.filter(
        (order) => order.orderCustomerId === customer.id
      );
      return customerOrders.some((order) => {
        const orderDate = dayjs(order.orderDate);
        return orderDate.isAfter(startDate) && orderDate.isBefore(endDate);
      });
    });
  };

  const handleFieldChange = (key: string) => {
    setSelectedFields((fields) =>
      fields.map((field) =>
        field.key === key ? { ...field, selected: !field.selected } : field
      )
    );
  };

  const getSelectedHeaders = () =>
    selectedFields.filter((field) => field.selected);

  const formatItemDetails = (details: OrderItem[] | object): string => {
    if (Array.isArray(details)) {
      return details
        .map((detail) => {
          return detail.name
            ? `${detail.name} (Quantity: ${detail.quantity})`
            : "";
        })
        .join(", ");
    }
    return JSON.stringify(details, null, 2);
  };

  const getSelectedData = () => {
    let currentData = reportType === "Customers" ? customerData : ordersData;
    if (!currentData?.length) return [];

    currentData = reportType === "Orders" 
      ? filterOrdersByDate(currentData)
      : filterCustomersByOrderDate(currentData);

    const headers = getSelectedHeaders();
    if (!headers.length) return [];

    return currentData.map((item) =>
      headers.reduce((acc, field) => ({
        ...acc,
        [field.key]: field.key === "itemDetails" && typeof item[field.key] === "object"
          ? formatItemDetails(item[field.key])
          : item[field.key] || ""
      }), {})
    );
  };

  useEffect(() => {
    setData(getSelectedData());
  }, [customerData, ordersData, selectedFields, reportType, startDate, endDate]);

  const handleFileTypeChange = (event: SelectChangeEvent) => {
    setFileType(event.target.value as "CSV" | "PDF");
  };

  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as "Customers" | "Orders");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const headers = getSelectedHeaders().map((field) => field.label);
    const rows = data.map((item) =>
      getSelectedHeaders().map((field) => item[field.key]?.toString() || '')
    );

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(cardLabel, 20, 10);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
      theme: "striped",
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 12,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        halign: "center",
        valign: "middle",
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30, left: 10, bottom: 10, right: 10 },
    });

    doc.save(`${cardLabel}.pdf`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={{ width: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Download Reports</h1>
      <Grid container spacing={6} sx={{ alignItems: "center", justifyContent: "center" }}>
        <Grid item sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <h2>Select Fields to be Downloaded</h2>
      <div className="grid-container">
        {selectedFields.map((field) => (
          <div
            key={field.key}
            className="grid-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              checked={field.selected}
              onChange={() => handleFieldChange(field.key)}
            />
            <span style={{ paddingLeft: "8px" }}>{field.label}</span>
          </div>
        ))}
      </div>

      <Grid
        container
        spacing={5}
        sx={{
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item sm={3}>
          <FormControl fullWidth>
            <InputLabel>File Type</InputLabel>
            <Select value={fileType} onChange={handleFileTypeChange}>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={3}>
          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select value={reportType} onChange={handleReportTypeChange}>
              <MenuItem value="Orders">Orders</MenuItem>
              <MenuItem value="Customers">Customers</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          {fileType === "CSV" && (
            <CSVLink
              data={data}
              headers={getSelectedHeaders()}
              filename={`${cardLabel}.csv`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" sx={{ margin: "15px" }}>
                Download CSV
              </Button>
            </CSVLink>
          )}
          {fileType === "PDF" && (
            <Button variant="contained" onClick={downloadPDF}>
              Download PDF
            </Button>
          )}
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DownloadReport;