import { Router } from "express";
import { repliesController } from "../controllers/repliesController.js";
import { verifyToken, verifyUser } from "../middlewares/verifyToken.js";

const repliesRoutes = Router();

repliesRoutes.get('/:forum_id/replies', async (req, res, next) => {
    await repliesController.getRepliesByForumId(req, res, next);
});

repliesRoutes.post('/replies/create', verifyToken, async (req, res, next) => {
    await repliesController.createReply(req, res, next);
});

repliesRoutes.delete('/replies/:id/delete', verifyUser, async (req, res, next) => {
    await repliesController.deleteReply(req, res, next);
});

export default repliesRoutes;