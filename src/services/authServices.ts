import axios from "axios";

// Usar la variable de entorno REACT_APP_API_URL con Vite
const SERVER_URL = import.meta.env.VITE_API_URL + "/api"

// Define la estructura de los datos que se enviarán en el registro y login
interface AuthData {
  userName: string;
  password: string;
}

// Define la estructura de la respuesta (suponiendo que sea un objeto con un mensaje o token)
interface AuthResponse {
  message: string;
  token?: string;
}

// Función para registrar un usuario
const registerUser = (data: AuthData) => {
  return axios.post<AuthResponse>(SERVER_URL + "/register", data);
};

// Función para iniciar sesión
const loginUser = (data: AuthData) => {
  return axios.post<AuthResponse>(SERVER_URL + "/login", data);
};

// Exportar las funciones
const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
