import { Router } from "express";
import { ratingController } from "../controllers/ratingController.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const ratingRoutes = Router();

ratingRoutes.get('/', async (req, res, next) => {
    await ratingController.getAllRatings(req, res, next);
});

ratingRoutes.post('/create', verifyUser, async (req, res, next) => {
    await ratingController.createRating(req, res, next);
});

ratingRoutes.delete('/delete/:id', verifyUser, async (req, res, next) => {
    await ratingController.deleteRating(req, res, next);
});

export default ratingRoutes;