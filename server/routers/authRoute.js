import express from "express";
import {
  login,
  register,
  uploadImage,
  verifyEmail,
} from "../controllers/authController";
import { userValidator } from "../validator/auth";
import verifyUser from "../middlewares/verifyUser";

const router = express.Router();

router.post("/register", userValidator, register);
router.post("/login", login);
router.post("/uploadImage", verifyUser, uploadImage);
router.post("/verifyEmail", verifyEmail);

router.get("/test", (req, res) => {
  res.json({ code: 200, message: "success" });
});

export default router;
