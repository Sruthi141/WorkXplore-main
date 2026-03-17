import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus
} from "../controllers/applicationController.js";
import { validate, applicationSchemas } from "../validators/index.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, validate(applicationSchemas.apply), applyJob);

router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;

