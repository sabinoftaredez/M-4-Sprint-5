/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { guardarLista, cargarLista } from '../utils/localStorage';

// Crear el Context
const WatchlistContext = createContext();

// Provider Component - LA CAJA CENTRAL
export const WatchlistProvider = ({ children }) => {
  const [verLista, setVerLista] = useState(() => cargarLista());

  useEffect(() => {
    guardarLista(verLista);
  }, [verLista]);

  const alquilarPelicula = pelicula => {
    setVerLista(prev => {
      const peliculaExistente = prev.find(p => p.id === pelicula.id);
      if (peliculaExistente) {
        return prev.map(p => p.id === pelicula.id ? { ...p, cantidad: p.cantidad + 1 } : p );
      } else {
        return [...prev, { ...pelicula, cantidad: 1 }];
      }
    });
  };

  const removerPelicula = id => {
    setVerLista(prev => {
      return prev.map(p => {
          if (p.id === id) {
            if (p.cantidad > 1) {
              return { ...p, cantidad: p.cantidad - 1 };
            }
            return null;
          }
          return p;
        })
        .filter(p => p !== null && p.cantidad > 0);
    });
  };

  const removerPeliculas = () => {
    setVerLista([]);
  };

  const calcularTotal = () => {
    const subtotal = verLista.reduce((total, pelicula) => {
      return total + pelicula.price * pelicula.cantidad;
    }, 0);
    const cantidad = verLista.reduce((count, p) => count + p.cantidad, 0);
    return { subtotal, cantidad, total: subtotal };
  };

  // 📤 EXPORT lo que otros componentes necesitan
  const value = { verLista, alquilarPelicula, removerPelicula, removerPeliculas, calcularTotal };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Hook personalizado para usar el Context
export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error(
      'useWatchlistContext debe usarse dentro de WatchlistProvider'
    );
  }
  return context;
};
