/**
 * Copia texto al portapapeles usando la API moderna o fallback legacy.
 * @param text - El texto a copiar
 * @returns Promise que se resuelve cuando se copia exitosamente
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Método moderno - prioridad 1
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Continuar al fallback
    }
  }

  // Fallback método 2 - execCommand
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Estilos para hacerlo invisible pero funcional
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);

    try {
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, text.length);

      const successful = document.execCommand("copy");

      if (successful) {
        resolve();
      } else {
        reject(new Error("execCommand retornó false"));
      }
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}
