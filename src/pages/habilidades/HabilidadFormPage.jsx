import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createHabilidad, getHabilidadById, updateHabilidad } from '../../service/habilidadService';

const HabilidadFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [habilidad, setHabilidad] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (id) {
            const fetchHabilidad = async () => {
                const data = await getHabilidadById(id);
                setHabilidad(data);
            };
            fetchHabilidad();
        }
    }, [id]);

    const handleChange = (e) => {
        setHabilidad({
            ...habilidad,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateHabilidad(id, habilidad);
            } else {
                await createHabilidad(habilidad);
            }
            navigate('/habilidades');
        } catch (error) {
            console.error('Error al guardar la habilidad:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Habilidad' : 'Crear Habilidad'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Habilidad</label>
                    <input
                        type="text"
                        name="nombre"
                        value={habilidad.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Crear'} Habilidad</button>
            </form>
        </div>
    );
};

export default HabilidadFormPage;
