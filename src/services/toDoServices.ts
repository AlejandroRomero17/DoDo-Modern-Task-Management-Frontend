import axios from "axios";
import { getUserDetails } from "../util/GetUser";

// Define la URL base del servidor
const SERVER_URL =
  import.meta.env.VITE_API_URL + "/api/todo" || "http://localhost:5000/api/todo";

// Define los tipos de datos esperados en las tareas
export interface ToDoData {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ToDoItem extends ToDoData {
  _id: string;
  createdAt: string;
  createdBy: string;
}

interface User {
  token: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

// Headers con token
const authHeaders = () => {
  const user = getUserDetails() as User;
  if (!user?.token) {
    console.error("No token found!");
    return {};
  }
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

// Crear una nueva tarea
const createToDo = async (data: ToDoData): Promise<ToDoItem> => {
  const response = await axios.post<{ data: ToDoItem }>(
    SERVER_URL + "/create-to-do",
    data,
    authHeaders()
  );
  return response.data.data; // <- accedemos directamente a la tarea creada
};

// Obtener todas las tareas
const getAllToDo = async (userId: string): Promise<{ data: ToDoItem[] }> => {
  const response = await axios.get<{ data: ToDoItem[] }>(
    SERVER_URL + "/get-all-to-do/" + userId,
    authHeaders()
  );
  return response.data;
};

// Eliminar
const deleteToDo = (id: string) => {
  return axios.delete(SERVER_URL + "/delete-to-do/" + id, authHeaders());
};

// Actualizar
// Actualizar
const updateToDo = async (id: string, data: Partial<ToDoData>) => {
  try {
    const response = await axios.patch<{ data: ToDoItem }>(
      `${SERVER_URL}/update-to-do/${id}`,
      data,
      authHeaders()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

const ToDoServices = {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;
