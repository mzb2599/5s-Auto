const mongoose = require("mongoose");

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  gstNo: { type: String, required: true },
  area: { type: String, required: true },
  TypeofWork: { type: String, required: true },
  creditLimit: { type: Number, required: true },
  paymentType: { type: String, required: true },
  lastOrderDate: { type: String, require: false },
  paidAmount: { type: Number, require: true },
  balanceAmount: { type: Number, required: true },
});

// Create the Customer model
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
