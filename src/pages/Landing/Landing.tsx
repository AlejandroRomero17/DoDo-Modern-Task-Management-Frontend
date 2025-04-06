import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import landing from "../../assets/landing.svg";
import Footer from "../../components/Footer";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fijo en la parte superior */}
      <div className="fixed top-0 left-0 w-full h-16 z-50 bg-white shadow">
        <Navbar active="home" />
      </div>

      {/* Contenido principal que ocupa todo el espacio disponible */}
      <main className="min-h-screen pt-16 md:pt-20 flex items-center">
        <div className="w-full bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
            {/* Texto de la página */}
            <div className="text-center lg:text-left lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Schedule Your Daily Tasks
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                  With DoDo!
                </span>
              </h1>
              <p className="text-gray-700 text-lg sm:text-xl mt-6 max-w-lg mx-auto lg:mx-0">
                Organize your tasks efficiently and stay on top of your daily
                goals with our intuitive platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start mt-8">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-200/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Get Started - It's Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-orange-500 text-orange-500 font-semibold py-3 px-8 rounded-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Login
                </Link>
              </div>
            </div>
            {/* Imagen SVG */}
            <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={landing}
                alt="Task management illustration"
                className="w-full max-w-xl lg:max-w-none h-auto object-contain animate-float"
                style={{ animation: "float 6s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer que solo aparece al hacer scroll */}
      <Footer />
    </div>
  );
}

export default Landing;
