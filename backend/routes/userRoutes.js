import express from "express";
import { register, login, logout, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { singleupload } from "../middlewares/multer.js";
import { validate, authSchemas } from "../validators/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Users route working" });
});

router.post("/register", singleupload, validate(authSchemas.register), register);
router.post("/login", validate(authSchemas.login), login);
router.get("/logout", logout);
router.put("/profile/update", isAuthenticated, singleupload, updateProfile);

export default router;