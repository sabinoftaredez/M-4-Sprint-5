import React from "react";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage.jsx";
import Layout from "./components/Layout.jsx";
import ItemDetail from "./pages/items/ItemDetail.jsx";
import CreateItem from "./pages/items/CreateItem.jsx";
import EditItem from "./pages/items/EditItem.jsx";
import NotFound from "./pages/items/NotFound.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { TMDbProvider } from "./context/TMDbContext.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente interno que tiene acceso al ThemeContext
const AppContent = () => {
  const { oscuro } = useTheme();
  /*
  const { mostrarLanding } = useMovies();
*/

  return (
    // React-Router.
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Ruta. */}
        <Route path="/" element={<LandingPage />} />
        {/* CRUD - Ruta. */}
        <Route path="/items" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<ItemDetail />} />
          <Route path="create" element={<CreateItem />} />
          <Route path=":id/edit" element={<EditItem />} />
        </Route>
        {/* 404 - Ruta. */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={oscuro ? "dark" : "light"}
        toastClassName={
          oscuro
            ? "!bg-slate-800 !text-gray-200 !border !border-blue-600/30"
            : "!bg-white !text-gray-800 !border !border-sky-300"
        }
        progressClassName={
          oscuro
            ? "!bg-gradient-to-r !from-blue-600 !to-yellow-500"
            : "!bg-gradient-to-r !from-sky-500 !to-yellow-400"
        }
      />
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TMDbProvider>
        <WatchlistProvider>
          <MoviesProvider>
            <AppContent />
          </MoviesProvider>
        </WatchlistProvider>
      </TMDbProvider>
    </ThemeProvider>
  );
}
export default App;
