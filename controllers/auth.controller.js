const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse, failureResponse } = require("../utils/apiResponder");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Password validation function
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const register = async (req, res) => {
  try {
    // Input sanitization
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ValidationError("All fields are required");
    }

    // Password validation
    if (!validatePassword(password)) {
      throw new ValidationError(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    return successResponse(res, user, "User registration successful");
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      return failureResponse(res, error.message);
    }

    // Handle other errors
    return failureResponse(res, "An unexpected error occurred");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) return failureResponse(res, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return failureResponse(res, "Invalid credentials", 401);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return successResponse(res, { user, token }, "Login Successfull");
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      return failureResponse(res, error.message);
    }

    // Handle other errors
    return failureResponse(res, error.message);
  }
};

const me = async (req, res) => {
  try {
    const user = req.user;
    return successResponse(res, user, "User fetched successfully", 200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  me,
};
