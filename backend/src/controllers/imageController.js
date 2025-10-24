import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

// POST /api/upload
export const uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No se subió ninguna imagen." });

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads_nextjs",
      });

      fs.unlinkSync(req.file.path); 

      const newImage = await Image.create({
        filename: req.file.originalname,
        url: result.secure_url,
        public_id: result.public_id,
      });

      return res.status(201).json({
        message: "Imagen subida correctamente.",
        image: newImage,
      });
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      res.status(500).json({ message: "Error al subir la imagen." });
    }
  },
];

// GET /api/download/:filename
export const downloadImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({ filename });

    if (!image)
      return res.status(404).json({ message: "Imagen no encontrada." });

    res.redirect(image.url); 
  } catch (error) {
    console.error("Error descargando imagen:", error);
    res.status(500).json({ message: "Error al descargar la imagen." });
  }
};
