/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { tmdbService } from '../services/tmdbService';
import { toast } from 'react-toastify';

// Crear el contexto
const TMDbContext = createContext();

// Provider del contexto
export const TMDbProvider = ({ children }) => {
  // Consumo de la APi.
const [peliculasApi, setPeliculasApi] = useState([]);
const [cargando, setCargando] = useState(false);
const [error, setError] = useState(null);

  // Estados para diferentes tipos de búsquedas
const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
const [peliculasPopulares, setPeliculasPopulares] = useState([]);
/*const [peliculasArgentinas, setPeliculasArgentinas] = useState([]);*/

  // Función para Buscar Películas por Término.
const buscarPeliculas = async query => {
    if (!query.trim()) {
    toast.error('Por favor ingresa un término de búsqueda'); // Notificación.
    return;
    }

    setCargando(true);
    setError(null);

    try {
    const results = await tmdbService.buscarPeliculas(query);
    setResultadosBusqueda(results);
    toast.success(`Se encontraron ${results.length} películas`);
    } catch {
    const errorMessage = 'Error al buscar películas';
    setError(errorMessage);
    toast.error(errorMessage);
    setResultadosBusqueda([]);
    } finally {
    setCargando(false);
    }
};

  // Función para Obtener Películas Populares.
  const obtenerPeliculasPopulares = async () => {
    setCargando(true);
    setError(null);

    try {
    const results = await tmdbService.obtenerPeliculasPopulares();
    setPeliculasPopulares(results);
    toast.success('Películas populares cargadas');
    } catch {
    const errorMessage = 'Error al cargar películas populares';
    setError(errorMessage);
    toast.error(errorMessage);
    } finally {
    setCargando(false);
    }
};
/*
  // Función para obtener películas argentinas
const obtenerPeliculasArgentinas = async () => {
    setCargando(true);
    setError(null);

    try {
    const results = await tmdbService.obtenerPeliculasArgentinas();
    setPeliculasArgentinas(results);
    toast.success('Películas argentinas cargadas');
    } catch {
    const errorMessage = 'Error al cargar películas argentinas';
    setError(errorMessage);
    toast.error(errorMessage);
    } finally {
    setCargando(false);
    }
};
*/
  // Función para limpiar resultados de búsqueda - Recomendado por AI.
const limpiarResultadosBusqueda = () => {
    setResultadosBusqueda([]);
    setError(null);
};

  // Funciones para los 4 Apartados del FilterModal.

  // APARTADO 1: Tipo de Contenido.
const obtenerPeliculas = async (page = 1) => {
    setCargando(true);
    setError(null);
    try {
    const results = await tmdbService.obtenerPeliculas(page);
      setPeliculasPopulares(results); // Usar el mismo estado por ahora.
    } catch (error) {
    setError(error.message || 'Error al obtener películas');
    } finally {
    setCargando(false);
    }
};

const obtenerSeries = async (page = 1) => {
    setCargando(true);
    setError(null);
    try {
    const results = await tmdbService.obtenerSeries(page);
      setPeliculasPopulares(results); // Usar el mismo estado por ahora.
    } catch (error) {
    setError(error.message || 'Error al obtener series');
    } finally {
    setCargando(false);
    }
};

  // APARTADO 3: Género
const obtenerPeliculasPorGenero = async (genero, page = 1) => {
    setCargando(true);
    setError(null);
    try {
    const results = await tmdbService.obtenerPeliculasPorGenero(genero, page);
      setPeliculasPopulares(results); // Usar el mismo estado por ahora.
    } catch (error) {
    setError(
        error.message || `Error al obtener películas del género ${genero}`
    );
    } finally {
    setCargando(false);
    }
};

  // APARTADO 4: Productoras
const obtenerPeliculasPorProductora = async (productora, page = 1) => {
    setCargando(true);
    setError(null);
    try {
    const results = await tmdbService.obtenerPeliculasPorProductora(
        productora,
        page
    );
      setPeliculasPopulares(results); // Usar el mismo estado por ahora.
    } catch (error) {
    setError(error.message || `Error al obtener películas de ${productora}`);
    } finally {
    setCargando(false);
    }
};

  // Función para limpiar todos los datos - Recomendado por AI.
const limpiarTodosLosDatos = () => {
    setResultadosBusqueda([]);
    setPeliculasPopulares([]);
    /*setPeliculasArgentinas([]);*/
    setPeliculasApi([]);
    setError(null);
};

  // Valores del Contexto que se Compartirá.
const value = {
    // Estados.
    peliculasApi,
    cargando,
    error,
    resultadosBusqueda,
    peliculasPopulares,
    /*peliculasArgentinas,*/

    // Funciones originales.
    buscarPeliculas,
    obtenerPeliculasPopulares,
    /*obtenerPeliculasArgentinas,*/
    limpiarResultadosBusqueda,
    limpiarTodosLosDatos,
    setPeliculasApi,

    // Nuevas funciones para los 4 apartados.
    obtenerPeliculas,
    obtenerSeries,
    obtenerPeliculasPorGenero,
    obtenerPeliculasPorProductora,
};

return <TMDbContext.Provider value={value}>{children}</TMDbContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useTMDb = () => {
const context = useContext(TMDbContext);
if (!context) {
    throw new Error('useTMDb debe ser usado dentro de TMDbProvider');
}
return context;
};
