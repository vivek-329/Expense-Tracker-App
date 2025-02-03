const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ transactions });
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;