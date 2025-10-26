import { z } from "zod";

// Constantes para validar el archivo
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

/**
 * Zod schema para validar el objeto req.file de multer.
 * Recibe: originalname, mimetype, size
 */
export const fileSchema = z.object({
  originalname: z.string().min(1, "El archivo debe tener un nombre."),
  mimetype: z
    .string()
    .refine(
      (val) => ACCEPTED_MIME_TYPES.includes(val),
      "Formato no soportado. Solo JPG, PNG o GIF."
    ),
  size: z.number().max(MAX_FILE_SIZE, "Máximo permitido: 2MB."),
});
