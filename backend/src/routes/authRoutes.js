import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

let generateToken = (userID, email) => {
  let payload = { userID, email };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "5d" });
};

// register
router.post("/register", async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (userName.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    let existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // get random avatar
    let profileImage = `https://api.dicebear.com/9.x/adventurer/svg?seed=${userName}`;

    const user = await User.create({ userName, email, password, profileImage });
    // Generate JWT token
    let token = generateToken();
    res.json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    let token = generateToken(user._id, user.email);
    res.json({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
