import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../util/GetUser";
import { Dropdown } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

interface User {
  firstName?: string;
  lastName?: string;
  username?: string;
}

interface NavbarProps {
  active: "home" | "myTask";
}

function Navbar({ active }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <span
          className="text-gray-700 hover:text-orange-500 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* SOLO EL LOGO A LA IZQUIERDA */}
          <div className="absolute left-0">
            <Link to="/" className="flex-shrink-0">
              <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                DoDo!
              </h4>
            </Link>
          </div>

          {/* TODO EL CONTENIDO A LA DERECHA */}
          <div className="absolute right-0 flex items-center space-x-6">
            {/* Menú desktop - derecha */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium ${
                  active === "home"
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                } transition-colors`}
              >
                Home
              </Link>

              {user && (
                <Link
                  to="/to-do-list"
                  className={`px-3 py-2 text-sm font-medium ${
                    active === "myTask"
                      ? "text-orange-500"
                      : "text-gray-300 hover:text-orange-500"
                  } transition-colors`}
                >
                  My Tasks
                </Link>
              )}

              {user ? (
                <Dropdown
                  menu={{ items: menuItems }}
                  placement="bottomRight"
                  arrow
                >
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold">
                      {user.firstName?.[0] || user.username?.[0]}
                    </div>
                    <span className="text-gray-300 group-hover:text-orange-500 transition-colors">
                      {user.firstName || user.username}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Botón móvil - derecha */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-orange-500 focus:outline-none"
                aria-expanded="false"
              >
                {isMenuOpen ? (
                  <CloseOutlined className="h-6 w-6" />
                ) : (
                  <MenuOutlined className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 h-auto" : "opacity-0 h-0 invisible"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/95 backdrop-blur-sm">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              active === "home"
                ? "text-orange-500 bg-gray-900"
                : "text-gray-300 hover:text-orange-500 hover:bg-gray-700"
            } transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {user && (
            <Link
              to="/to-do-list"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                active === "myTask"
                  ? "text-orange-500 bg-gray-900"
                  : "text-gray-300 hover:text-orange-500 hover:bg-gray-700"
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Tasks
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
