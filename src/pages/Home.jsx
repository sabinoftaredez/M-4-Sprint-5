import React from 'react';
import Movielist from '../components/Movielist';
import WatchlistModal from '../components/modals/WatchlistModal';
import FilterModal from '../components/modals/FilterModal';
import { useTheme } from '../context/ThemeContext';
import { useMovies } from '../context/MoviesContext';

const Home = () => {
  const { oscuro } = useTheme();
  const { mostrarModal, mostrarCarrito, setMostrarModal, setMostrarCarrito } = useMovies();
  return (
    <div
      className={ oscuro
          ? 'min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-gray-200'
          : 'min-h-screen bg-gradient-to-br from-sky-200 via-white to-sky-100 text-gray-700'
      }
    >
      <Movielist />
      {/* Modales.*/}
      {mostrarModal && (<FilterModal onClose={() => setMostrarModal(false)} />)}
      {mostrarCarrito && (<WatchlistModal onClose={() => setMostrarCarrito(false)} />)}
    </div>
  );
};
export default Home;