import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useMovies } from "../../context/MoviesContext";
import SearchForm from "../tools/SearchForm";
import { HamburgerMenuBoton, ExploradorBoton } from "./buttons";
import { Navigate, useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const { oscuro } = useTheme();
  const { ocultarLanding } = useMovies();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  const irAHome = () => {
    // Navegar a /home
    navigate("/items");
    ocultarLanding();
    setMenuAbierto(false);
  };
  return (
    <>
      <HamburgerMenuBoton onClick={alternarMenu} menuAbierto={menuAbierto} />
      {/* Despliegue del Menu.*/}
      {menuAbierto && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <div
            className={`absolute right-0 top-0 min-h-[400px] max-h-[70vh] w-80 p-6 transform transition-transform duration-300 border-l-4 border-b-4 shadow-2xl ${
              oscuro
                ? "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 border-l border-blue-600/30"
                : "bg-gradient-to-br from-white via-sky-50 to-sky-100 border-l border-sky-200"
            }`}
          >
            <div className="mt-16 space-y-6">
              {/* Menu. */}
              <div className="mb-8">
                <h2
                  className={`text-2xl font-bold ${
                    oscuro ? "text-white" : "text-gray-800"
                  }`}
                >
                  Navegación
                </h2>
              </div>
              {/* Busqueda. */}
              <div>
                <h3
                  className={`font-semibold mb-3 ${
                    oscuro ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Buscar
                </h3>
                <SearchForm />
              </div>
              {/* Explorador. */}
              <div className="pt-6">
                <ExploradorBoton onClick={irAHome} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default HamburgerMenu;
