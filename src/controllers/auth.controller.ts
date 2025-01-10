import { Request, Response } from "express";
import User from "../model/user.model";
// import User from "../model/User.model";

// Mensajes de respuesta
const MESSAGES = {
  USER_EXISTS: "User already registered with this username",
  REGISTRATION_SUCCESS: "User registered successfully",
  SERVER_ERROR: "Internal server error",
  INVALID_DATA: "Invalid user data",
};

// Controlador para registrar un usuario
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, userName, password } = req.body;

  // Validación básica de entrada
  if (!firstName || !lastName || !userName || !password) {
    res.status(400).json({ message: MESSAGES.INVALID_DATA });
    return;
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      res.status(400).json({ message: MESSAGES.USER_EXISTS });
      return;
    }

    // Crear un nuevo usuario
    const user = new User({ firstName, lastName, userName, password });
    await user.save();

    res.status(201).json({ message: MESSAGES.REGISTRATION_SUCCESS });
    const result = await user.save();
    console.log(result)
  } catch (error) {
    console.error("Error registering user:", error);

    // Devolver un error genérico del servidor
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Exportar los controladores
export default {
  registerUser,
};
