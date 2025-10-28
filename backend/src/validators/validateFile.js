import { fileSchema } from "./schemaZod.js";

/**
 * Middleware Express que valida req.file con Zod.
 * Si no hay archivo o no cumple, responde 400 con el error.
 */
export const validateFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se envió ningún archivo." }); // Si no hay archivo, devolver un error 400
    }

    // Crear un objeto reducido y validarlo -> fileSchema.parse(fileInfo)
    const fileInfo = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    fileSchema.parse(fileInfo); // Validar el archivo -> fileSchema.parse(fileInfo)

    // Si todo OK, continuar
    next(); // Continuar con el siguiente middleware -> next()
  } catch (err) {
    // Zod genera objetos de error; Normalizar la respuesta
    if (err?.issues) {
      const message = err.issues.map((i) => i.message); // Mapear los errores -> err.issues.map((i) => i.message)
      return res.status(400).json({ error: message || "Archivo inválido" }); // Si hay errores, devolver un error 400 con el mensaje de error
    }

    // Manejar otros tipos de errores que no sean de Zod
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
