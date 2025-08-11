import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import { GuardarItemBoton, CancelarFormBoton } from "../../components/buttons/buttons";
import { crearPeliculaLocal } from "../../services/peliculasLocalesService";

const CreateItem = () => {
    const navigate = useNavigate();
    const { oscuro } = useTheme();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        poster: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        // Limpiar Error del Usuario
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ""}));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "El título es obligatorio";
        }
        if (!formData.price.trim()) {
            newErrors.price = "El precio es obligatorio";
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
            toast.error("Por favor, completa todos los campos correctamente");
            return;
        }
        // Lógica para Crear Pelicula.
        setLoading(true);
            // CRUD - Crear Pelicula.
            try {
            const resultado = crearPeliculaLocal(formData);
                if (resultado.success) {
                    toast.success(resultado.message);
                    console.log('Pelicula Creada:', resultado.pelicula);
                    navigate("/items");
                } else {
                    toast.error(resultado.message);
                    console.error('Error:', resultado.message);
                }
            } catch (error) {
                toast.error("Error al crear la película");
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
    };
    return (
        <div className={`min-h-screen p-8 ${
        oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
                : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
        }`}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Crear Nueva Pelicula</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Titulo. */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Titulo de la Pelicula</label>
                        <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        oscuro  ? 'bg-slate-800 border-slate-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        } ${ errors.title   ? 'border-red-500'
                                            : ''
                        }`}
                        placeholder="Ingresa el título de la película"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>
                    {/* Poster. */}
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
                            placeholder="/img13.jpg"
                        />
                        {errors.poster && (
                            <p className="text-red-500 text-sm mt-1">{errors.poster}</p>
                        )}
                    </div>
                    {/* Precio. */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Precio de la Pelicula</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="100"
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                oscuro  ? 'bg-slate-800 border-slate-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                            } ${errors.price ? 'border-red-500' : ''}`}
                            placeholder="2500"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        )}
                    </div>
                    {/* Botones. */}
                    <div className="flex gap-4">
                        <GuardarItemBoton texto={loading ? "Creando..." : "Crear Película"}/>
                        <CancelarFormBoton onClick={() => navigate('/items')}/>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateItem;