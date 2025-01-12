import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

// Ruta para registrar usuarios
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

export default router;
