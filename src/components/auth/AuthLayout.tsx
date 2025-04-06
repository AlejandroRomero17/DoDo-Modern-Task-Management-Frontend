import { Link } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header ajustado con menos padding superior */}
      <header className="pt-6 px-6">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              DoDo!
            </h2>
          </Link>
        </div>
      </header>

      {/* Contenido con padding reducido */}
      <main className="flex-grow flex items-center justify-center px-4 pb-8">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
