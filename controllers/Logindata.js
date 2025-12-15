const loginuser = require("../models/loginuser");
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken");
require("dotenv").config(); // to use JWT secret from .env
exports.Logindata = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await loginuser.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password done");

    const newUser = await loginuser.create({ name, email, password: hashedPassword });
    console.log("User created:", newUser._id);

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "vijay@12345",
      { expiresIn: "2h" }
    );
    console.log("JWT created:", token);

    return res.status(201).json({ success: true, message: "User created", token, user: newUser });

  } catch (err) {
    console.error("Controller Error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
  }
};
