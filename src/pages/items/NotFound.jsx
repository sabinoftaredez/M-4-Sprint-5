import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { IrAHomeBoton, VerPeliculasBoton } from "../../components/buttons/buttons";

const NotFound = () => {
    const { oscuro } = useTheme();
    const navigate = useNavigate();

    const irAHome = () => {
        navigate("/home");
    };
    const irAItems = () => {
        navigate("/items");
    };
    return (
        <div className={`min-h-screen flex items-center justify-center ${
        oscuro  ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
                : 'bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
        }`}>
            <div className="text-center p-8">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl mb-6">Página no encontrada</h2>
                <p className="mb-8">La Pagina No Existe</p>
                <div className="space-x-4">
                    <IrAHomeBoton onClick={irAHome} />
                    <VerPeliculasBoton onClick={irAItems} />
                </div>
            </div>
        </div>
    )
};
export default NotFound;