/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [oscuro, actualizarOscuro] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const cambiarModo = () => {
    actualizarOscuro(prev => {
      const nuevoTema = !prev;
      localStorage.setItem('theme', nuevoTema ? 'dark' : 'light');
      return nuevoTema;
    });
  };
  return (
    <ThemeContext.Provider value={{ oscuro, cambiarModo }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);