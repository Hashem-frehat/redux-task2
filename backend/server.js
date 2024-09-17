const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const knex = require("./db/knexfile");
const setupDb = require("./db/knex");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Database setup
setupDb();

// Update CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5174"], // Add all your allowed origins here
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
