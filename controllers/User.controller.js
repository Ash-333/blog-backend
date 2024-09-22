const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const dotenv = require("dotenv").config();
const resetTokenSchema = require("../models/ResetToken");
const sendResetEmail = require("../middlewares/mailer");

// Register a new user
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Authenticate a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Forget Password
exports.forgetPassword = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ msg: "User not found" });
    }

    const resetToken = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    const resetTokenModel = new resetTokenSchema({
      email,
      token: resetToken,
      expires,
    });
    await resetTokenModel.save();

    sendResetEmail(email, resetToken);

    res.status(200).json({ msg: "Reset token has been sent to your email" });
  } catch (error) {
    res.status(500).json({ msg: `${error}` });
  }
};

//Password reset with new one
exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const resetToken = await resetTokenSchema.findOne({ email, token });
    if (!resetToken || resetToken.expires < new Date()) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const hashedPW = await bcrypt.hash(newPassword, 10);
    user.password = hashedPW;
    await user.save();

    await resetTokenSchema.deleteOne({ email: email, token: resetToken });
    res.status(200).json({ msg: "Password reset successfull" });
  } catch (error) {
    res.status(500).json({ msg: `${error}` });
  }
};
