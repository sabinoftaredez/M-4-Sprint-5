import React from "react";
import MovieCard from "../tools/MovieCard"; // ✅
import { useTheme } from "../../context/ThemeContext";

const CarruselSection = ({ titulo, peliculas }) => {
    const { oscuro } = useTheme();

    return (
        <div className={`w-full h-full flex flex-col justify-center px-6 py-12 ${
        oscuro  ? "bg-gradient-to-br from-blue-900 to-slate-900"
                : "bg-gradient-to-br from-sky-100 to-white"
        }`}>
        {/* Titulo. */}
        <h2 className={`text-3xl font-bold mb-6 text-center ${
            oscuro  ? "text-gray-200"
                    : "text-gray-800"
        }`}>
            {titulo}
        </h2>
        {/* Carrusel. */}
        <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{width: 'fit-content'}}>
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="flex-shrink-0">
                        <MovieCard pelicula={pelicula} />
                    </div>
                ))}
            </div>
        </div>
        {/* Indicadores del carrusel. */}
        <div className="text-center">
            <p className={`text-sm ${
                oscuro  ? "text-gray-400"
                        : "text-gray-500"
                }`}>
                    ↓ Ver Mas
            </p>
        </div>
        </div>
    )
}
export default CarruselSection;