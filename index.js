import express from "express";
import bodyParser from "body-parser";
import { errorHandlers } from "./src/middlewares/errorHandlers.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import bibitRoutes from "./src/routes/bibitRoutes.js";
import tagRoutes from "./src/routes/tagRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";
import forumRoutes from "./src/routes/forumRoutes.js";
import repliesRoutes from "./src/routes/repliesRoutes.js";
import cors from "cors";
import imageRouter from "./src/routes/imagesRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const baseEndpoint = "/api/v1";

app.use(cors());

app.use(`${baseEndpoint}/images`, imageRouter);

app.use(bodyParser.json());
app.use(express.json());

// auth routes
app.use(`${baseEndpoint}/auth`, authRoutes);
// user routes
app.use(`${baseEndpoint}/user`, userRoutes);
// bibit routes
app.use(`${baseEndpoint}/bibit`, bibitRoutes);
// tag routes
app.use(`${baseEndpoint}/tag`, tagRoutes);
// rating routes
app.use(`${baseEndpoint}/rating`, ratingRoutes);
// forum routes
app.use(`${baseEndpoint}/forum`, forumRoutes);
// forum replies routes
app.use(`${baseEndpoint}/forum`, repliesRoutes);

app.use(errorHandlers);

// Tambahkan rute default biar tahu server nyala
app.get("/", (req, res) => {
  res.send("Server Toko Bibit Ready!");
});

// Cek environment
if (process.env.NODE_ENV !== "production") {
  // Kalau di Localhost, pakai listen biasa
  app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
  });
}
// WAJIB: Export app supaya Vercel bisa baca
export default app;
