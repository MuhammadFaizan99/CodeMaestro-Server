const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    ConfirmPassword: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user' // Default role is set to user
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
