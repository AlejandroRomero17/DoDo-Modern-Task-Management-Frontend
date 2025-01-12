import { Request, Response } from "express";
import User from "../model/user.model";
import jwt from "jsonwebtoken";

require("dotenv").config();
const secretKey = process.env.JWT_SECRET || '';  // Asegúrate de que JWT_SECRET esté cargado correctamente

// Mensajes de respuesta
const MESSAGES = {
  USER_EXISTS: "User already registered with this username",
  REGISTRATION_SUCCESS: "User registered successfully",
  SERVER_ERROR: "Internal server error",
  INVALID_DATA: "Invalid user data",
  LOGIN_FAILED: "Authentication failed",
  INVALID_PASSWORD: "Wrong password",
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
    console.log(result);
  } catch (error) {
    console.error("Error registering user:", error);

    // Devolver un error genérico del servidor
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ message: MESSAGES.LOGIN_FAILED });
      return;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(404).json({ message: MESSAGES.INVALID_PASSWORD });
      return;
    }

    // Asegúrate de que el secretKey esté definido
    if (!secretKey) {
      res.status(500).json({ message: "Secret key not defined" });
      return;
    }

    // Aquí pasas el secretKey al segundo parámetro
    let token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });

    let finalData = {
      userId: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };

    res.send(finalData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Exportar los controladores
export default {
  registerUser,
  loginUser,  // Asegúrate de exportar también el loginUser
};
