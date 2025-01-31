const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path');
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(express.json());

// Import routes
const transactionRoutes = require("../Backend/routes/transactionsRoutes");

// Mount routers
app.use("/api/v1/transactions", transactionRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/build')));
    app.get("/", (req, res) => res.send(__dirname, '../Frontend/build/index.html'));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
