import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/companyController.js";

const router = express.Router();

// Create company
router.post("/register", isAuthenticated, registerCompany);

// Get companies (admin/recruiter)
router.get("/get", isAuthenticated, getCompany);

// Get single company
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update company
router.put("/update/:id", isAuthenticated, updateCompany);

// ❌ Removed delete route because deleteCompany is not defined/exported

export default router;