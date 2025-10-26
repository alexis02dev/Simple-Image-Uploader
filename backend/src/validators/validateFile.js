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
      const messages = err.issues.map(
        // Mapear los errores -> err.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
        (i) => `${i.path.join(".")}: ${i.message}`
      );
      return res
        .status(400)
        .json({ error: "Archivo inválido", details: messages }); // Si hay errores, devolver un error 400 con los detalles de los errores
    }
    return res.status(400).json({ error: err.message || "Archivo inválido" }); // Si hay un error, devolver un error 400 con el mensaje de error
  }
};
