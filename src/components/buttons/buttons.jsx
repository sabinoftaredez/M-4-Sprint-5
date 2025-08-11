import { useTheme } from "../../context/ThemeContext";
import { useMovies } from "../../context/MoviesContext";
// =====================================
// BOTONES PARA HEADER Y NAVEGACIÓN
// =====================================
// Botón Cambio de Modo.
export const CambiarModoBoton = () => {
  const { oscuro, cambiarModo } = useTheme();
  return (
    <button
      onClick={cambiarModo}
      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
      title={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <i className={`bi ${oscuro ? "bi-sun" : "bi-moon"} text-2xl`}></i>
    </button>
  );
};
// Botón de Busqueda.
export const BotonBusqueda = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all shadow-lg ${
        oscuro
          ? "bg-gradient-to-r from-blue-600 to-yellow-500 text-white hover:from-blue-700 hover:to-yellow-400 border border-yellow-500/50"
          : "bg-gradient-to-r from-sky-500 to-yellow-400 text-white hover:from-sky-600 hover:to-yellow-300 border border-yellow-400/50"
      }`}
      title="Buscar películas"
    >
      <i className="bi bi-search"></i>
    </button>
  );
};
// Botón de Alquiler con colores argentinos naturales.
export const AlquilerPeliculas = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
    title="Ver carrito de alquiler"
  >
    <i className="bi bi-cart3 text-2xl"></i>
  </button>
);
// Botón de Filtros.
export const FiltrosBoton = () => {
  const { oscuro } = useTheme();
  const { alternarModal } = useMovies();
  return (
    <button
      onClick={alternarModal}
      className={`${
        oscuro
          ? "text-gray-300 hover:text-blue-400"
          : "text-gray-400 hover:text-sky-400"
      } transition-colors flex items-center gap-2`}
      title="Filtrar películas"
    >
      <i className="bi bi-funnel text-2xl"></i>
    </button>
  );
};
// =====================================
// BOTONES PARA FILTERMODAL
// =====================================
// Botón genérico para filtros del modal
export const BotonFiltro = ({ isActive, onClick, children, size = "sm" }) => {
  const { oscuro } = useTheme();

  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-md font-medium transition-all ${
        isActive
          ? oscuro
            ? "bg-gradient-to-r from-blue-600 to-yellow-500 text-white border border-yellow-400/50 shadow-lg"
            : "bg-gradient-to-r from-sky-500 to-yellow-400 text-white border border-yellow-300/50 shadow-lg"
          : oscuro
          ? "bg-gradient-to-r from-slate-700 to-blue-800 text-gray-300 hover:from-slate-600 hover:to-blue-700 border border-blue-600/30 hover:border-blue-500/50"
          : "bg-gradient-to-r from-gray-700 to-sky-800 text-gray-300 hover:from-gray-600 hover:to-sky-700 border border-sky-600/30 hover:border-sky-500/50"
      }`}
    >
      {children}
    </button>
  );
};

// Componente para botones de tipo de contenido
export const BotonesTipoContenido = ({ tipoContenido, setTipoContenido }) => {
  const tipos = [
    { id: "inicio", label: "Inicio" },
    { id: "peliculas", label: "Películas" },
    { id: "series", label: "Series" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {tipos.map((tipo) => (
        <BotonFiltro
          key={tipo.id}
          isActive={tipoContenido === tipo.id}
          onClick={() => setTipoContenido(tipo.id)}
        >
          {tipo.label}
        </BotonFiltro>
      ))}
    </div>
  );
};

// Componente para botones de sección
export const BotonesSeccion = ({ seccionActiva, setSeccionActiva }) => {
  const secciones = [
    { id: "locales", label: "🏠 Locales" },
    { id: "tmdb", label: "🌐 TMDb" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {secciones.map((seccion) => (
        <BotonFiltro
          key={seccion.id}
          isActive={seccionActiva === seccion.id}
          onClick={() => setSeccionActiva(seccion.id)}
        >
          {seccion.label}
        </BotonFiltro>
      ))}
    </div>
  );
};

// Componente para botones de género
export const BotonesGenero = ({ filtroGenero, setFiltroGenero }) => {
  const generos = [
    { id: "todos", label: "🎬 Todos" },
    { id: "estrenos", label: "🆕 Estrenos" },
    { id: "accion", label: "💥 Acción" },
    { id: "aventura", label: "🗺️ Aventura" },
    { id: "comedia", label: "😂 Comedia" },
    { id: "ciencia-ficcion", label: "🚀 Sci-Fi" },
    { id: "crimen", label: "🕵️ Crimen" },
    { id: "drama", label: "🎭 Drama" },
    { id: "romance", label: "💕 Romance" },
    { id: "suspenso", label: "😰 Suspenso" },
    { id: "terror", label: "👻 Terror" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {generos.map((genero) => (
        <BotonFiltro
          key={genero.id}
          isActive={filtroGenero === genero.id}
          onClick={() => setFiltroGenero(genero.id)}
          size="xs"
        >
          {genero.label}
        </BotonFiltro>
      ))}
    </div>
  );
};

// Componente para botones de productoras
export const BotonesProductoras = ({
  filtroProductora,
  setFiltroProductora,
}) => {
  const productoras = [
    { id: "todas", label: "🎬 Todas" },
    { id: "netflix", label: "🔴 Netflix" },
    { id: "amazon-prime", label: "📦 Prime" },
    { id: "disney", label: "🏰 Disney" },
    { id: "hulu", label: "🟢 Hulu" },
    { id: "hbo", label: "🎬 HBO" },
    { id: "paramount", label: "⭐ Paramount" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {productoras.map((productora) => (
        <BotonFiltro
          key={productora.id}
          isActive={filtroProductora === productora.id}
          onClick={() => setFiltroProductora(productora.id)}
          size="xs"
        >
          {productora.label}
        </BotonFiltro>
      ))}
    </div>
  );
};

// Botones de acción del modal
export const BotonLimpiarFiltros = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "flex-1 px-4 py-2 bg-gradient-to-r from-slate-700 to-blue-800 text-gray-200 rounded hover:from-slate-600 hover:to-blue-700 transition-all shadow-lg border border-blue-600/30 hover:border-blue-500/50"
          : "flex-1 px-4 py-2 bg-gradient-to-r from-gray-700 to-sky-800 text-white rounded hover:from-gray-600 hover:to-sky-700 transition-all shadow-lg border border-sky-600/30 hover:border-sky-500/50"
      }
    >
      Limpiar
    </button>
  );
};

export const BotonAplicarFiltros = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded hover:from-blue-700 hover:to-yellow-400 transition-all shadow-lg border border-yellow-500/50 hover:border-yellow-400/60"
          : "flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-yellow-400 text-white rounded hover:from-sky-600 hover:to-yellow-300 transition-all shadow-lg border border-yellow-400/50 hover:border-yellow-300/60"
      }
    >
      Aplicar
    </button>
  );
};
// =====================================
// BOTONES PARA CARRITO DE ALQUILER
// =====================================
// Botón Añadir - Azul celeste natural argentino.
export const AgregarAlquilerBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-yellow-500 hover:text-gray-800 transition-all shadow-lg border-2 border-yellow-500 hover:border-blue-700"
          : "mt-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-sky-400 hover:text-white transition-all shadow-lg border-2 border-sky-400 hover:border-yellow-400"
      }
    >
      Rentar 🍿
    </button>
  );
};
// Botón Remover - Blanco natural argentino.
export const RemoverAlquilerBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "mt-4 px-4 py-2 bg-slate-700 text-gray-200 rounded hover:bg-slate-600 transition-all shadow-lg border border-slate-600"
          : "mt-4 px-4 py-2 bg-white text-gray-700 rounded hover:bg-sky-50 transition-all shadow-lg border border-sky-300"
      }
    >
      Remover Alquiler
    </button>
  );
};
// Botón borrar todos - Blanco natural argentino.
export const BorrarTodosAlquileresBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "mt-4 px-4 py-2 bg-slate-700 text-gray-200 rounded hover:bg-slate-600 transition-all shadow-lg border border-slate-600"
          : "mt-4 px-4 py-2 bg-white text-gray-700 rounded hover:bg-sky-50 transition-all shadow-lg border border-sky-300"
      }
    >
      Borrar Todos
    </button>
  );
};
// Botón Cerrar - Amarillo sol natural argentino.
export const CerrarLista = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={
        oscuro
          ? "mt-4 px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 transition-all shadow-lg border border-yellow-600"
          : "mt-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-100 transition-all shadow-lg"
      }
    >
      Cerrar
    </button>
  );
};
// =====================================
// BOTONES DEL HAMBURGERMENU.
// =====================================

// Botón Hamburger.
export const HamburgerMenuBoton = ({ onClick, menuAbierto }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-sm transition-all ${
        oscuro
          ? "bg-black/30 text-white hover:bg-black/50"
          : "bg-white/20 text-white hover:bg-white/30"
      }`}
      title={menuAbierto ? "Cerrar menú" : "Abrir menú"}
    >
      <i className={`bi ${menuAbierto ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
    </button>
  );
};
// Botón Explorador.
export const ExploradorBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-lg font-medium transition-all shadow-lg ${
        oscuro
          ? "bg-gradient-to-r from-blue-600 to-yellow-500 text-white hover:bg-blue-700 hover:to-yellow-500 border border-yellow-500/50"
          : "bg-gradient-to-r from-sky-500 to-yellow-400 text-white hover:bg-sky-600 hover:to-yellow-300 border border-yellow-400/50"
      }`}
      title="Explorador"
    >
      Explorar.
    </button>
  );
};
// Botón Redes.
export const RedesBoton = ({ redes, href }) => {
  const { oscuro } = useTheme();
  return (
    <a
      href={href}
      className={`p-4 rounded-full transition-all ${
        oscuro
          ? "bg-blue-800 text-yellow-400 hover:bg-blue-700 hover:text-yellow-300"
          : "bg-white text-sky-600 hover:bg-sky-50 hover:text-sky-700"
      }`}
      title={`Seguinos en ${redes}`}
    >
      <i className={`bi bi-${redes} text-2xl`}></i>
    </a>
  );
};
// =====================================
// BOTONES CRUD
// =====================================
// Boton Editar.
export const EditarItemBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
          : 'bg-yellow-500 hover:bg-yellow-600 text-white'
      }`}
    >
      Editar Película
    </button>
  );
};

// Botón Eliminar.
export const EliminarItemBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-red-500 hover:bg-red-600 text-white'
      }`}
    >
      Eliminar Película
    </button>
  );
};

// Botón Crear.
export const CrearItemBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      Agregar Nueva Película
    </button>
  );
};

// Botón Volver.
export const VolverListaBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-slate-600 hover:bg-slate-700 text-white'
          : 'bg-gray-500 hover:bg-gray-600 text-white'
      }`}
    >
      Volver a la Lista
    </button>
  );
};

// Botón Cancelar.
export const CancelarFormBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-slate-600 hover:bg-slate-700 text-white'
          : 'bg-gray-500 hover:bg-gray-600 text-white'
      }`}
    >
      Cancelar
    </button>
  );
};

// Botón Guardar.
export const GuardarItemBoton = ({ onClick, texto = "Crear Película" }) => {
  const { oscuro } = useTheme();
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      {texto}
    </button>
  );
};

// Botón Ir a Home.
export const IrAHomeBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-sky-500 hover:bg-sky-600 text-white'
      }`}
    >
      Ir a Home
    </button>
  );
};

// Botón Ver Películas.
export const VerPeliculasBoton = ({ onClick }) => {
  const { oscuro } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        oscuro
          ? 'bg-slate-600 hover:bg-slate-700 text-white'
          : 'bg-gray-500 hover:bg-gray-600 text-white'
      }`}
    >
      Ver Películas
    </button>
  );
};