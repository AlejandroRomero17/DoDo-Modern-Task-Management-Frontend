
# DoDo! - Frontend

Frontend moderno para gestión de tareas.

## 🚀 Tecnologías

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Ant Design**

---

## 📑 Tabla de contenidos

- [DoDo! - Frontend](#dodo---frontend)
  - [🚀 Tecnologías](#-tecnologías)
  - [📑 Tabla de contenidos](#-tabla-de-contenidos)
  - [📌 Descripción](#-descripción)
  - [✨ Características principales](#-características-principales)
  - [🗂️ Estructura del proyecto](#️-estructura-del-proyecto)
  - [📋 Requisitos](#-requisitos)
  - [💻 Instalación](#-instalación)
  - [⚙️ Configuración](#️-configuración)
    - [Variables de entorno](#variables-de-entorno)
  - [🛠️ Scripts disponibles](#️-scripts-disponibles)
  - [🧩 Componentes clave](#-componentes-clave)
    - [`pages/`](#pages)
    - [`components/`](#components)
  - [🔗 Servicios API](#-servicios-api)
    - [`services/`](#services)
      - [Autenticación](#autenticación)
      - [CRUD de tareas](#crud-de-tareas)
  - [🚀 Despliegue](#-despliegue)
    - [En Render.com](#en-rendercom)
  - [🤝 Contribuciones](#-contribuciones)
  - [🪪 Licencia](#-licencia)
  - [📬 Contacto](#-contacto)

---

## 📌 Descripción

**TaskFlow** es un frontend moderno para gestión de tareas, desarrollado con React y TypeScript. Proporciona una interfaz intuitiva para interactuar con la API de TaskFlow.

---

## ✨ Características principales

- 🚀 Rendimiento optimizado con **Vite**
- 🔒 Autenticación segura con **JWT**
- 📱 Diseño responsive con **Tailwind CSS**
- 🧩 Componentes reutilizables con **Ant Design**
- 📊 Gestión de estado con **React Hooks**
- 🔄 Sincronización en tiempo real con el backend

---

## 🗂️ Estructura del proyecto

```
client/
├── dist/                    # Build de producción
├── public/                  # Assets públicos
├── src/
│   ├── assets/              # Imágenes, iconos, etc.
│   ├── components/          # Componentes reutilizables
│   ├── pages/               # Vistas principales
│   ├── services/            # Conexión con la API
│   ├── util/                # Utilidades y helpers
│   ├── App.css              # Estilos principales
│   ├── App.tsx              # Componente raíz
│   ├── index.css            # Estilos globales
│   ├── main.tsx             # Punto de entrada
│   └── vite-env.d.ts        # Tipos para Vite
├── .eslintrc.js             # Configuración ESLint
├── index.html               # HTML principal
├── tsconfig.json            # Configuración TypeScript
└── vite.config.ts           # Configuración Vite
```

---

## 📋 Requisitos

- **Node.js v18+**
- **npm v9+**
- Conexión con el backend de TaskFlow

---

## 💻 Instalación

Clona el repositorio:

```bash
git clone https://github.com/AlejandroRomero17/TaskFlow-Frontend.git
cd TaskFlow-Frontend
```

Instala las dependencias:

```bash
npm install
```

Crea el archivo `.env` y configura:

```env
VITE_API_URL=https://taskflow-api-modern-task-management.onrender.com
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

---

## ⚙️ Configuración

### Variables de entorno

| Variable        | Descripción                  | Valor por defecto         |
|----------------|------------------------------|---------------------------|
| `VITE_API_URL` | URL del backend de TaskFlow  | `http://localhost:5000`   |

---

## 🛠️ Scripts disponibles

| Comando          | Descripción                               |
|------------------|-------------------------------------------|
| `npm run dev`     | Inicia servidor de desarrollo             |
| `npm run build`   | Crea versión optimizada para producción   |
| `npm run lint`    | Ejecuta análisis de código con ESLint     |
| `npm run preview` | Previsualiza build de producción          |

---

## 🧩 Componentes clave

### `pages/`

- **Login**: Autenticación de usuarios
- **Dashboard**: Vista principal de tareas
- **TaskEditor**: Crear/editar tareas

### `components/`

- **TaskCard**: Componente visual para tareas
- **Navbar**: Barra de navegación superior
- **AuthForm**: Formulario reutilizable para autenticación

---

## 🔗 Servicios API

### `services/`

#### Autenticación

```ts
const loginUser = (data: AuthData) => {
  return axios.post<AuthResponse>(`${SERVER_URL}/api/auth/login`, data);
};
```

#### CRUD de tareas

```ts
const getAllToDo = (userId: string) => {
  return axios.get(`${SERVER_URL}/api/todo/get-all-to-do/${userId}`);
};
```

---

## 🚀 Despliegue

### En [Render.com](https://render.com)

1. Conectar repositorio de GitHub
2. Configurar:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`
3. Añadir variable de entorno: `VITE_API_URL`

---

## 🤝 Contribuciones

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 🪪 Licencia

MIT © Alejandro Romero

---

## 📬 Contacto

- GitHub: [@AlejandroRomero17](https://github.com/AlejandroRomero17)
- Email: gonzalez.romero.alejandroo@gmail.com
- LinkedIn: [Alejandro Romero](https://linkedin.com/in/alejandro-romero)
