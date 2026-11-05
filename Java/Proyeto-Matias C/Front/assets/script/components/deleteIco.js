import { deleteTask } from "../data/deleteTask.js";
import { displayTasks } from "./displayTasks.js";

const createDelIcon = (id) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "icon trashIcon";
  button.textContent = "⌫";
  button.title = "Eliminar tarea";
  button.setAttribute("aria-label", "Eliminar tarea");
  button.addEventListener("click", async () => {
    const result = await Swal.fire({ icon: "warning", title: "¿Eliminar esta tarea?", text: "Esta acción no se puede deshacer.", showCancelButton: true, confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar", confirmButtonColor: "#6d4bd1", cancelButtonColor: "#aaa" });
    if (!result.isConfirmed) return;
    const deleted = await deleteTask(id);
    if (deleted) {
      await displayTasks();
      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Tarea eliminada", showConfirmButton: false, timer: 1600 });
    }
  });
  return button;
};

export default createDelIcon;
