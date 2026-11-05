import { path } from "../data/path.js";

export const checkTask = async (id, finished) => {
  try {
    const response = await fetch(`${path}mark_as_finished/${id}/${finished}`, { method: "PATCH" });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return true;
  } catch (error) {
    console.error("No se pudo actualizar la tarea:", error);
    Swal.fire({ icon: "error", title: "No se pudo actualizar", text: "Intentá nuevamente.", confirmButtonColor: "#6d4bd1" });
    return false;
  }
};
