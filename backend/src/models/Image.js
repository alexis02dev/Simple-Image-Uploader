import mongoose from "mongoose";
/**
 * Schema para la colección de imágenes en la base de datos MongoDB
 * Recibe: filename, url, public_id, uploadedAt
 */
const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true }, // Nombre del archivo
    url: { type: String, required: true }, // URL de la imagen
    public_id: { type: String, required: true }, // ID de la imagen en Cloudinary
    uploadedAt: { type: Date, default: Date.now }, // Fecha de subida
  },
  { versionKey: false } // No mostrar el campo versionKey
);
// Crear un índice en el campo filename para que la búsqueda sea más rápida
imageSchema.index({ filename: 1 }); // 1: Ascendente, -1: Descendente

export default mongoose.model("Image", imageSchema); // Exportar el modelo de la colección de imágenes como Image con el schema imageSchema -> mongoose.model("Image", imageSchema) -> mongoose.model("Image", imageSchema, "images")
