import axios from 'axios';

const API_URL = 'http://localhost:3000/api/habilidades';

// Obtener todas las habilidades
export const getHabilidades = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las habilidades:', error);
        throw error;
    }
};

// Obtener una habilidad por ID
export const getHabilidadById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo la habilidad con ID ${id}:`, error);
        throw error;
    }
};

// Crear una nueva habilidad
export const createHabilidad = async (habilidadData) => {
    try {
        const response = await axios.post(API_URL, habilidadData);
        return response.data;
    } catch (error) {
        console.error('Error creando la habilidad:', error);
        throw error;
    }
};

// Actualizar una habilidad existente
export const updateHabilidad = async (id, habilidadData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, habilidadData);
        return response.data;
    } catch (error) {
        console.error(`Error actualizando la habilidad con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar una habilidad
export const deleteHabilidad = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error eliminando la habilidad con ID ${id}:`, error);
        throw error;
    }
};
