import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

// Configuración de las variables de entorno
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const DB_URL: string | undefined = process.env.DB_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", authRoutes);

// Verifica que DB_URL esté definido
if (!DB_URL) {
  console.error("Error: DB_URL is not defined in the environment variables.");
  process.exit(1); // Finaliza la aplicación si no hay URL de base de datos
}

// Conexión a MongoDB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Inicio del servidor
app
  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
  });
