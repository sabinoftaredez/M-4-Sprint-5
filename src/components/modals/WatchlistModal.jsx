import React from "react";
import MovieCard from "../tools/MovieCard"; //
import {
  CerrarLista,
  RemoverAlquilerBoton,
  BorrarTodosAlquileresBoton,
  AgregarAlquilerBoton,
} from "../buttons/buttons"; //
import { useWatchlistContext } from "../../context/WatchlistContext";
import { useTheme } from "../../context/ThemeContext";

const WatchlistModal = ({ onClose }) => {
  const {
    verLista,
    alquilarPelicula,
    removerPelicula,
    removerPeliculas,
    calcularTotal,
  } = useWatchlistContext();
  const { oscuro } = useTheme();
  const totales = calcularTotal();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
        className={
          oscuro
            ? "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-gray-200 p-6 rounded-lg shadow-2xl w-11/12 max-w-2xl border border-blue-600/50"
            : "bg-gradient-to-br from-gray-800 via-sky-900 to-gray-800 text-white p-6 rounded-lg shadow-2xl w-11/12 max-w-2xl border border-sky-700/50"
        }
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            oscuro ? "text-white" : "text-white"
          }`}
        >
          Carrito de Alquiler
        </h2>
        <div className="overflow-y-auto flex-1 mb-4 max-h-96">
          {verLista.length > 0 ? (
            <ul className="space-y-4">
              {verLista.map((pelicula) => (
                <li
                  key={pelicula.id}
                  className={
                    oscuro
                      ? "flex items-center gap-4 p-4 bg-gradient-to-r from-slate-700 to-blue-800 rounded-lg border border-blue-600/30"
                      : "flex items-center gap-4 p-4 bg-gradient-to-r from-gray-700 to-sky-800 rounded-lg border border-sky-600/30"
                  }
                >
                  <div className="relative">
                    <img
                      src={pelicula.poster}
                      alt={pelicula.title}
                      className="w-20 h-28 object-cover rounded-2xl"
                    />
                    <div
                      className={
                        oscuro
                          ? "absolute -top-2 -right-2 bg-yellow-500 text-gray-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-yellow-600"
                          : "absolute -top-2 -right-2 bg-yellow-300 text-gray-800 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                      }
                    >
                      {pelicula.cantidad}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        oscuro ? "text-white" : "text-white"
                      }`}
                    >
                      {pelicula.title}
                    </h3>
                    <p
                      className={oscuro ? "text-yellow-300" : "text-yellow-200"}
                    >
                      🛒 En carrito
                    </p>
                    <p
                      className={`text-sm ${
                        oscuro ? "text-gray-300" : "text-yellow-100"
                      }`}
                    >
                      ${pelicula.price} ARS c/u
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        oscuro ? "text-yellow-300" : "text-yellow-100"
                      }`}
                    >
                      Subtotal: ${pelicula.price * pelicula.cantidad} ARS
                    </p>
                  </div>
                  <AgregarAlquilerBoton
                    onClick={() => alquilarPelicula(pelicula)}
                  />
                  <RemoverAlquilerBoton
                    onClick={() => removerPelicula(pelicula.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={oscuro ? "text-gray-400" : "text-gray-400"}>
              No tienes Alquileres.
            </p>
          )}
        </div>
        {verLista.length > 0 && (
          <div
            className={
              oscuro
                ? "bg-gradient-to-r from-blue-800 to-yellow-600 p-4 rounded-lg mb-4 border border-yellow-500/50"
                : "bg-gradient-to-r from-sky-400 to-yellow-400 p-4 rounded-lg mb-4 border border-yellow-400/50"
            }
          >
            <div className="flex justify-between text-lg font-bold">
              <span className="text-white">
                Total ({totales.cantidad} películas):
              </span>
              <span className={oscuro ? "text-yellow-200" : "text-yellow-100"}>
                ${totales.total} ARS
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <BorrarTodosAlquileresBoton onClick={() => removerPeliculas()} />
          <CerrarLista onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
export default WatchlistModal;
