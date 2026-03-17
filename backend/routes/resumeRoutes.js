import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { resumeUpload } from "../middlewares/multer.js";
import { scoreResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/score", isAuthenticated, resumeUpload, scoreResume);

export default router;

