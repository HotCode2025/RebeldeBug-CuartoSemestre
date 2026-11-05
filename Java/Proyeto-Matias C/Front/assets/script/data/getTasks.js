import { path } from "../data/path.js";

export const getTasks = async () => {
  const response = await fetch(`${path}all`);
  if (!response.ok) throw new Error(`No se pudieron obtener las tareas (${response.status})`);
  return response.json();
};
