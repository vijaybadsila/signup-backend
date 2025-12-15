const mongoose = require("mongoose");

// Define schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },

  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
    verified: { type: Boolean, default: false },
});

// Export model
module.exports = mongoose.model("LoginUser", LoginSchema);
