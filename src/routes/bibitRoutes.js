import { Router } from "express";
import { bibitController } from "../controllers/bibitController.js";

const bibitRoutes = Router();

bibitRoutes.get("/", async (req, res, next) => {
  await bibitController.getAllBibit(req, res, next);
});

bibitRoutes.get("/:id", async (req, res, next) => {
  await bibitController.getBibitById(req, res, next);
});

export default bibitRoutes;
