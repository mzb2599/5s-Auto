const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new Customer (POST)
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create customer', details: error });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    // Ensure that the request body contains an array of customers
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: 'Request body must contain an array of customers' });
    }

    // Bulk insert the array of customers into the database
    const newCustomers = await Customer.insertMany(req.body);

    // Return the inserted customers as a response
    res.status(201).json(newCustomers);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create customers', details: error });
  }
});


// Get all Customers (GET)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve customers', details: error });
  }
});

// Get a specific Customer by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ id: req.params.id });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve customer', details: error });
  }
});

// Update a Customer (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update customer', details: error });
  }
});

// Delete a Customer (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ id: req.params.id });
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete customer', details: error });
  }
});

module.exports = router;
