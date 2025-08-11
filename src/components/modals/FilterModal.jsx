import React from "react";
import { useMovies } from "../../context/MoviesContext";
import { useTheme } from "../../context/ThemeContext";
import {
  BotonesTipoContenido,
  BotonesSeccion,
  BotonesGenero,
  BotonesProductoras,
  BotonLimpiarFiltros,
  BotonAplicarFiltros,
} from "../buttons/buttons";
const FilterModal = () => {
  const { oscuro } = useTheme();
  const {
    mostrarModal,
    alternarModal,
    // Estados de los 4 apartados
    tipoContenido,
    seccionActiva,
    filtroGenero,
    filtroProductora,
    // Setters de los 4 apartados
    setTipoContenido,
    setSeccionActiva,
    setFiltroGenero,
    setFiltroProductora,
    // Funciones coordinadoras
    aplicarFiltros,
    limpiarFiltros,
  } = useMovies();

  if (!mostrarModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
        className={
          oscuro
            ? "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-gray-200 p-6 rounded-lg shadow-2xl w-11/12 max-w-md border border-blue-600/50"
            : "bg-gradient-to-br from-gray-800 via-sky-900 to-gray-800 text-white p-6 rounded-lg shadow-2xl w-11/12 max-w-md border border-sky-700/50"
        }
      >
        {/* Header del Modal */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              oscuro ? "text-white" : "text-white"
            }`}
          >
            Filtros
          </h2>
          <button
            onClick={alternarModal}
            className={`${
              oscuro
                ? "text-gray-400 hover:text-yellow-300"
                : "text-gray-300 hover:text-yellow-200"
            } transition-colors`}
            title="Cerrar filtros"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* APARTADO 1: Tipo de Contenido */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 ${
              oscuro ? "text-gray-300" : "text-gray-300"
            }`}
          >
            Tipo de Contenido
          </label>
          <BotonesTipoContenido
            tipoContenido={tipoContenido}
            setTipoContenido={setTipoContenido}
          />
        </div>

        {/* APARTADO 2: Sección */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 ${
              oscuro ? "text-gray-300" : "text-gray-300"
            }`}
          >
            Sección
          </label>
          <BotonesSeccion
            seccionActiva={seccionActiva}
            setSeccionActiva={setSeccionActiva}
          />
        </div>

        {/* APARTADO 3: Género */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 ${
              oscuro ? "text-gray-300" : "text-gray-300"
            }`}
          >
            Género
          </label>
          <BotonesGenero
            filtroGenero={filtroGenero}
            setFiltroGenero={setFiltroGenero}
          />
        </div>

        {/* APARTADO 4: Productoras */}
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-3 ${
              oscuro ? "text-gray-300" : "text-gray-300"
            }`}
          >
            Productoras
          </label>
          <BotonesProductoras
            filtroProductora={filtroProductora}
            setFiltroProductora={setFiltroProductora}
          />
        </div>

        {/* Información actual */}
        <div
          className={
            oscuro
              ? "bg-gradient-to-r from-blue-800 to-yellow-600 p-4 rounded-lg mb-4 border border-yellow-500/50"
              : "bg-gradient-to-r from-sky-400 to-yellow-400 p-4 rounded-lg mb-4 border border-yellow-400/50"
          }
        >
          <p className={`text-sm font-medium text-white mb-1`}>
            <strong>Contenido:</strong> {tipoContenido}
          </p>
          <p className={`text-sm font-medium text-white mb-1`}>
            <strong>Sección:</strong> {seccionActiva}
          </p>
          <p
            className={`text-sm font-medium ${
              oscuro ? "text-yellow-200" : "text-yellow-100"
            } mb-1`}
          >
            <strong>Género:</strong> {filtroGenero}
          </p>
          <p
            className={`text-sm font-medium ${
              oscuro ? "text-yellow-200" : "text-yellow-100"
            } mb-1`}
          >
            <strong>Productora:</strong> {filtroProductora}
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-4 mt-2">
          <BotonLimpiarFiltros onClick={limpiarFiltros} />
          <BotonAplicarFiltros onClick={aplicarFiltros} />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
