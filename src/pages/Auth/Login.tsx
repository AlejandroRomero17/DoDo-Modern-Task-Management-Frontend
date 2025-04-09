import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/authServices";
import { getErrorMessage, type ErrorResponse } from "../../util/GetError";
import { message } from "antd";
import AuthLayout from "../../components/auth/AuthLayout";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      message.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthServices.loginUser({
        userName: username,
        password,
      });

      localStorage.setItem("toDoAppUser", JSON.stringify(response.data));

      message.success("Logged in Successfully!");
      navigate("/to-do-list");
    } catch (err) {
      console.error("Login Error:", err);
      message.error(getErrorMessage(err as ErrorResponse));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Lado izquierdo (imagen / ícono) */}
        <div className="md:w-1/2 bg-gradient-to-r from-orange-500 to-amber-500 p-8 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 h-64 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* Formulario */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Login to continue organizing your tasks with DoDo!
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-xl text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!username || !password}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-orange-500 hover:text-orange-600 font-medium transition"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
