import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getErrorMessage, type ErrorResponse } from "../../util/GetError";
import AuthServices from "../../services/authServices";
import AuthLayout from "../../components/auth/AuthLayout";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
        password,
      };
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("You're Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err as ErrorResponse));
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
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

        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8">
            Join DoDo! to organize your tasks efficiently
          </p>

          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="johndoe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
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
              disabled={!userName || !password || !firstName || !lastName}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
