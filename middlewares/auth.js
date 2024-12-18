const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { failureResponse } = require("../utils/apiResponder");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return failureResponse(res, "No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(decoded);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return failureResponse(res, "Invalid or expired token", 401);
  }
};

module.exports = auth;
