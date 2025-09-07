/*async function seedAdmin() {
  const fullname = "Sudip Das";
  const email = "sudipdas@sahayak.com";
  const phone = "7439324198";
  const dob = "2005-05-16";
  const username = "Sudip_07";
  const password = "Sudip@1234"; // raw
  const role = "admin";*/

/*const pool = require("./config/db");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("Sudip@1234", 10); // 👈 default admin password

    await pool.query(
      `INSERT INTO users (fullname, username, phone, email, dob, password_hash, role) 
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (username) DO NOTHING`,  // avoids duplicate admin
      [
        "Sudip Das",
        "Sudip_07",
        "7439324198",
        "sudipdas@sahayak.com",
        "2005-05-16",
        hashedPassword,
        "admin",
      ]
    );

    console.log("✅ Admin user inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting admin:", err.message);
  } finally {
    pool.end();
  }
}

seedAdmin();*/

const pool = require("./config/db");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("Admin@1234", 10);

    await pool.query(
      `INSERT INTO users (fullname, username, phone, email, dob, password_hash, role) 
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (username) 
       DO UPDATE SET 
         fullname = EXCLUDED.fullname,
         phone = EXCLUDED.phone,
         email = EXCLUDED.email,
         dob = EXCLUDED.dob,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role`,
      [
        "Admin User",
        "Admin_01",
        "7439324189",
        "admin@sahayak.com",
        "2000-01-01",
        hashedPassword,
        "admin",
      ]
    );

    console.log("✅ Admin user inserted/updated successfully!");
  } catch (err) {
    console.error("❌ Error inserting/updating admin:", err.message);
  } finally {
    pool.end();
  }
}

seedAdmin();
