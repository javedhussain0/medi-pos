import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modules/User.js";

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

export const register = async (req, res) => {
  const { name, email, password, phone, avatar, role } = req.body;

  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "name, email, phone and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      avatar,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Please register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login Successful",
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  return res.status(200).json(req.user);
};

export const updateMyProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "phone", "avatar"];
    const updates = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Cannot update profile", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "oldPassword and newPassword are required" });
    }

    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot change password", error: error.message });
  }
};
