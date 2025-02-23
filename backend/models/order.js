const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderDate: { type: String, required: true },
  totalOrderValue: { type: Number, required: true },
  discount: { type: Number, required: true },
  orderCustomerId: { type: String, required: true },
  itemDetails: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  paidAmount: { type: Number, require: true },
  balanceAmount: { type: Number, required: true },
  customerAddress: { type: String, required: true },
  image: { type: Buffer, require: false },
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
