import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { getTasks } from "../data/getTasks.js";

const dateKey = (value) => {
  if (typeof value === "string") return value.slice(0, 10);
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
};
const formatDate = (key) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(new Date(year, month-1, day));
};

export const displayTasks = async () => {
  const list = document.querySelector("[data-list]");
  list.innerHTML = '<li class="loading-state">Actualizando tu lista...</li>';
  try {
    const tasks = await getTasks();
    list.innerHTML = "";
    const total = tasks.length;
    const completed = tasks.filter(task => task.finished).length;
    document.querySelector("[data-total]").textContent = total;
    document.querySelector("[data-completed]").textContent = completed;
    document.querySelector("[data-pending]").textContent = total - completed;

    if (!total) {
      const empty = document.createElement("li");
      empty.className = "noTasks";
      empty.textContent = "Todavía no hay tareas. ¡Agregá la primera!";
      list.appendChild(empty);
      return;
    }

    const groups = new Map();
    tasks.forEach(task => {
      const key = dateKey(task.date);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(task);
    });

    [...groups.keys()].sort().forEach(key => {
      list.appendChild(dateElement(formatDate(key)));
      groups.get(key).sort((a,b) => String(a.time).localeCompare(String(b.time))).forEach(task => {
        list.appendChild(createTask(task));
      });
    });
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
    list.innerHTML = '<li class="error-state">No se pudieron cargar las tareas. Revisá que el backend esté iniciado.</li>';
    document.querySelector("[data-total]").textContent = "—";
    document.querySelector("[data-completed]").textContent = "—";
    document.querySelector("[data-pending]").textContent = "—";
  }
};
