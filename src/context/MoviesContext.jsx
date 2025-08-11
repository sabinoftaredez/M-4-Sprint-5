/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useMemo } from 'react';
import { useTMDb } from './TMDbContext';
import { useWatchlistContext } from './WatchlistContext';

// Crear el contexto coordinador
const MoviesContext = createContext();

// Provider del contexto coordinador
export const MoviesProvider = ({ children }) => {
  // LandingPage.
  const [mostrarLanding, setMostrarLanding] = useState(true);
  const ocultarLanding = () => setMostrarLanding(false);


  // Carrito de Alquiler.
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  // Coordinación (UI) - 4 apartados del FilterModal
  const [tipoContenido, setTipoContenido] = useState('inicio'); // 'inicio', 'peliculas', 'series'
  const [seccionActiva, setSeccionActiva] = useState('locales'); // 'locales', 'tmdb'
  const [filtroGenero, setFiltroGenero] = useState('todos'); // Géneros del Modal
  const [filtroProductora, setFiltroProductora] = useState('todas'); // Productoras del Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [resultadosLocales, setResultadosLocales] = useState(null);

  // Obtener contextos Específicos - "Evitar que Dupliquen las funciones".
  const tmdbContext = useTMDb();
  const watchlistContext = useWatchlistContext();

  // Función de Coordinación - Maneja apartados 1 y 2.
  const cambiarSeccion = nuevaSeccion => {
    // Apartado 1: Tipo de Contenido
    if (['inicio', 'peliculas', 'series'].includes(nuevaSeccion)) {
      setTipoContenido(nuevaSeccion);
    }
    // Apartado 2: Sección
    else if (['locales', 'tmdb'].includes(nuevaSeccion)) {
      setSeccionActiva(nuevaSeccion);
    }
    // Compatibilidad con secciones anteriores.
    else {
      setSeccionActiva(nuevaSeccion);
    }
  };

  // Función de Coordinación para los Filtros en los 4 apartados.
  const aplicarFiltros = async () => {
    // Filtro TMDb.
    if (seccionActiva === 'tmdb') {
      // Lógica TMDb.
      try {
        if (filtroGenero !== 'todos' && filtroProductora !== 'todas') {
          const { toast } = await import('react-toastify');
          toast.warning('Aplicando filtros de género y productora');
          await tmdbContext.obtenerPeliculasPorGenero?.(filtroGenero);
        }
        else if (filtroGenero !== 'todos') {
          await tmdbContext.obtenerPeliculasPorGenero(filtroGenero);
        }
        else if (filtroProductora !== 'todas') {
          await tmdbContext.obtenerPeliculasPorProductora(filtroProductora);
        }
        else if (tipoContenido === 'series') {
          await tmdbContext.obtenerSeries();
        }
        else {
          await tmdbContext.obtenerPeliculasPopulares();
        }
      } catch (error) {
        console.error('Error al aplicar filtros:', error);
        const { toast } = await import('react-toastify');
        toast.error('Error al aplicar filtros');
      }
    }

    // Cerrar Modal después de aplicar el filtro (Recomendado por AI - Mejor Dinamismo).
    setMostrarModal(false);
  };

  // Función de Coordinación para obtener la vista de las Peliculas Consumidas por la APi.
  const obtenerPeliculasVista = useMemo(() => {
    // Para Seccion TMDb.
    if (tmdbContext.resultadosBusqueda?.length > 0) {
      return tmdbContext.resultadosBusqueda;
    }
    return tmdbContext.peliculasPopulares || [];
  }, [
    tmdbContext.peliculasPopulares,
    tmdbContext.resultadosBusqueda,
  ]);

  // Función de Coordinación de búsqueda (Delegada a TMDbContext).
  const realizarBusqueda = async termino => {
    if (!termino.trim()) return;
    if (seccionActiva === 'tmdb') {
      await tmdbContext.buscarPeliculas(termino);
    }
  };

  // Función de Coordinación para limpiar el Filtro.
  const limpiarFiltros = () => {
    setTipoContenido('inicio');
    setSeccionActiva('locales');
    setFiltroGenero('todos');
    setFiltroProductora('todas');
    tmdbContext.limpiarResultadosBusqueda?.();
  };

  // Función para Alternar Modal de filtros.
  const alternarModal = () => {
    setMostrarModal(!mostrarModal);
  };

  // Valor del Contexto para la Coordinación - "NO DUPLICAR FUNCIONES".
  const value = {
    // Estados de coordinación de los 4 apartados
    mostrarLanding,
    mostrarCarrito,
    tipoContenido,
    seccionActiva,
    filtroGenero,
    filtroProductora,
    mostrarModal,
    obtenerPeliculasVista,
    resultadosLocales,

    // Funciones de coordinación
    ocultarLanding,
    setMostrarLanding,
    setMostrarCarrito,
    setTipoContenido,
    setSeccionActiva,
    setFiltroGenero,
    setFiltroProductora,
    cambiarSeccion,
    aplicarFiltros,
    realizarBusqueda,
    limpiarFiltros,
    alternarModal,
    setResultadosLocales,

    // Contextos Específicos.
    tmdb: tmdbContext,
    watchlist: watchlistContext,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies debe ser usado dentro de MoviesProvider');
  }
  return context;
};
