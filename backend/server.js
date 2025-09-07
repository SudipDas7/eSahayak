/* const express = require("express");
const cors = require("cors");
const pool = require("./config/db");  // 👈 import DB connection

const app = express();
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("eSahayak Backend is running!");
});

// Test database route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ server_time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ eSahayak Backend running on port 5000")); */

const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // 👈 PostgreSQL connection

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("eSahayak Backend is running!");
});

// Test database route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ server_time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () =>
  console.log("✅ eSahayak Backend running on port 5000")
);

