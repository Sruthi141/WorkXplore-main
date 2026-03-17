import bcrypt from "bcryptjs"; // ✅ missing import
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

// Get all students and recruiters
export const getAllUsers = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    const recruiters = await User.find({ role: "recruiter" });
    const admins = await User.find({ role: "admin" });

    // ✅ find() returns [] not null, so check length
    if (students.length === 0 && recruiters.length === 0 && admins.length === 0) {
      return res.status(404).json({
        message: "No users found.",
        success: false,
      });
    }

    return res.status(200).json({ students, recruiters, admins, success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered", success: false });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

export const createAdmin = async (req, res) => {
  const { fullname, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    return res.status(201).json({
      message: "Admin created successfully",
      success: true,
      admin: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating admin",
      success: false,
      error: error.message,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const { studentId } = req.params;

    const applications = await Application.find({ applicant: studentId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found for the specified student.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobs = await Job.find({ created_by: recruiterId })
      .populate("company")
      .sort({ createdAt: -1 }); // ✅ sorting fixed

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};