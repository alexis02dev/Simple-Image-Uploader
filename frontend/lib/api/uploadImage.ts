import axios from "axios";
import { fileSchema } from "@/validations/imageSchemaZod";
import { ZodError } from "zod";

const apiUrl: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function uploadImage(file: File) {
  // Validación previa con Zod (mismos mensajes que backend)
  const fileInfo = {
    originalname: file.name,
    mimetype: file.type,
    size: file.size,
  };
  try {
    fileSchema.parse(fileInfo);
  } catch (err) {
    if (err instanceof ZodError && err.issues?.length) {
      if (err?.issues?.length) {
        const messages = err.issues.map((i) => i.message).join(" ");
        throw new Error(messages);
      }
      throw new Error("Archivo inválido");
    }

    // Subida a backend
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await axios.post(`${apiUrl}/api/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error
        : "Error al subir la imagen.";
      throw new Error(message);
    }
  }
}
