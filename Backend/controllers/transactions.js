const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res) => {
  try {
    console.log('Fetching transactions - Request received');
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    console.log(`Transactions found: ${transactions.length}`);
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    console.error('Get Transactions Error:', {
      message: err.message,
      stack: err.stack
    });
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to fetch transactions'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res) => {
  try {
    console.log('Add Transaction - Request received:', req.body);

    const { text, amount, category } = req.body;

    // Validate input
    if (!text || text.trim() === '') {
      console.warn('Add Transaction - Missing description');
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }

    if (amount === undefined || amount === null) {
      console.warn('Add Transaction - Missing amount');
      return res.status(400).json({
        success: false,
        error: 'Amount is required'
      });
    }

    const transaction = await Transaction.create({
      text: text.trim(), 
      amount: parseFloat(amount), 
      category: category ? category.trim() : 'Uncategorized'
    });
  
    console.log('Transaction created successfully:', transaction);
    return res.status(201).json({
      success: true,
      data: transaction
    }); 
  } catch (err) {
    console.error('Add Transaction Error:', {
      message: err.message,
      name: err.name,
      stack: err.stack
    });
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error: Unable to add transaction'
      });
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res) => {
  try {
    console.log('Delete Transaction - Request received:', req.params.id);
    
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      console.warn('Delete Transaction - Transaction not found');
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    await transaction.remove();

    console.log('Transaction deleted successfully');
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Delete Transaction Error:', {
      message: err.message,
      stack: err.stack
    });
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to delete transaction'
    });
  }
}