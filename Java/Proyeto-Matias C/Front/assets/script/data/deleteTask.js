import { path } from "../data/path.js";

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${path}delete/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return true;
  } catch (error) {
    console.error("No se pudo eliminar la tarea:", error);
    Swal.fire({ icon: "error", title: "No se pudo eliminar", text: "Intentá nuevamente.", confirmButtonColor: "#6d4bd1" });
    return false;
  }
};
