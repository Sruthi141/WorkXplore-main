import express from 'express';
import {
  createAdmin,
  createUser,
  deleteUser,
  getAdminJobs,
  getAllUsers,
  getAppliedJobs
} from '../controllers/adminController.js';

const router = express.Router();

// Get applied jobs of a student
router.route("/get/:studentId").get(getAppliedJobs);

// Get jobs posted by recruiter/admin
router.route("/getjobs/:recruiterId").get(getAdminJobs);

// Get all users
router.route("/users").get(getAllUsers);

// Create user
router.route("/users").post(createUser);

// ✅ ONLY NECESSARY CHANGE: use DELETE instead of GET for delete
router.route("/users/delete/:id").delete(deleteUser);

// Create admin
router.route("/create").post(createAdmin);

export default router;