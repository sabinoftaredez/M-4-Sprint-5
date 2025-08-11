import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useMovies } from "../../context/MoviesContext";
import { toast } from "react-toastify";
import { BotonBusqueda } from "../buttons/buttons";
import { buscarPeliculasLocales } from "../../services/peliculasLocalesService";

const SearchForm = () => {
  const { oscuro } = useTheme();
  const { seccionActiva, setResultadosLocales, realizarBusqueda } = useMovies();
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const manejarBusqueda = async (Event) => {
    Event.preventDefault();

    // Validación mínima.
    if (!terminoBusqueda.trim() || terminoBusqueda.trim().length < 3) {
      toast.warn("Ingresa al menos 3 caracteres para buscar");
      return;
    }

    const termino = terminoBusqueda.trim();

    // Seccion Locales.
    if (seccionActiva === "locales") {
      toast.info(`Buscando "${termino}" en Locales`);

      const resultados = buscarPeliculasLocales(termino);
      if (resultados.length === 0) {
        toast.info(`No se encontraron resultados con "${termino}"`);
        return;
      } else {
        toast.success(
          `Se encontraron ${resultados.length} pelicula(s) locale(s)`
        );
      }
      // Resultados.
      setResultadosLocales(resultados);
    } else {
      // Seccion TMDb.
      toast.info(`Buscando "${termino}" en TMDb...`);
      await realizarBusqueda(termino);
    }
  };
  // Funcion Para Tecla ENTER - Recomendado por AI.
  const manejarKeyPress = (e) => {
    if (Event.key === "Enter") {
      manejarBusqueda(e);
    }
  };

  return (
    <form onSubmit={manejarBusqueda} className="flex items-center gap-2">
      <div className="relative">
        <input
          type="text"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          onKeyPress={manejarKeyPress}
          placeholder="Buscar películas..."
          className={`px-4 py-2 pr-10 rounded-lg border transition-all focus:outline-none focus:ring-2 w-64 ${
            oscuro
              ? "bg-slate-700 border-blue-600/30 text-gray-200 placeholder-gray-400 focus:ring-yellow-500/50 focus:border-yellow-400"
              : "bg-white border-sky-300 text-gray-700 placeholder-gray-500 focus:ring-sky-500/50 focus:border-sky-400"
          }`}
        />
        <i
          className={`bi bi-search absolute right-3 top-1/2 transform -translate-y-1/2 ${
            oscuro ? "text-gray-400" : "text-gray-500"
          }`}
        ></i>
      </div>

      <BotonBusqueda onClick={manejarBusqueda} />
    </form>
  );
};

export default SearchForm;
