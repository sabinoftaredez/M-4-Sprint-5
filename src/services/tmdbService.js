import axios from 'axios';

// ✅ CONFIGURACIÓN SEGURA - Variables de entorno
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDB_API_URL;
const BASE_IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

// Validación de variables de entorno al cargar - Recomendado por AI - Mayor Robustez.
if (!API_KEY || !API_URL || !BASE_IMAGE_URL) {
  console.error('❌ Error: Variables de entorno de TMDb no están configuradas');
  console.error('Verifica que el archivo .env contenga: VITE_TMDB_API_KEY, VITE_TMDB_API_URL, VITE_TMDB_IMAGE_URL');
}

// Función para Transformar Películas con URLs Completas de Imágenes - Recomendado por AI por Error de Renderizado.
const transformarPelicula = movie => ({
  ...movie,
  poster: movie.poster_path
    ? `${BASE_IMAGE_URL}${movie.poster_path}`
    : '/placeholder.jpg', // Fallback para imágenes faltantes
  title: movie.title || movie.name || 'Sin título', // Asegurar que tenga título
  id: movie.id,
  price: 2500, // Precio por defecto para películas de API
});

// Mapeo de IDs de géneros de TMDb
const GENEROS_TMDB = {
  estrenos: 'now_playing', // Endpoint especial para estrenos
  accion: 28,
  aventura: 12,
  comedia: 35,
  'ciencia-ficcion': 878,
  crimen: 80,
  drama: 18,
  romance: 10749,
  suspenso: 53,
  terror: 27,
};

// Mapeo de IDs de productoras de streaming
const PRODUCTORAS_TMDB = {
  netflix: 8,
  'amazon-prime': 119,
  disney: 337,
  hulu: 15,
  hbo: 384,
  paramount: 531,
};
// Configuración de Axios.
const tmdbClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
  params: {
    api_key: API_KEY,
    language: 'es-ES', // Idioma por defecto
  },
});
// Estructura del Servicio para el FilterModal
export const tmdbService = {
  // ===============================
  // APARTADO 1: TIPO DE CONTENIDO (Inicio/Películas/Series)
  // ===============================
  obtenerPeliculas: async (page = 1) => {
    try {
      const response = await tmdbClient.get('/movie/popular', {
        params: { page },
      });
      return response.data.results.map(transformarPelicula);
    } catch (error) {
      console.error('Error al obtener películas:', error);
      throw new Error(`Error al obtener películas: ${error.message}`);
    }
  },

  obtenerSeries: async (page = 1) => {
    try {
      const response = await tmdbClient.get('/tv/popular', {
        params: { page },
      });
      return response.data.results.map(show => ({
        ...show,
        poster: show.poster_path
          ? `${BASE_IMAGE_URL}${show.poster_path}`
          : '/placeholder.jpg',
        title: show.name || show.original_name || 'Sin título',
        id: show.id,
        price: 3000, // Precio diferente para series
      }));
    } catch (error) {
      console.error('Error al obtener series:', error);
      throw new Error(`Error al obtener series: ${error.message}`);
    }
  },

  // ===============================
  // APARTADO 2: SECCIÓN (Locales / TMDb)
  // ===============================
  obtenerPeliculasPopulares: async (page = 1) => {
    try {
      const response = await tmdbClient.get('/movie/popular', {
        params: { page },
      });
      return response.data.results.map(transformarPelicula);
    } catch (error) {
      console.error('Error al obtener películas populares:', error);
      throw new Error(`Error al obtener películas populares: ${error.message}`);
    }
  },

  // ===============================
  // APARTADO 3: GÉNERO
  // ===============================
  obtenerPeliculasPorGenero: async (genero, page = 1) => {
    try {
      const generoId = GENEROS_TMDB[genero];

      // Caso especial para estrenos
      if (genero === 'estrenos') {
        const response = await tmdbClient.get('/movie/now_playing', {
          params: { page },
        });
        return response.data.results.map(transformarPelicula);
      }

      // Para otros géneros usar discover
      const response = await tmdbClient.get('/discover/movie', {
        params: {
          with_genres: generoId,
          sort_by: 'popularity.desc',
          page,
        },
      });
      return response.data.results.map(transformarPelicula);
    } catch (error) {
      console.error(`Error al obtener películas del género ${genero}:`, error);
      throw new Error(
        `Error al obtener películas del género ${genero}: ${error.message}`
      );
    }
  },

  // ===============================
  // APARTADO 4: PRODUCTORAS (Streaming)
  // ===============================
  obtenerPeliculasPorProductora: async (productora, page = 1) => {
    try {
      const productoraId = PRODUCTORAS_TMDB[productora];

      const response = await tmdbClient.get('/discover/movie', {
        params: {
          with_watch_providers: productoraId,
          watch_region: 'US', // Región para disponibilidad
          sort_by: 'popularity.desc',
          page,
        },
      });
      return response.data.results.map(transformarPelicula);
    } catch (error) {
      console.error(`Error al obtener películas de ${productora}:`, error);
      throw new Error(
        `Error al obtener películas de ${productora}: ${error.message}`
      );
    }
  },

  // ===============================
  // FUNCIÓN DE BÚSQUEDA GENERAL
  // ===============================
  buscarPeliculas: async (query, page = 1) => {
    try {
      const response = await tmdbClient.get('/search/movie', {
        params: { query, page },
      });
      return response.data.results.map(transformarPelicula);
    } catch (error) {
      console.error('Error al buscar películas:', error);
      throw new Error(`Error al buscar películas: ${error.message}`);
    }
  },
};

export default tmdbService;
