const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");



const router = express.Router();
const JWT_SECRET =
  "ba3326fa9dabf244dbf985906cc46615da64ee19b7812ab964615b2e7986a55c";

// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Logged in", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout User
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// Middleware for Auth
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
};

// Middleware for Roles
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};


module.exports = router;
