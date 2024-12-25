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
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jsPDF } from "jspdf";
import emailjs from "emailjs-com";
import "../../css/downloads.css";

// Report fields configuration
const CustomerFields = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Area", key: "area" },
  { label: "Type of Work", key: "TypeofWork" },
  { label: "Credit", key: "credit" },
  { label: "Credit Limit", key: "creditLimit" },
  { label: "Pay Type", key: "paymentType" },
];

const OrderFields = [
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

const EmailReport = () => {
  const { CustomerData: customerData } = useContext(CustomerContext);
  const { ordersData } = useContext(OrderContext);
  const [reportType, setReportType] = useState("Customers");
  const [selectedFields, setSelectedFields] = useState(
    CustomerFields.map((field) => ({ ...field, selected: true }))
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cardLabel, setCardLabel] = useState("Report");
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("CSV");
  const [email, setEmail] = useState("");

  // Update selected fields based on report type
  useEffect(() => {
    setSelectedFields(
      reportType === "Customers"
        ? CustomerFields.map((field) => ({ ...field, selected: true }))
        : OrderFields.map((field) => ({ ...field, selected: true }))
    );
  }, [reportType]);

  const handleFieldChange = (key) => {
    setSelectedFields((fields) =>
      fields.map((field) =>
        field.key === key ? { ...field, selected: !field.selected } : field
      )
    );
  };

  const getSelectedHeaders = () =>
    selectedFields?.filter((field) => field.selected);

  const getSelectedData = () => {
    let currentData = reportType === "Customers" ? customerData : ordersData;
    if (!currentData || !currentData.length) return [];

    const headers = getSelectedHeaders();
    if (!headers.length) return [];
    return currentData.map((item) =>
      headers.reduce((acc, field) => {
        acc[field.key] = item[field.key] || "";
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    const selectedData = getSelectedData();
    setData(selectedData);
  }, [customerData, ordersData, selectedFields, reportType]);

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  // Function to send email with report
  const sendEmail = (fileData, fileType, email) => {
    const templateParams = {
      to_email: email,
      subject: `${cardLabel || "Report"}`,
      message: "Please find the attached report.",
      file_name: `${cardLabel || "report"}.${fileType}`,
      file_data: fileData,
    };

    console.log(templateParams);
    
    emailjs.send("service_bnyi69v", "template_yldfo5w", templateParams, "HicOcgHhr87_xIH-I")
      .then(
        (response) => {
          console.log("Email sent successfully", response);
          alert('Email sent successfully');
        },
        (error) => {
          console.log("Error sending email", error);
        }
      );
  };

  const handleSendEmail = (fileType) => {
    let fileData = "";

    if (fileType === "CSV") {
      // Convert data to CSV string
      const headers = getSelectedHeaders().map((field) => field.label);
      const csvData = [
        headers,
        ...data.map((item) => getSelectedHeaders().map((field) => item[field.key])),
      ];
      fileData = "data:text/csv;charset=utf-8," + csvData.map((row) => row.join(",")).join("\n");
    } else if (fileType === "PDF") {
      // Generate PDF and get base64 string
      const doc = new jsPDF();
      const headers = getSelectedHeaders().map((field) => field.label);
      const rows = data.map((item) => getSelectedHeaders().map((field) => item[field.key]));

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(cardLabel || "Report", 20, 10);

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

      fileData = doc.output("datauristring"); // Get base64 encoded PDF string
    }

    sendEmail(fileData, fileType, email);
  };

  return (
    <div style={{ width: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Download Reports</h1>
      <Grid container spacing={6} style={{ alignItems: "center", justifyContent: "center" }}>
        <Grid item sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <h2>Select Fields to be Downloaded</h2>
      <div className="grid-container">
        {selectedFields.map((field) => (
          <div key={field.key} className="grid-item" style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={field.selected} onChange={() => handleFieldChange(field.key)} />
            <span style={{ paddingLeft: "8px" }}>{field.label}</span>
          </div>
        ))}
      </div>

      <Grid container spacing={5} style={{ marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
        <Grid item sm={3}>
          <TextField
            label="Recipient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>

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
          <Button variant="contained" onClick={() => handleSendEmail(fileType)}>
            Send via Email
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{ marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
        <Grid item sm={3}>
          <CSVLink data={data} headers={getSelectedHeaders()} filename="report.csv">
            <Button variant="contained">Download CSV</Button>
          </CSVLink>
        </Grid>

        <Grid item sm={3}>
          <Button
            variant="contained"
            onClick={() => {
              const doc = new jsPDF();
              const headers = getSelectedHeaders().map((field) => field.label);
              const rows = data.map((item) => getSelectedHeaders().map((field) => item[field.key]));

              doc.setFontSize(18);
              doc.setFont("helvetica", "bold");
              doc.text(cardLabel || "Report", 20, 10);

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

              doc.save(`${cardLabel || "Report"}.pdf`);
            }}
          >
            Download PDF
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailReport;
