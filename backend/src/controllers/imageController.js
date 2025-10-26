import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";

/**
 * Sube el buffer a Cloudinary usando upload_stream y devuelve el resultado.
 */
const streamUpload = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * POST /api/upload
 * Aquí se asume que multer ya puso req.file (con buffer) y está validado
 */
export const uploadImage = async (req, res) => {
  try {
    // req.file ya validado por el middleware validateFile
    const { originalname } = req.file;

    const result = await streamUpload(req.file.buffer, {
      folder: "uploads_nextjs",
    });

    // Guardar la metadata en la base de datos MongoDB
    const newImage = await Image.create({
      filename: originalname,
      url: result.secure_url,
      public_id: result.public_id,
    });

    return res.status(201).json({
      message: "Imagen subida correctamente",
      image: newImage,
    });
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    return res.status(500).json({ error: "Error al subir la imagen" });
  }
};

/**
 * GET /api/download/:filename
 */
export const downloadImage = async (req, res) => {
  try {
    // Obtener el nombre del archivo desde los parámetros de la ruta
    const { filename } = req.params;
    // Buscar la imagen en la base de datos MongoDB
    const image = await Image.findOne({ filename });
    // Si no se encuentra, devolver un error 404
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    // Redirigir a la URL de la imagen
    return res.redirect(image.url);
  } catch (error) {
    console.error("❌ Error al descargar imagen:", error);
    return res.status(500).json({ error: "Error al descargar la imagen" });
  }
};
