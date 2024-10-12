import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import 'jspdf-autotable';
import { UserContext } from "../../context/Customer.tsx";
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
import BasicCard from "../Card/Card.tsx";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "../../css/downloads.css";

const CustomerFields = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Country", key: "area" },
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

const DownloadReport = () => {
  const { userData } = useContext(UserContext);
  const [reportType, setReportType] = useState("Customers");
  const [selectedFields, setSelectedFields] = useState(
    CustomerFields.map((field) => ({ ...field, selected: true }))
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cardLabel, setCardLabel] = useState("Report");
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("CSV");

  useEffect(() => {
    setSelectedFields(
      reportType == "Customers"
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
    selectedFields.filter((field) => field.selected);

  const getSelectedData = () => {
    if (!userData || !userData.length) return [];
    const headers = getSelectedHeaders();
    if (!headers.length) return []; // No fields selected

    return userData.map((item) =>
      headers.reduce((acc, field) => {
        acc[field.key] = item[field.key];
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    const selectedData = getSelectedData();
    setData(selectedData);
  }, [userData, selectedFields]);

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const headers = getSelectedHeaders().map((field) => field.label);
    const rows = data.map((item) =>
      getSelectedHeaders().map((field) => item[field.key])
    );

    doc.text(cardLabel, 20, 10);
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
    });
    doc.save(`${cardLabel || "report"}.pdf`);
  };

  const downloadWord = () => {
    const doc = new Document();
    const headers = getSelectedHeaders().map((field) => field.label);
    const rows = data.map((item) =>
      getSelectedHeaders().map((field) => item[field.key])
    );

    // Add title
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          text: cardLabel,
          heading: "Heading1",
        }),
      ],
    });

    // Add table headers
    const tableRows = [
      headers.map((header) => new TextRun(header)),
      ...rows.map((row) => row.map((value) => new TextRun(value))),
    ];

    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: tableRows,
        }),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cardLabel || "report"}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={{ width: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Download Reports</h1>
      <Grid
        container
        spacing={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <div key={field.key} className="grid-item">
            <label>
              <Checkbox
                checked={field.selected}
                onChange={() => handleFieldChange(field.key)}
              />
              <span>{field.label}</span>
            </label>
          </div>
        ))}
      </div>

      <Grid
        container
        spacing={5}
        style={{
          marginTop: "20px",
          display: "flex",
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
              <MenuItem value="Word">Word</MenuItem>
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
        <Grid item sm={6} style={{ alignSelf: "flex-end" }}>
          {fileType === "CSV" && (
            <CSVLink
              data={data}
              headers={getSelectedHeaders()}
              filename={`${cardLabel || "report"}.csv`}
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Download CSV</Button>
            </CSVLink>
          )}
          {fileType === "PDF" && (
            <Button variant="contained" onClick={downloadPDF}>
              Download PDF
            </Button>
          )}
          {fileType === "Word" && (
            <Button variant="contained" onClick={downloadWord}>
              Download Word
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DownloadReport;
