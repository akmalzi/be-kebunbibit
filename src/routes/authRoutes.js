import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post('/register', async (req, res, next) => {
    await authController.registerUser(req, res, next);
});

authRoutes.post('/login', async (req, res, next) => {
    await authController.loginUser(req, res, next);
});

authRoutes.post('/logout', async (req, res, next) => {
    await authController.logoutUser(req, res, next);
});

export default authRoutes;