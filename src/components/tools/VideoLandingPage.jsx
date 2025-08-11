import React from "react";
import { useTheme } from "../../context/ThemeContext";

const VideoLandingPage = () => {
const { oscuro } = useTheme();

return (
    <div
    className={`relative w-full h-screen ${
        oscuro ? "bg-slate-900" : "bg-white"
    }`}
    >
    {/* Fondo */}
    <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        src="/Short.mp4"
        autoPlay
        loop
        muted
        playsInline
    />
    {/* Overlay */}
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-30 bg-black/60 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Disfruta de la Experiencia
        </h1>
        <p className="text-lg md:text-xl text-white">
            Descubre el Cine Regional
        </p>
    </div>
    </div>
    );
};

export default VideoLandingPage;
