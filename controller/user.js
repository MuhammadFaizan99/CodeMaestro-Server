const { userModel } = require("../model/userSch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { Name, Email, Password, ConfirmPassword } = req.body;

    // Check if passwords match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user
    const newUser = new userModel({
      Name,
      Email,
      Password: hashedPassword,
      ConfirmPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.Role }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, signIn };
