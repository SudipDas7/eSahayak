const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // your postgres username
  host: 'localhost',
  database: 'esahayak',    // your DB name
  password: 'Sulina@45221', // your postgres password
  port: 5432,
});

// Check connection once
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch(err => console.error("❌ Connection error", err));

module.exports = pool;
