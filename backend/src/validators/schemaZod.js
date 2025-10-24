import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

/**
 * Zod schema para validar el objeto req.file de multer.
 * Recibe: originalname, mimetype, size
 */
export const fileSchema = z.object({
  originalname: z.string().min(1),
  mimetype: z.enum(ACCEPTED_MIME_TYPES),
  size: z.number().max(MAX_FILE_SIZE),
});
