import fileSchema from "./schemaZod";

/**
 * Middleware Express que valida req.file con Zod.
 * Si no hay archivo o no cumple, responde 400 con el error.
 */
export const validateFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se envió ningún archivo." });
    }

    // Crear un objeto reducido y validarlo
    const fileInfo = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    fileSchema.parse(fileInfo); // Validar el archivo


    // Si todo OK, continuar
    next();
  } catch (err) {
    // Zod genera objetos de error; Normalizar la respuesta
    if (err?.issues) {
      const messages = err.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`
      );
      return res
        .status(400)
        .json({ error: "Archivo inválido", details: messages });
    }
    return res.status(400).json({ error: err.message || "Archivo inválido" });
  }
};
