"use client";
import axios from "axios";

const apiUrl: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Descarga una imagen desde el backend usando el public_id y fuerza su descarga localmente.
 */
export async function downloadImage(publicId: string): Promise<void> {
  try {
    // Obtener la información de la imagen
    const { data } = await axios.get(
      `${apiUrl}/api/download/${encodeURIComponent(publicId)}`
    );
    const { filename, url } = data;

    // Descargar el blob desde la URL de Cloudinary
    const imageRes = await axios.get(url, { responseType: "blob" });
    const blob = imageRes.data;

    // Crear objeto URL del blob
    const blobUrl = URL.createObjectURL(blob);

    // Descargar el archivo
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar el objeto URL
    URL.revokeObjectURL(blobUrl);
  } catch (err: unknown) {
    const error = axios.isAxiosError(err)
      ? err.response?.data?.error || err.message
      : "Error al descargar la imagen.";
    throw new Error(error);
  }
}
