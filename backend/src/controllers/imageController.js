import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";

/**
 * Sube el buffer a Cloudinary usando upload_stream y devuelve el resultado.
 */
const streamUpload = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("❌ Cloudinary no está configurado correctamente.");
    }
    // Subir el buffer a Cloudinary usando upload_stream
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        // Si el resultado es exitoso, resolver la promesa con el resultado
        else reject(error); // Si el resultado es fallido, rechazar la promesa con el error
      }
    );
    streamifier.createReadStream(buffer).pipe(stream); // Crear un stream a partir del buffer y pipearlo al stream de Cloudinary
  });
};

/**
 * POST /api/upload
 * Aquí se asume que multer ya puso req.file (con buffer) y está validado -> req.file.buffer
 */
export const uploadImage = async (req, res) => {
  try {
    // req.file ya validado por el middleware validateFile -> req.file.buffer
    const { originalname } = req.file;

    const result = await streamUpload(req.file.buffer, {
      // Subir el buffer a Cloudinary usando upload_stream
      folder: "uploads_nextjs",
    });

    // Guardar la metadata en la base de datos MongoDB -> Image.create({ filename, url, public_id })
    const newImage = await Image.create({
      filename: originalname,
      url: result.secure_url,
      public_id: result.public_id,
    });

    return res.status(201).json({
      // Devolver el resultado en formato JSON
      message: "Imagen subida correctamente",
      image: newImage,
    });
  } catch (error) {
    console.error("❌ Error al subir imagen:", error); // Si hay un error, devolver un error 500
    return res.status(500).json({ error: "Error al subir la imagen" });
  }
};

/**
 * GET /api/download/:publicId
 * Descarga una imagen desde Cloudinary usando el public_id de la imagen
 */
export const downloadImage = async (req, res) => {
  try {
    // Obtener el public_id desde los parámetros de la ruta -> req.params.publicId
    const { publicId } = req.params;
    // Buscar la imagen en la base de datos MongoDB por public_id -> Image.findOne({ public_id: publicId })
    const image = await Image.findOne({ public_id: publicId });
    // Si no se encuentra, devolver un error 404
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });

    // Devolver la información de la imagen en formato JSON
    return res.status(200).json({
      filename: image.filename,
      url: image.url,
    });
  } catch (error) {
    console.error("❌ Error al descargar imagen:", error);
    return res.status(500).json({ error: "Error al descargar la imagen" });
  }
};
