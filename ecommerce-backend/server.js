const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // password hashing
const jwt = require("jsonwebtoken"); // auth token

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = "my_super_secret_key"; // change this in production

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // empty string since no password
  database: "ecommerce_site_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// =========================
// Create USERS table
// =========================
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
db.query(createUsersTable, (err) => {
  if (err) console.log(err);
});

// =========================
// Create ORDERS table
// =========================
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_address TEXT,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  card_number VARCHAR(20),
  card_holder VARCHAR(255),
  card_expiry VARCHAR(10),
  card_cvv VARCHAR(10),
  total DECIMAL(10,2),
  cart_items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
db.query(createOrdersTable, (err) => {
  if (err) console.log(err);
});

// =========================
// SIGNUP API
// =========================
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// LOGIN API
// =========================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  });
});

// =========================
// Middleware to check auth
// =========================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// =========================
// CREATE ORDER (Protected)
// =========================
app.post("/api/orders", authenticateToken, (req, res) => {
  const { customer, payment, cart, total, orderNumber } = req.body;

  const sql = `INSERT INTO orders 
    (order_number, customer_name, customer_email, customer_address, payment_method, transaction_id, card_number, card_holder, card_expiry, card_cvv, total, cart_items)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      orderNumber,
      customer.name,
      customer.email,
      customer.address,
      payment.method,
      payment.transactionId || null,
      payment.cardNumber || null,
      payment.cardHolder || null,
      payment.cardExpiry || null,
      payment.cardCVV || null,
      total,
      JSON.stringify(cart),
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, orderId: result.insertId });
    }
  );
});

// =========================
// START SERVER
// =========================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
