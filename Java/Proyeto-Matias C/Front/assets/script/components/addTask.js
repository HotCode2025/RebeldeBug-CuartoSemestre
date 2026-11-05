import { displayTasks } from "./displayTasks.js";
import { sendTask } from "../data/sendTask.js";

export const addTask = async (event) => {
  event.preventDefault();
  const input = document.querySelector("[data-form-input]");
  const dateInput = document.querySelector("[data-form-date]");
  const title = input.value.trim();
  const dateTime = dateInput.value;

  if (!title || !dateTime) {
    Swal.fire({ icon: "warning", title: "Completá los campos", text: "Ingresá una tarea y elegí su fecha y hora.", confirmButtonColor: "#6d4bd1" });
    return;
  }

  // El backend espera date como fecha y hora completa (LocalDateTime compatible)
  // y time como hora HH:mm:ss. Conservamos la hora local elegida, sin convertirla a UTC.
  const [date, timePart] = dateTime.split("T");
  const time = timePart.length === 5 ? `${timePart}:00` : timePart;
  const scheduledDate = `${date}T${time}`;

  // createdDate forma parte del DTO del backend. Se envía con la hora local actual.
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const createdDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const taskObj = { title, createdDate, date: scheduledDate, time };

  const button = document.querySelector("[data-form-btn]");
  button.disabled = true;
  button.innerHTML = "Guardando...";
  const saved = await sendTask(taskObj);
  button.disabled = false;
  button.innerHTML = "<span>＋</span> Agregar tarea";

  if (saved) {
    input.value = "";
    dateInput.value = "";
    await displayTasks();
    Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Tarea agregada", showConfirmButton: false, timer: 1800, timerProgressBar: true });
    input.focus();
  }
};

import checkComplete from "./checkComplete.js";
import createDelIcon from "./deleteIco.js";

export const createTask = ({ id, title, time, finished }) => {
  const task = document.createElement("li");
  task.className = "card";
  const content = document.createElement("div");
  content.appendChild(checkComplete(id, finished));
  const titleTask = document.createElement("span");
  titleTask.className = `task ${finished ? "is-finished" : ""}`;
  titleTask.textContent = title;
  content.appendChild(titleTask);
  const timeElement = document.createElement("span");
  timeElement.className = "task-meta";
  timeElement.textContent = String(time || "").slice(0, 5);
  task.appendChild(content);
  task.appendChild(timeElement);
  task.appendChild(createDelIcon(id));
  return task;
};
