import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { obtenerPeliculasLocales, eliminarPeliculaLocal } from "../../services/peliculasLocalesService";
import { EditarItemBoton, VolverListaBoton, CrearItemBoton, EliminarItemBoton } from "../../components/buttons/buttons";
import { toast } from "react-toastify";

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { oscuro } = useTheme();
    const pelicula = obtenerPeliculasLocales().find((item) => item.id === parseInt(id));

    // Eliminar Pelicula - SIN PAGINA PROPIA (RECOMENDADO POR AI).
    const handleEliminar = () => {
        try {
            const resultado = eliminarPeliculaLocal(pelicula.id);
            if (resultado.success) {
                toast.success(resultado.message);
                navigate('/items');
            } else {
                toast.error(resultado.message);
            }
        } catch (error) {
            console.error("Error al eliminar la película:", error);
            toast.error("Error al eliminar la película");
        }
    };
    // Verificación de existencia de la pelicula.
    if (!pelicula) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
            oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
                    : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
            }`}>
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Pelicula no encontrada</h2>
                    <VolverListaBoton onClick={() => navigate('/items')} />
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-8 ${
            oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
                    : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
            }`}>
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Imagen. */}
                    <div>
                        <img
                        src={pelicula.poster}
                        alt={pelicula.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    {/* Información. */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold">{pelicula.title}</h1>
                        <p className="text-2xl font-semibold">Precio: ${pelicula.price}</p>
                    {/* Botones. */}
                    <div className="space-y-4">
                        <EditarItemBoton onClick={() => navigate(`/items/${id}/edit`)} />
                        <VolverListaBoton onClick={() => navigate('/items')} />
                        <CrearItemBoton onClick={() => navigate('/items/create')} />
                        <EliminarItemBoton onClick={handleEliminar} />
                    </div>
                    </div>
                    </div>
                </div>
        </div>
    )
}
export default ItemDetail;