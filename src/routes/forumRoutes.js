import { Router } from "express";
import { forumController } from "../controllers/forumController.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const forumRoutes = Router();

forumRoutes.get('/', async (req, res, next) => {
    await forumController.getAllForums(req, res, next);
});

forumRoutes.get('/:id', async (req, res, next) => {
    await forumController.getForumById(req, res, next);
});

forumRoutes.post('/create', verifyUser, async (req, res, next) => {
    await forumController.createForum(req, res, next);
});

forumRoutes.delete('/:id/delete', verifyUser, async (req, res, next) => {
    await forumController.deleteForum(req, res, next);
});

export default forumRoutes;