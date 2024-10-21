import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tipos';

// Obtener todos los tipos
export const getTipos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo los tipos:', error);
        throw error;
    }
};

// Obtener un tipo por ID
export const getTipoById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo el tipo con ID ${id}:`, error);
        throw error;
    }
};

// Crear un nuevo tipo
export const createTipo = async (tipoData) => {
    try {
        const response = await axios.post(API_URL, tipoData);
        return response.data;
    } catch (error) {
        console.error('Error creando el tipo:', error);
        throw error;
    }
};

// Actualizar un tipo existente
export const updateTipo = async (id, tipoData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, tipoData);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando el tipo con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un tipo
export const deleteTipo = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error eliminando el tipo con ID ${id}:`, error);
        throw error;
    }
};
