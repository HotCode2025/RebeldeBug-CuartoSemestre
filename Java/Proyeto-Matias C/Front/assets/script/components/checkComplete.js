import { checkTask } from "../data/checkTask.js";
import { displayTasks } from "./displayTasks.js";

const checkComplete = (id, finished) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon ${finished ? "completeIcon" : ""}`;
  button.setAttribute("aria-label", finished ? "Marcar como pendiente" : "Marcar como completada");
  button.title = button.getAttribute("aria-label");
  button.textContent = finished ? "✓" : "";
  button.addEventListener("click", async () => {
    button.disabled = true;
    const updated = await checkTask(id, finished);
    if (updated) await displayTasks();
    else button.disabled = false;
  });
  return button;
};

export default checkComplete;
