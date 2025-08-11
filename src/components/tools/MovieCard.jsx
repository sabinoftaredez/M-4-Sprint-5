import React from "react";
import { AgregarAlquilerBoton } from "../buttons/buttons";
import { useWatchlistContext } from "../../context/WatchlistContext";
import { useTheme } from "../../context/ThemeContext";

const MovieCard = ({ pelicula }) => {
  const { alquilarPelicula } = useWatchlistContext();
  const { oscuro } = useTheme();

  return (
    <div
      className={
        oscuro
          ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-lg shadow-lg p-4 flex flex-col items-center w-64 border-2 border-transparent hover:border-blue-900 transition-all hover:shadow-xl"
          : "bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 rounded-lg shadow-lg p-4 flex flex-col items-center w-64 border-2 border-transparent hover:border-yellow-400 transition-all hover:shadow-xl"
      }
    >
      <img
        src={pelicula.poster}
        alt={pelicula.title}
        className="w-40 h-60 object-cover rounded mb-4"
      />
      <h3
        className={`text-center text-xl font-bold mb-2 ${
          oscuro ? "text-blue-900" : "text-white"
        }`}
      >
        {pelicula.title}
      </h3>
      <div>
        <AgregarAlquilerBoton onClick={() => alquilarPelicula(pelicula)} />
      </div>
    </div>
  );
};

export default MovieCard;
