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
//import { Document, Packer, Paragraph, TextRun, Table, AlignmentType } from "docx";
import "../../css/downloads.css";
import "../../css/downloads.css";

const CustomerFields = [
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

  useEffect(() => {
    setSelectedFields(
      reportType === "Customers"
        ? CustomerFields.map((field) => ({ ...field, selected: true }))
        : OrderFields.map((field) => ({ ...field, selected: true }))
    );
  }, [reportType]);

  const filterOrdersByDate = (orders) => {
    if (!startDate || !endDate) return orders; // If no date is selected, return all orders
    return orders?.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= startDate && orderDate <= endDate; // Filter orders within the range
    });
  };
  const filterCustomersByOrderDate = (customers) => {
    if (!startDate || !endDate) return customers; // If no date range, return all customers
    return customers?.filter((customer) => {
      // Get all orders for the current customer
      const customerOrders = ordersData?.filter(
        (order) => order.orderCustomerId === customer.id
      );

      // Check if any order falls within the date range
      return customerOrders.some((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate; // Check if the order date is within the range
      });
    });
  };

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

    if (reportType === "Orders") {
      currentData = filterOrdersByDate(currentData); // <-- Apply date filter here
    } else {
      currentData = filterCustomersByOrderDate(currentData);
    }
    const headers = getSelectedHeaders();
    if (!headers.length) return [];
    return currentData.map((item) =>
      headers.reduce((acc, field) => {
        if (
          field.key === "itemDetails" &&
          typeof item[field.key] === "object"
        ) {
          acc[field.key] = formatItemDetails(item[field.key]);
        } else {
          acc[field.key] = item[field.key] || "";
        }
        return acc;
      }, {})
    );
  };

  const formatItemDetails = (details) => {
    if (Array.isArray(details)) {
      return details
        .map((detail) => {
          return detail.name
            ? `${detail.name} (Quantity: ${detail.quantity})`
            : "";
        })
        .join(", ");
    } else if (typeof details === "object") {
      return JSON.stringify(details, null, 2);
    }
    return JSON.stringify(details);
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    const headers = getSelectedHeaders().map((field) => field.label);
    const rows = data.map((item) =>
      getSelectedHeaders().map((field) => item[field.key])
    );

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

    doc.save(`${cardLabel || "report"}.pdf`);
  };

  // Define `sendReportToServer` inside the component

  const sendReportToServer = async (fileType, data, headers) => {
    const url = "http://localhost:3000/api/email/send-report"; // Replace with your server URL
    const body = new FormData();

    if (fileType === "CSV") {
      const csvContent = [
        headers.map((header) => header.label).join(","),
        ...data.map((row) =>
          headers.map((header) => row[header.key]).join(",")
        ),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      body.append("file", blob, "report.csv");
    } else if (fileType === "PDF") {
      const doc = new jsPDF();
      const headerLabels = headers.map((header) => header.label);
      const rows = data.map((item) =>
        headers.map((header) => item[header.key])
      );

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Report", 20, 10);
      doc.autoTable({
        head: [headerLabels],
        body: rows,
        startY: 20,
      });

      const pdfBlob = doc.output("blob");
      body.append("file", pdfBlob, "report.pdf");
    }

    body.append("fileType", fileType);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: body,
      });

      if (response.ok) {
        alert("Report sent successfully!");
      } else {
        alert("Failed to send the report.");
      }
    } catch (error) {
      console.error("Error sending report:", error);
      alert("An error occurred while sending the report.");
    }
  };

  // Modify the button onClick handlers

  const handleEmailReport = () => {
    const headers = getSelectedHeaders();
    if (!headers.length) {
      alert("No fields selected for the report.");
      return;
    }
    sendReportToServer(fileType, data, headers);
  };
  // const downloadWord = () => {
  //   const doc = new Document();
  //   const headers = getSelectedHeaders().map((field) => field.label);
  //   const rows = data.map((item) =>
  //     getSelectedHeaders().map((field) => item[field.key])
  //   );

  //   const table = new Table({
  //     rows: rows.length + 1,
  //     columns: headers.length,
  //     width: { size: 100, type: "pct" },
  //     alignment: "center",
  //   });

  //   headers.forEach((header, index) => {
  //     table.getCell(0, index).add(
  //       new Paragraph({
  //         text: header,
  //         alignment: AlignmentType.CENTER,
  //       })
  //     );
  //   });

  //   rows.forEach((row, rowIndex) => {
  //     row.forEach((cell, cellIndex) => {
  //       table.getCell(rowIndex + 1, cellIndex).add(
  //         new Paragraph({
  //           children: [new TextRun(cell)],
  //           alignment: AlignmentType.CENTER,
  //         })
  //       );
  //     });
  //   });

  //   doc.addSection({
  //     children: [
  //       new Paragraph({
  //         text: cardLabel,
  //         heading: "Heading1",
  //       }),
  //       table,
  //     ],
  //   });

  //   Packer.toBlob(doc).then((blob) => {
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `${cardLabel || "report"}.docx`;
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   });
  // };

  return (
    <div style={{ width: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Download Reports</h1>
      <Grid
        container
        spacing={6}
        style={{ alignItems: "center", justifyContent: "center" }}
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
        style={{
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
              {/* <MenuItem value="Word">Word</MenuItem> */}
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
            <>
              <CSVLink
                data={data}
                headers={getSelectedHeaders()}
                filename={`${cardLabel || "report"}.csv`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" style={{ margin: "15px" }}>
                  Download CSV
                </Button>
              </CSVLink>
            </>
          )}
          {fileType === "PDF" && (
            <>
              <Button variant="contained" onClick={downloadPDF}>
                Download PDF
              </Button>
            </>
          )}
          {/* {fileType === "Word" && (
            <Button variant="contained" onClick={downloadWord}>
              Download Word
            </Button>
          )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default DownloadReport;
