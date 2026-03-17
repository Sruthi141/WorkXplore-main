import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { recruiterOnly } from "../middlewares/recruiterOnly.js";

import {
  postJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controllers/jobController.js";

const router = express.Router();

// ✅ Recruiter protected routes
router.post("/post", isAuthenticated, recruiterOnly, postJob);
router.get("/getadminjobs", isAuthenticated, recruiterOnly, getAdminJobs);

// ✅ Public routes
router.get("/get", getAllJobs);
router.get("/get/:id", getJobById);

export default router;