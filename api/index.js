const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconnect = require("../database/dbconfig");
const router = require("../routes/data");

dotenv.config();

const app = express();

app.use(express.json());
// ✅ CORS (Vercel safe)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://signup-kappa-six.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

dbconnect();

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel 🚀");
});

// ❌ DO NOT USE app.listen
module.exports = app;
