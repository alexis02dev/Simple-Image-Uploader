import { v2 as cloudinary } from "cloudinary";
/**
 * Configurar Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nombre del cloud
  api_key: process.env.CLOUDINARY_API_KEY, // API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // API secret
});

export default cloudinary; // Exportar cloudinary