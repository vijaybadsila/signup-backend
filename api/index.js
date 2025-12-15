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
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" //api
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

dbconnect();

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel 🚀");
});

// ❌ DO NOT USE app.listen
module.exports = app;
