// =====================================
// FUNCIONES WATCHLIST
// =====================================
// Guardar Lista.
export function guardarLista(verLista) {
    localStorage.setItem('verLista', JSON.stringify(verLista));
    console.log('✅ Lista guardada en localStorage:', verLista.length, 'películas');
}
// Cargar Lista.
export function cargarLista() {
    const stored = localStorage.getItem('verLista');
    const result = stored ? JSON.parse(stored) : [];
    console.log('📂 Lista cargada desde localStorage:', result.length, 'películas');
    return result;
}

// =====================================
// FUNCIONES CRUD
// =====================================
// Guardar Peliculas.
export function guardarPeliculasLocales(peliculas) {
    localStorage.setItem('peliculasLocales', JSON.stringify(peliculas));
    console.log('✅ Películas guardadas en localStorage:', peliculas.length);
}
// Cargar Peliculas.
export function cargarPeliculasLocales() {
    const stored = localStorage.getItem('peliculasLocales');
    const result = stored ? JSON.parse(stored) : null;
    console.log('📂 Películas cargadas desde localStorage:', result ? result.length : 0);
    return result;
}
// Obtener el Proximo ID.
export function obtenerProximoId() {
    const stored = localStorage.getItem('proximoIdPelcula');
    const proximoId = stored ? parseInt(stored) : 13;
    console.log('Proximo ID:', proximoId);
    return proximoId;
}
// Guardar el Proximo ID.
export function guardarProximoId(id) {
    localStorage.setItem('proximoIdPelcula', id.toString());
    console.log('Proximo ID guardado:', id);
}