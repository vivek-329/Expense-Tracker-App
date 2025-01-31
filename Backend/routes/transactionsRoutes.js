const express = require('express');
const router = express.Router();

// Import your model for creating transactions
const Transaction = require('../models/Transaction');

// POST route to create a new transaction
router.post('/', async (req, res, next) => {  // 'next' added to handle errors properly
    const { text, amount } = req.body;

    // Validate input
    if (!text || !amount) {
        return res.status(400).json({ message: 'Text and amount are required' });
    }

    try {
        const newTransaction = new Transaction({ text, amount });
        await newTransaction.save();
        res.status(201).json(newTransaction);  // Send created transaction as response
    } catch (err) {
        next(err);  // Pass error to error handler middleware
    }
});

module.exports = router;
