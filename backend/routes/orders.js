const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new Order (POST)
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the order', details: error });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    // Ensure that the request body contains an array of customers
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: 'Request body must contain an array of customers' });
    }

    // Bulk insert the array of customers into the database
    const newOrders = await Order.insertMany(req.body);

    // Return the inserted customers as a response
    res.status(201).json(newOrders);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create orders', details: error });
  }
});

// Get all Orders (GET)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve orders', details: error });
  }
});

// Get a specific Order by ID (GET)
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve order', details: error });
  }
});

// Update an Order (PUT)
router.put('/:orderCustomerId', async (req, res) => {
  try {
    const updatedOrder = await Order.updateMany(
      { orderCustomerId: req.params.orderCustomerId },
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the order', details: error });
  }
});

// Delete an Order (DELETE)
router.delete('/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the order', details: error });
  }
});

module.exports = router;
