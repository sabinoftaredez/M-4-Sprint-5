import React from "react";
import VideoLandingPage from "../components/tools/VideoLandingPage";
import CarruselSection from "../components/Sections/CarruselSection";
import FooterSection from "../components/Sections/FooterSection";
import HamburgerMenu from "../components/buttons/HamburgerMenu";
import { useMovies } from "../context/MoviesContext";

const LandingPage = () => {
  const { obtenerPeliculasVista } = useMovies();

  return (
    <div className="scroll-smooth">
      {/* Video. */}
      <section className="h-screen scroll-snap-align-start">
        <VideoLandingPage />
        <HamburgerMenu />
      </section>
      {/* Carruseles. */}
      <section className="h-[50vh] scroll-snap-align-start">
        <CarruselSection
          titulo="Populares"
          peliculas={obtenerPeliculasVista.slice(0, 8)}
        />
      </section>
      <section className="h-[50vh] scroll-snap-align-start">
        <CarruselSection
          titulo="Estrenos"
          peliculas={obtenerPeliculasVista.slice(0, 8)}
        />
      </section>
      {/* Footer. */}
      <section className="h-[30vh] scroll-snap-align-start">
        <FooterSection />
      </section>
    </div>
  );
};

export default LandingPage;
