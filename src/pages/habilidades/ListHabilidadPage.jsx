import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHabilidades, deleteHabilidad } from '../../service/habilidadService';
import { Table, Button } from 'react-bootstrap';

const ListHabilidadPage = () => {
    const [habilidades, setHabilidades] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Obtener la lista de habilidades
    useEffect(() => {
        const fetchHabilidades = async () => {
            try {
                const data = await getHabilidades();
                setHabilidades(data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al obtener las habilidades');
            }
        };

        fetchHabilidades();
    }, []);

    // Manejar la eliminación de una habilidad
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta habilidad?");
        if (confirmDelete) {
            try {
                await deleteHabilidad(id);
                setHabilidades(habilidades.filter(habilidad => habilidad.id !== id));
                setMessage('Habilidad eliminada con éxito');
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al eliminar la habilidad');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Listado de Habilidades</h1>
                <Link to="/habilidades/crear" className="btn btn-primary">
                    Crear Nueva Habilidad
                </Link>
            </div>

            {/* Mostrar mensajes de éxito o error */}
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Tabla de habilidades */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habilidades.length > 0 ? (
                        habilidades.map((habilidad, index) => (
                            <tr key={habilidad.id}>
                                <td>{index + 1}</td>
                                <td>{habilidad.nombre}</td>
                                <td>
                                    <Link to={`/habilidades/editar/${habilidad.id}`} className="btn btn-warning btn-sm mr-2">
                                        Editar
                                    </Link>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(habilidad.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No hay habilidades disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ListHabilidadPage;
