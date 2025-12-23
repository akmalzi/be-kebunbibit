import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { fileUpload } from "../middlewares/fileUpload.js";

const userRoutes = Router();

userRoutes.get('/:id', async (req, res, next) => {
    await userController.getUserById(req, res, next);
});

userRoutes.post('/:id/change-password', verifyToken, async (req, res, next) => {
    await userController.changePassword(req, res, next);
});

userRoutes.put('/:id/edit', verifyToken, fileUpload.uploadFile('user', 'photo'), async (req, res, next) => {
    await userController.editProfiles(req, res, next);
})

userRoutes.delete('/:id/delete-photo', verifyToken, async (req, res, next) => {
    await userController.deletePhoto(req, res, next);
});

export default userRoutes;