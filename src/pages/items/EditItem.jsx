import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { obtenerPeliculaPorId, actualizarPeliculaLocal } from "../../services/peliculasLocalesService";
import { toast } from "react-toastify";
import { GuardarItemBoton, CancelarFormBoton } from "../../components/buttons/buttons";


const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { oscuro } = useTheme();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        poster: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        // Cargar Datos de la Pelicula.
        const cargarPelicula = async () => {
            try {
                const pelicula = await obtenerPeliculaPorId(id);
                if (pelicula) {
                    setFormData({
                        title: pelicula.title,
                        price: pelicula.price.toString(),
                        poster: pelicula.poster
                });
                } else {
                    toast.error("Pelicula no encontrada");
                    navigate("/items");
                }
            } catch (error) {
                toast.error("Error al cargar la película");
                console.error('Error:', error);
                navigate("/items");
            } finally {
                setLoading(false);
            }
        };
        cargarPelicula();
    }, [id, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        // Error del Usuario.
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ""}));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "El título es obligatorio";
        }
        if (!formData.price.trim() || formData.price <= 0) {
            newErrors.price = "El precio es obligatorio y debe ser un número positivo";
        }
        if (!formData.poster.trim()) {
            newErrors.poster = "La URL del poster es obligatoria";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
        toast.error("Por favor, corrige los errores en el formulario");
        return;
        }
    // Lógica para Actualizar Pelicula.
    setSaving(true);
        // CRUD - Actualizar Pelicula.
        try {
            const resultado = actualizarPeliculaLocal(id, formData);
            if (resultado.success) {
                toast.success(resultado.message);
                console.log('Pelicula Actualizada:', resultado.pelicula);
                navigate(`/items/${id}`);
            } else {
                toast.error(resultado.message);
                console.error('Error:', resultado.message);
            }
        } catch (error) {
            toast.error("Error al actualizar la película");
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
            oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-white'
                    : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
            }`}>
                <div className="text-xl">Cargando...</div>
            </div>
        );
    };
    return (
        <div className={`min-h-screen p-8 ${
            oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
                    : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
        }`}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Editar Película</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div>
                    <label className="block text-sm font-medium mb-2">Título de la Película</label>
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    oscuro  ? 'bg-slate-800 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    } ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>
                {/* Poster */}
                <div>
                    <label className="block text-sm font-medium mb-2">URL del Poster</label>
                    <input
                    type="text"
                    name="poster"
                    value={formData.poster}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    oscuro  ? 'bg-slate-800 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    } ${errors.poster ? 'border-red-500' : ''}`}
                    />
                    {errors.poster && (
                        <p className="text-red-500 text-sm mt-1">{errors.poster}</p>
                    )}
                </div>
                {/* Precio */}
                <div>
                    <label className="block text-sm font-medium mb-2">Precio</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="100"
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    oscuro  ? 'bg-slate-800 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    } ${errors.price ? 'border-red-500' : ''}`}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                    )}
                </div>
                {/* Botones */}
                <div className="flex gap-4">
                    <GuardarItemBoton texto={saving ? "Actualizando..." : "Actualizar Película"}/>
                    <CancelarFormBoton onClick={() => navigate(`/items/${id}`)}/>
                </div>
                </form>
            </div>
        </div>
    )
};
export default EditItem;