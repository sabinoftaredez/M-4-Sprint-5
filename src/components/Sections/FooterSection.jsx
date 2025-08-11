import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { RedesBoton } from "../buttons/buttons";

const FooterSection = () => {
  const { oscuro } = useTheme();
  const redes = ["facebook", "instagram", "twitter-x", "whatsapp"];

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center px-6 py-8 ${
        oscuro
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          : "bg-gradient-to-br from-gray-100 via-white to-sky-200"
      }`}
    >
      {/* Logo/Titulo. */}
      <h2
        className={`text-3xl font-bold mb-4 ${
          oscuro ? "text-white" : "text-gray-800"
        }`}
      >
        🎥 Cine Argentino
      </h2>
      {/* Descripcion. */}
      <p
        className={`text-base text-center max-w-lg mb-6 ${
          oscuro ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Descubre lo Mejor de Nosotros.
      </p>
      {/* Redes. */}
      <div
        className={`flex gap-4 mb-6 ${
          oscuro ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {redes.map((red) => (
          <RedesBoton key={red} red={red} href="#" />
        ))}
      </div>
      {/* Copyright */}
      <p className={`text-xs ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
        © 2025 Cine Argentino. Todos los derechos reservados by SFTA Coorp.
      </p>
    </div>
  );
};
export default FooterSection;
