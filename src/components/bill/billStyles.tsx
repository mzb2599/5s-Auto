import { StyleSheet } from "@react-pdf/renderer";
//styles
export const styles = StyleSheet.create({
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
    border: '1px solid black',
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
    marginLeft: "50px",
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
