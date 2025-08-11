import { guardarPeliculasLocales, cargarPeliculasLocales, obtenerProximoId, guardarProximoId } from "../utils/localStorage";

// Películas locales (sección DDHH)
const peliculasLocales = [
    { id: 1, title: "Sol de Noche", poster: "/img1.jpg", price: 2500 },
    { id: 2, title: " Argentina 1985", poster: "/img2.jpg", price: 2000 },
    { id: 3, title: "El Secreto de Sus Ojos", poster: "/img3.jpg", price: 1800 },
    { id: 4, title: "La Revolución es un Sueno Eterno", poster: "/img4.jpg", price: 1700 },
    { id: 5, title: "El Clan", poster: "/img5.jpg", price: 1600 },
    { id: 6, title: "Relatos Salvajes", poster: "/img6.jpg", price: 1900 },
    { id: 7, title: "El Aura", poster: "/img7.jpg", price: 2100 },
    { id: 8, title: "El Hijo de la Novia", poster: "/img8.jpg", price: 2200 },
    { id: 9, title: "Sin Hijos", poster: "/img9.jpg", price: 2300 },
    { id: 10, title: "Cuando Acecha la Oscuridad", poster: "/img10.jpg", price: 2400 },
    { id: 11, title: "La Noche de Los Lápices", poster: "/img11.jpg", price: 2500 },
    { id: 12, title: "La Patagonia Rebelde", poster: "/img12.jpg", price: 2600 },
];

// Películas locales si no Existen en Local Storage.
const inicializarPeliculasLocales = () => {
    const peliculasGuardadas = cargarPeliculasLocales();
    if (!peliculasGuardadas) {
        guardarPeliculasLocales(peliculasLocales);
        guardarProximoId(13); // El próximo ID después del inicial (12 + 1)
        return peliculasLocales;
    }
    return peliculasGuardadas;
};
// =====================================
// FUNCIONES CRUD
// =====================================
// LEER Peliculas Locales.
export const obtenerPeliculasLocales = () => {
    return inicializarPeliculasLocales();
};
// LEER Peliculas Locales por Termino.
export const buscarPeliculasLocales = (termino) => {
    return obtenerPeliculasLocales().filter((pelicula) =>
        pelicula.title.toLowerCase().includes(termino.toLowerCase())
    );
};
// LEER Peliculas Locales por ID.
export const obtenerPeliculaPorId = (id) => {
    const peliculas = obtenerPeliculasLocales();
    const pelicula = peliculas.find(p => p.id === parseInt(id));
    console.log('Peliculas Encontrada:', pelicula ? pelicula.title : 'No Encontrada');
    return pelicula;
};
// CREAR Nueva Pelicula.
export const crearPeliculaLocal = (nuevaPelicula) => {
    try {
        const peliculas = obtenerPeliculasLocales();
        const proximoId = obtenerProximoId();
        const peliculaConId = {
            id: proximoId,
            title: nuevaPelicula.title.trim(),
            poster: nuevaPelicula.poster.trim(),
            price: parseInt(nuevaPelicula.price)
        };
        // Validaciones.
        if (!peliculaConId.title) {
            throw new Error('El titulo es obligatorio');
        }
        if (!peliculaConId.poster) {
            throw new Error('El poster es obligatorio');
        }
        if (!peliculaConId.price) {
            throw new Error('El precio es obligatorio');
        }
        // Verificación - Evitar Duplicados de Datos (Peliculas).
        const existeTitulo = peliculas.find(p => p.title.toLowerCase() === peliculaConId.title.toLowerCase());
        if (existeTitulo) {
            throw new Error('Ya existe este titulo');
        }
        // Agregar Nueva Pelicula.
        const peliculasActualizadas = [...peliculas, peliculaConId];
        guardarPeliculasLocales(peliculasActualizadas);
        guardarProximoId(proximoId + 1); // Incrementar el próximo ID
        console.log('Pelicula Creada:', peliculaConId.title);
        return {
            success: true,
            pelicula: peliculaConId,
            message: 'Pelicula Creada Exitosamente'
        };
    } catch (error) {
        console.error('Error al crear pelicula:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
};
// ACTUALIZACIÓN de Peliculas Locales.
export const actualizarPeliculaLocal = (id, datosActualizados) => {
    try {
        const peliculas = obtenerPeliculasLocales();
        const indicePelicula = peliculas.findIndex(p => p.id === parseInt(id));
        if (indicePelicula === -1) {
            throw new Error('Pelicula no encontrada');
        }
        // Actualizar los Datos de la Pelicula.
        const peliculaActualizada = {
            id: parseInt(id),
            title: datosActualizados.title.trim(),
            poster: datosActualizados.poster.trim(),
            price: parseInt(datosActualizados.price)
        };
        // Validaciones.
        if (!peliculaActualizada.title) {
            throw new Error('El titulo es obligatorio');
        }
        if (!peliculaActualizada.poster) {
            throw new Error('El poster es obligatorio');
        }
        if (!peliculaActualizada.price || peliculaActualizada.price <= 0) {
            throw new Error('El precio es obligatorio y debe ser mayor a 0');
        }
        // Verificación - Evitar Duplicados de Datos (Peliculas).
        const existeTitulo = peliculas.find(p =>
            p.id !== parseInt(id) &&
            p.title.toLowerCase() === peliculaActualizada.title.toLowerCase()
        );
        if (existeTitulo) {
            throw new Error('Ya existe otra pelicula con ese titulo');
        }
        // Actualizar Peliculas.
        const peliculasActualizadas = [...peliculas];
        peliculasActualizadas[indicePelicula] = peliculaActualizada;
        guardarPeliculasLocales(peliculasActualizadas);
        console.log('Pelicula Actualizada:', peliculaActualizada.title);
        return {
            success: true,
            pelicula: peliculaActualizada,
            message: 'Pelicula Actualizada Exitosamente'
        };
    } catch (error) {
        console.error('Error al actualizar pelicula:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
};
// ELIMINAR Pelicula Local.
export const eliminarPeliculaLocal = (id) => {
    try {
        const peliculas = obtenerPeliculasLocales();
        const pelicula = peliculas.find(p => p.id === parseInt(id));
        if (!pelicula) {
            throw new Error('Pelicula no encontrada');
        }
        // Filtrar la Pelicula a Eliminar.
        const peliculasFiltradas = peliculas.filter(p => p.id !== parseInt(id));
        guardarPeliculasLocales(peliculasFiltradas);
        console.log('Pelicula Eliminada:', pelicula.title);
        return {
            success: true,
            pelicula: pelicula,
            message: 'Pelicula Eliminada Exitosamente'
        };
    } catch (error) {
        console.error('Error al Eliminar Pelicula:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
};
// UTILITY Para Estadísticas del Catalogo.
export const obtenerEstadisticasPeliculas = () => {
    const peliculas = obtenerPeliculasLocales();
    const totalPeliculas = peliculas.length;
    const precioPromedio = peliculas.reduce((sum, p) => sum + p.price, 0) / totalPeliculas
    const precioMin = Math.min(...peliculas.map(p => p.price));
    const precioMax = Math.max(...peliculas.map(p => p.price));
    return {
        total: totalPeliculas,
        precioPromedio: Math.round(precioPromedio),
        precioMin,
        precioMax
    };
};
export default peliculasLocales;