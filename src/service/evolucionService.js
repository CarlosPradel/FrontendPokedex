import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Obtener evolución por el ID del Pokémon
export const getEvolucionByPokemonId = async (pokemonId) => {
    if (!pokemonId) {
        throw new Error('El ID del Pokémon es necesario para obtener sus evoluciones.');
    }

    try {
        const response = await axios.get(`${API_URL}/pokemones/${pokemonId}/evoluciones`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo la evolución del Pokémon con ID ${pokemonId}:`, error);
        throw new Error('No se pudo obtener la evolución.');
    }
};

// Crear o actualizar una evolución
export const createOrUpdateEvolucion = async (pokemonId, evolucionId, formData) => {
    if (!pokemonId) {
        throw new Error('El ID del Pokémon es necesario para crear o actualizar la evolución.');
    }

    try {
        let response;
        if (evolucionId) {
            // Actualización de evolución existente
            response = await axios.put(`${API_URL}/pokemones/${pokemonId}/evoluciones/${evolucionId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } else {
            // Creación de nueva evolución
            response = await axios.post(`${API_URL}/pokemones/${pokemonId}/evoluciones`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return response.data;
    } catch (error) {
        console.error('Error creando o actualizando la evolución:', error);
        throw new Error('No se pudo crear o actualizar la evolución.');
    }
};

// Eliminar una evolución por ID
export const deleteEvolucion = async (evolucionId) => {
    if (!evolucionId) {
        throw new Error('El ID de la evolución es necesario para eliminar.');
    }

    try {
        const response = await axios.delete(`${API_URL}/evoluciones/${evolucionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error eliminando la evolución con ID ${evolucionId}:`, error);
        throw new Error('No se pudo eliminar la evolución.');
    }
};

// Obtener todas las evoluciones
export const getEvoluciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/evoluciones`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo todas las evoluciones:', error);
        throw new Error('No se pudo obtener las evoluciones.');
    }
};


// Actualizar una evolución existente
export const updateEvolucion = async (pokemonId, evolucionId, formData) => {
    try {
        const response = await axios.put(`${API_URL}/pokemones/${pokemonId}/evoluciones/${evolucionId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error actualizando la evolución:', error);
        throw error;
    }
};

// Obtener una evolución por su ID
export const getEvolucionById = async (evolucionId) => {
    if (!evolucionId) {
        throw new Error('El ID de la evolución es necesario.');
    }

    try {
        const response = await axios.get(`${API_URL}/evoluciones/${evolucionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo la evolución con ID ${evolucionId}:`, error);
        throw new Error('No se pudo obtener la evolución.');
    }
};
