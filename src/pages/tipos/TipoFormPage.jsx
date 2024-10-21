import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTipo, getTipoById, updateTipo } from '../../service/tipoService';

const TipoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (id) {
            const fetchTipo = async () => {
                try {
                    const data = await getTipoById(id);
                    setTipo(data);
                } catch (error) {
                    console.error('Error al cargar el tipo:', error);
                }
            };
            fetchTipo();
        }
    }, [id]);

    const handleChange = (e) => {
        setTipo({
            ...tipo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateTipo(id, tipo);
            } else {
                await createTipo(tipo);
            }
            navigate('/tipos');
        } catch (error) {
            console.error('Error al guardar el tipo:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{id ? 'Editar Tipo' : 'Crear Tipo'}</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Tipo</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={tipo.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {id ? 'Actualizar' : 'Crear'} Tipo
                </button>
            </form>
        </div>
    );
};

export default TipoFormPage;
