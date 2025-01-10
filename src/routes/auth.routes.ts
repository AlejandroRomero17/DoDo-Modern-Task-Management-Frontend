import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router: Router = Router();

// Ruta para registrar usuarios
router.post("/register", AuthController.registerUser);

export default router;
