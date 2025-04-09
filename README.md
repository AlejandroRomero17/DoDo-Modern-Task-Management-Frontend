
# DoDo! - Frontend

**URL del sitio desplegado:**
🌐 [https://dodotaskmanager.netlify.app](https://dodotaskmanager.netlify.app)

Este proyecto es el **frontend** de la aplicación DoDo! para gestionar tareas (To-Do) de manera moderna, segura e intuitiva. Está desarrollado en **React** con **TypeScript**, usa **Tailwind CSS**, **Ant Design** y consume la API RESTful desplegada en [Render](https://taskflow-api-modern-task-management.onrender.com).

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Ant Design](https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)

---

## Tabla de contenidos

- [DoDo! - Frontend](#dodo---frontend)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Características](#características)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Variables de entorno](#variables-de-entorno)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)
  - [Contacto](#contacto)

---

## Descripción

DoDo! Frontend permite a los usuarios autenticarse, crear, ver, editar y eliminar tareas personales. Se conecta al backend mediante llamadas protegidas con JWT y muestra la información con una interfaz atractiva y responsiva.

---

## Características

- 🔐 Autenticación de usuarios (login, token JWT)
- 📝 Gestión de tareas (CRUD)
- 🎨 UI moderna y responsiva con Ant Design y Tailwind CSS
- ⚙️ Integración con backend seguro
- 📱 Adaptado para dispositivos móviles

---

## Requisitos

- Node.js v18 o superior
- npm v9 o superior
- Acceso al backend (ya desplegado o local)

---

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/AlejandroRomero17/DoDo-Modern-Task-Management-Frontend.git
cd DoDo-Modern-Task-Management-Frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` y agrega:
```env
VITE_API_URL=https://taskflow-api-modern-task-management.onrender.com
```

4. Ejecuta el proyecto:
```bash
npm run dev
```

---

## Uso

1. Accede a la app en producción: [https://dodotaskmanager.netlify.app](https://dodotaskmanager.netlify.app)
2. Regístrate con tu nombre de usuario, nombre, apellido y contraseña.
3. Inicia sesión y empieza a gestionar tus tareas.

---

## Variables de entorno

| Variable        | Descripción                           | Ejemplo                                      |
|----------------|---------------------------------------|----------------------------------------------|
| VITE_API_URL   | URL del backend que expone la API     | https://taskflow-api-modern-task-management.onrender.com |

---

## Estructura del proyecto

```
src/
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes reutilizables (Navbar, etc.)
├── pages/          # Vistas principales (Login, Register, ToDoList)
├── services/       # Lógica para consumir API (axios)
├── util/           # Funciones utilitarias (token, errores, etc.)
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
└── index.html      # HTML base
```

---

## Contribuciones

1. Haz fork del proyecto.
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "feat: añade nueva funcionalidad"`
4. Sube los cambios: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request.

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

---

## Contacto

- **Nombre:** Alejandro Gonzalez Romero
- **Correo electrónico:** gonzalez.romero.alejandroo@gmail.com
- **GitHub:** [https://github.com/AlejandroRomero17](https://github.com/AlejandroRomero17)
