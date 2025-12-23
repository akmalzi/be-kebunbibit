import { Router } from "express";
import { tagController } from "../controllers/tagController.js";

const tagRoutes = Router();

tagRoutes.get('/', async (req, res, next) => {
    await tagController.getAllTags(req, res, next);
});

tagRoutes.get('/:id', async (req, res, next) => {
    await tagController.getTagById(req, res, next);
});

export default tagRoutes;