import { addTask } from "./components/addTask.js";
import { displayTasks } from "./components/displayTasks.js";

const form = document.querySelector("[data-task-form]");
const dateInput = document.querySelector("[data-form-date]");


const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInput.min = now.toISOString().slice(0, 16);

form.addEventListener("submit", addTask);
displayTasks();
