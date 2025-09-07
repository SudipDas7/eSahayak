const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // PostgreSQL connection
const bcrypt = require("bcryptjs");


// REGISTER user
router.post("/register", async (req, res) => {
  const { fullName, email, phone, dob, username, password } = req.body;

  try {
    // check if username/email already exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE username=$1 OR email=$2",
      [username, email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await pool.query(
      "INSERT INTO users (fullname, email, phone, dob, username, password_hash) VALUES ($1, $2, $3, $4, $5, $6)",
      [fullName, email, phone, dob, username, hashedPassword]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // find user
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful", user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
