const apiUrl: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Descarga una imagen desde el backend y fuerza su descarga localmente.
 */
export async function downloadImage(filename: string): Promise<void> {
  try {
    const res = await fetch(`${apiUrl}/api/download/${filename}`);
    if (!res.ok) {
      throw new Error(`No se pudo descargar la imagen (${res.status}).`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Liberar la URL temporal
    window.URL.revokeObjectURL(url);
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Error al descargar la imagen.";
    throw new Error(error);
  }
}
