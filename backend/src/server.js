import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { connectDB } from "./config/db.js";
import { uploadImage, downloadImage } from "./controllers/imageController.js";
import { validateFile } from "./validators/validateFile.js";
// Configurar el entorno
dotenv.config();

const app = express();
// Puerto de la API
const PORT = process.env.PORT || 4000;

// Multer en memoria (file.buffer) para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

// Middleware para permitir CORS
app.use(cors());
// Middleware para parsear el cuerpo de la solicitud a JSON
app.use(express.json());

// Conectar a la base de datos MongoDB
connectDB();

// Rutas para la API
// 1) POST /api/upload -> multer coloca req.file, luego validateFile (Zod), luego controller para subir la imagen a Cloudinary
app.post("/api/upload", upload.single("file"), validateFile, uploadImage);

// 2) GET /api/download/:filename -> Descargar la imagen desde Cloudinary
app.get("/api/download/:filename", downloadImage);

// Root -> Ruta raíz de la API -> Mensaje de bienvenida
app.get("/", (req, res) => res.send("API funcionando"));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
