import { path } from "./path.js";

export const sendTask = async (taskObj) => {
  try {
    const response = await fetch(`${path}create`, {
      method: "POST",
      body: JSON.stringify(taskObj),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `El servidor respondió ${response.status}`);
    }
    return true;
  } catch (error) {
    Swal.fire({ icon: "error", title: "No se pudo guardar", text: "Verificá que el backend esté iniciado y que la conexión con MySQL funcione.", confirmButtonColor: "#6d4bd1" });
    console.error("Error al crear la tarea:", error);
    return false;
  }
};
