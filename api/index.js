const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconnect = require("../database/dbconfig");
const router = require("../routes/data");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://signup-kappa-six.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 👇 REQUIRED for Vercel preflight
app.options("*", cors());

dbconnect();

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel 🚀");
});

// ❌ DO NOT USE app.listen
module.exports = app;
