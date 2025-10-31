"use server";
import axios from "axios";

const apiUrl: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function uploadImage(file: File) {
  try {
    // Subida a backend
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${apiUrl}/api/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error || "Error al subir la imagen.");
    }

    throw new Error("Error desconocido al procesar la imagen.");
  }
}
