import {
  AlquilerPeliculas,
  CambiarModoBoton,
  FiltrosBoton,
} from "../buttons/buttons";
import { useTheme } from "../../context/ThemeContext";
import { useMovies } from "../../context/MoviesContext";
import SearchForm from "../tools/SearchForm";

const Header = () => {
  const { oscuro } = useTheme();
  const { setMostrarCarrito } = useMovies();

  return (
    <header
      className={
        oscuro
          ? "bg-gradient-to-r from-blue-900 via-slate-800 to-blue-900 text-gray-200 shadow-lg"
          : "bg-gradient-to-r from-sky-100 via-white to-sky-200 text-gray-400 shadow-lg"
      }
    >
      {/* Barra de Redes Sociales */}
      <div
        className={
          oscuro
            ? "bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 px-4 py-2"
            : "bg-gradient-to-r from-sky-200 via-white to-sky-100 px-4 py-2"
        }
      >
        <div className="flex justify-between items-center">
          {/* Generales */}
          <div className="flex items-center gap-3">
            <span
              className={`text-sm ${
                oscuro ? "text-gray-300" : "text-gray-400"
              }`}
            >
              Síguenos:
            </span>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
              } transition-colors`}
              title="Facebook"
            >
              <i className="bi bi-facebook text-lg"></i>
            </a>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
              } transition-colors`}
              title="Instagram"
            >
              <i className="bi bi-instagram text-lg"></i>
            </a>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
              } transition-colors`}
              title="X"
            >
              <i className="bi bi-twitter-x text-lg"></i>
            </a>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
              } transition-colors`}
              title="Whatsapp"
            >
              <i className="bi bi-whatsapp text-lg"></i>
            </a>
          </div>
          {/* Cinéfilos */}
          <div className="flex items-center gap-3">
            <span
              className={`text-sm ${
                oscuro ? "text-gray-300" : "text-gray-400"
              }`}
            >
              Cinéfilos:
            </span>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-400 hover:text-sky-400"
              } transition-colors`}
              title="Letterboxd"
            >
              <i className="bi bi-film text-lg"></i>
            </a>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-400 hover:text-sky-400"
              } transition-colors`}
              title="IMDb"
            >
              <i className="bi bi-star-fill text-lg"></i>
            </a>
            <a
              href="#"
              className={`${
                oscuro
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-400 hover:text-sky-400"
              } transition-colors`}
              title="MUBI"
            >
              <i className="bi bi-play-circle text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4">
        <h1
          className={`text-2xl font-bold ${
            oscuro ? "text-white" : "text-gray-400"
          }`}
        >
          🎥 Cine Argentino
        </h1>

        {/* Buscador central */}
        <div className="flex-1 flex justify-center mx-8">
          <SearchForm />
        </div>

        <div className="flex items-center gap-4">
          {/* Botón Chat IA */}
          <button
            className={`${
              oscuro
                ? "text-gray-300 hover:text-yellow-400"
                : "text-gray-400 hover:text-yellow-400"
            } transition-colors`}
            title="Chat IA - Ayuda para elegir película"
          >
            <i className="bi bi-robot text-2xl"></i>
          </button>
          <FiltrosBoton />
          <CambiarModoBoton />
          <AlquilerPeliculas onClick={() => setMostrarCarrito(true)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
