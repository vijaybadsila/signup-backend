const loginuser = require("../models/loginuser");
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken");
require("dotenv").config(); // to use JWT secret from .env

exports.Logindata = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await loginuser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create the user
    const newUser = await loginuser.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "vijay@12345", // use .env or fallback
      { expiresIn: "2h" }
    );

    // 6️⃣ Respond to client
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token, // send JWT to frontend
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
