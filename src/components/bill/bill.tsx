import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { PDFViewer } from "@react-pdf/renderer";
import { OrderContext } from "../../context/Orders.tsx";
import { CustomerContext } from "../../context/Customer.tsx";

// Reference image from public folder
const billheader = process.env.PUBLIC_URL + "/billheader.jpg";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "yellow",
    borderRadius: 10,
    padding: 12,
  },
  logoSection: {
    flexDirection: "row",
    gap: 10,
  },
  logoContainer: {
    width: 80,
    height: 80,
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  companyInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "80px",
  },
  companyName: {
    color: "#D92323",
    fontSize: 16,
    fontWeight: "bold",
  },
  companySubName: {
    color: "#D92323",
    fontSize: 14,
    fontWeight: "bold",
  },
  address: {
    fontSize: 10,
    marginTop: 5,
  },
  contactInfo: {
    alignItems: "flex-end",
  },
  phone: {
    fontSize: 10,
    marginBottom: 5,
  },
  qrCode: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
  },
  billDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderTop: 1,
    borderBottom: 1,
    borderColor: "#999",
    paddingVertical: 10,
  },
  billTo: {
    flex: 1,
  },
  billNumbers: {
    flexDirection: "row",
    gap: 20,
  },
  table: {
    flexDirection: "column",
    marginTop: 10,
    border: "1px solid black",
    borderRadius: "5px",
    minHeight: 320,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#999",
    paddingBottom: 5,
    fontWeight: "bold",
    padding: "10px",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    height: 50,
    position: "relative",
  },
  column1: {
    width: "10%",
    textAlign: "center",
  },
  column2: {
    width: "50%",
    textAlign: "center",
  },
  column3: {
    width: "20%",
    textAlign: "center",
  },
  column4: {
    width: "20%",
    textAlign: "center",
  },
  watermark: {
    position: "absolute",
    left: "40%",
    top: "40%",
    opacity: 0.1,
    transform: "rotate(-45deg)",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  transportDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  calculations: {
    flex: 1,
    borderLeft: 1,
    paddingLeft: 10,
    borderColor: "#999",
  },
  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  bankTitle: {
    fontWeight: "bold",
    fontSize: 10,
  },
  bankInfo: {
    fontSize: 9,
  },
  carLogos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  signature: {
    fontSize: 10,
    textAlign: "right",
    marginTop: 10,
  },
  bankDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bankInfoSection: {
    flex: 1,
  },
  carLogosSection: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  carLogo: {
    fontSize: 10,
    marginBottom: 5,
  },
});

// Create Document Component
const BillDocument = (props) => {
  let Total =
    props?.data &&
    props?.data[0]?.itemDetails?.reduce((acc, item) => acc + item.value, 0);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image src={billheader} style={styles.logo} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>5S AUTOMOBILE TRADING &</Text>
              <Text style={styles.companySubName}>RECYCLING (I) PVT.LTD.</Text>
              <Text style={styles.address}>
                Shop No. 1, Maral House, Near Hp Petrol Pume,
              </Text>
              <Text style={styles.address}>Kondwa BkPune 411048.</Text>
              <Text style={styles.address}>Email: fivesalr@outlook.com</Text>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.phone}>8530955595</Text>
            <Text style={styles.phone}>9822382432</Text>
          </View>
        </View>

        {/* Bill Details */}
        <View style={styles.billDetails}>
          <View style={styles.billTo}>
            <Text>To,</Text>
            <Text>{props.customerName}</Text>
          </View>
          <View style={styles.billNumbers}>
            <Text>Order No: {props?.data[0]?.orderId}</Text>
            <Text>
              C. Code:{"\t"}{props?.data && props?.data[0]?.orderCustomerId}
            </Text>
          </View>
        </View>
        <Text>Date: {format(new Date(), "dd/MM/yyyy")}</Text>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.column1}>Sr.No.</Text>
            <Text style={styles.column2}>Particular</Text>
            <Text style={styles.column3}>Qty.</Text>
            <Text style={styles.column4}>Amount</Text>
          </View>

          {props?.data &&
            props?.data[0]?.itemDetails?.map((item, index) => (
              <View style={styles.tableRow}>
                <Text style={styles.column1}>{index + 1}</Text>
                <Text style={styles.column2}>{item.name}</Text>
                <Text style={styles.column3}>{1}</Text>
                <Text style={styles.column4}>{item.value}</Text>
              </View>
            ))}
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.transportDetails}>
            <Text>Transport Details</Text>
            <Text>L. R. No.:_________________________</Text>
            <Text>Address.:_________________________</Text>
            <Text>Qty.: _________ Mob.:___________</Text>
            <Text>GST No.: 27AABCZ9936E1ZX</Text>
          </View>
          <View style={styles.calculations}>
            <View style={styles.calcRow}>
              <Text>Total</Text>
              <Text>{Total}</Text>
            </View>
            <View style={styles.calcRow}>
              <Text>CGST %</Text>
              <Text>{Total * 0.01}</Text>
            </View>
            <View style={styles.calcRow}>
              <Text>SGST %</Text>
              <Text>{Total * 0.01}</Text>
            </View>
            <View style={styles.calcRow}>
              <Text>IGST %</Text>
              <Text>________</Text>
            </View>
            <View style={styles.calcRow}>
              <Text>Grand Total</Text>
              <Text>{Total + 0.02 * Total}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bankDetails}>
          {/* Bank Details Section */}
          <View style={styles.bankInfoSection}>
            <Text style={styles.bankTitle}>Bank Details</Text>
            <Text style={styles.bankInfo}>ICICI Bank</Text>
            <Text style={styles.bankInfo}>Branch Pune - Kondhwa</Text>
            <Text style={styles.bankInfo}>Current A/c.: 5S Automobile</Text>
            <Text style={styles.bankInfo}>
              Trading & Recycling (I) Pvt. Ltd
            </Text>
            <Text style={styles.bankInfo}>A/c No.: 777705235523</Text>
            <Text style={styles.bankInfo}>IFSC Code: ICIC0000074</Text>
          </View>
          <View style={styles.qrCode} />

        </View>
      </Page>
    </Document>
  );
};

// Wrap the document in a viewer
const BillPDFViewer = () => {

  const location = new URLSearchParams(useLocation().search);
  const orderId = location.get("id");
  const { ordersData } = useContext(OrderContext);
  const { CustomerData } = useContext(CustomerContext);
  let orderBillDetails =
    ordersData && ordersData.filter((order) => order.orderId === orderId);
    let customerName = CustomerData && CustomerData?.filter(customer => customer.id === orderBillDetails[0].orderCustomerId)[0]?.name;  return (
    <PDFViewer width="100%" height={800}>
      <BillDocument data={orderBillDetails} customerName={customerName}/>
    </PDFViewer>
  );
};

export default BillPDFViewer;
