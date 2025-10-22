import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { uploadImage, downloadImage } from "./controllers/imageController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas
app.post("/api/upload", uploadImage);
app.get("/api/download/:filename", downloadImage);

// Ruta raíz opcional
app.get("/", (req, res) => {
  res.send("🚀 API Simple Image Uploader funcionando correctamente.");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
