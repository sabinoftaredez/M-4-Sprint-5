import MovieCard from "../components/tools/MovieCard"; //
import { useMovies } from "../context/MoviesContext";
import { useTheme } from "../context/ThemeContext";
import { obtenerPeliculasLocales } from "../services/peliculasLocalesService";

const MovieList = () => {
  const { obtenerPeliculasVista, seccionActiva, tmdb, resultadosLocales } = useMovies();
  const { oscuro } = useTheme();

  // Películas locales.
  const peliculasLocales = obtenerPeliculasLocales();

  // Determinar qué películas mostrar según la sección activa
  const peliculasAMostrar =
    seccionActiva === "locales" ? (resultadosLocales && resultadosLocales.length > 0 ? resultadosLocales : peliculasLocales) : obtenerPeliculasVista;

  // Verificar si hay resultados de búsqueda activos
  const hayBusquedaActiva =
    tmdb.resultadosBusqueda && tmdb.resultadosBusqueda.length > 0;
  const esBusquedaVacia =
    seccionActiva === "tmdb" &&
    tmdb.resultadosBusqueda &&
    tmdb.resultadosBusqueda.length === 0;

  // Mostrar loading si estamos cargando datos de la API
  if (seccionActiva !== "locales" && tmdb.cargando) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-current"></div>
        <div
          className={`text-xl font-semibold ${
            oscuro ? "text-yellow-300" : "text-blue-600"
          }`}
        >
          🎬 Cargando películas...
        </div>
      </div>
    );
  }

  // Pantalla "No encontrado" - SOLO PARA SECCIÓN TMDb
  if (peliculasAMostrar.length === 0 && seccionActiva === "tmdb") {
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px] gap-6 p-8">
        <div
          className={`p-8 rounded-full ${
            oscuro
              ? "bg-gradient-to-br from-slate-700 to-blue-800 border border-blue-600/30"
              : "bg-gradient-to-br from-gray-100 to-sky-200 border border-sky-300"
          }`}
        >
          <i
            className={`bi bi-film text-6xl ${
              oscuro ? "text-yellow-300" : "text-sky-600"
            }`}
          ></i>
        </div>

        <div className="text-center max-w-md">
          <h3
            className={`text-2xl font-bold mb-3 ${
              oscuro ? "text-white" : "text-gray-800"
            }`}
          >
            {esBusquedaVacia
              ? "🔍 No encontramos películas en TMDb"
              : "🎬 No hay contenido disponible en TMDb"}
          </h3>
          <p
            className={`text-lg ${oscuro ? "text-gray-300" : "text-gray-600"}`}
          >
            {esBusquedaVacia
              ? "Intenta con otros términos de búsqueda o cambia los filtros"
              : "Selecciona filtros o realiza una búsqueda para ver películas de TMDb"}
          </p>
        </div>

        <div
          className={`flex gap-4 text-sm ${
            oscuro ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>💡 Tip: Busca películas</span>
          <span>•</span>
          <span>🎛️ Usa los filtros</span>
          <span>•</span>
          <span>🏠 Prueba sección Locales</span>
        </div>
      </div>
    );
  }

  // Mostrar información contextual sobre qué se está mostrando
  const renderInfoContextual = () => {
    if (seccionActiva === "locales") {
      return (
        <div
          className={`p-4 mb-4 rounded-lg border ${
            oscuro
              ? "bg-slate-800/50 border-blue-600/30 text-gray-300"
              : "bg-sky-50 border-sky-200 text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <i className="bi bi-house-fill"></i>
            <span className="font-medium">Películas Locales</span>
            <span className="text-sm opacity-75">
              ({peliculasAMostrar.length} películas argentinas)
            </span>
          </div>
        </div>
      );
    }

    if (hayBusquedaActiva) {
      return (
        <div
          className={`p-4 mb-4 rounded-lg border ${
            oscuro
              ? "bg-gradient-to-r from-blue-800/50 to-yellow-600/50 border-yellow-500/30 text-gray-200"
              : "bg-gradient-to-r from-sky-100 to-yellow-100 border-yellow-300 text-gray-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <i className="bi bi-search"></i>
            <span className="font-medium">Resultados de Búsqueda</span>
            <span className="text-sm opacity-75">
              ({peliculasAMostrar.length} resultados encontrados)
            </span>
          </div>
        </div>
      );
    }

    if (seccionActiva === "tmdb") {
      return (
        <div
          className={`p-4 mb-4 rounded-lg border ${
            oscuro
              ? "bg-slate-800/50 border-blue-600/30 text-gray-300"
              : "bg-sky-50 border-sky-200 text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <i className="bi bi-globe"></i>
            <span className="font-medium">TMDb API</span>
            <span className="text-sm opacity-75">
              ({peliculasAMostrar.length} películas)
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {renderInfoContextual()}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {peliculasAMostrar.map((pelicula) => (
          <MovieCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </div>
  );
};
export default MovieList;
