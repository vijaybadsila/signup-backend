const User = require("../models/loginuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🟢 SIGNIN CONTROLLER
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup first.",
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please try again.",
      });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET || "vijay@12345",
      { expiresIn: "2h" }
    );

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing in",
    });
  }
};
