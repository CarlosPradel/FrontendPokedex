import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTipos, deleteTipo } from '../../service/tipoService';
import { Spinner, Button, Table } from 'react-bootstrap';
const ListTipoPage = () => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para mostrar el spinner de carga
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // Estado para mostrar mensajes de éxito o error

    // Obtener la lista de tipos
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const data = await getTipos();
                setTipos(data);
                setLoading(false); // Finaliza la carga
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al obtener los tipos');
                setLoading(false); // Finaliza la carga incluso si hubo un error
            }
        };

        fetchTipos();
    }, []);

    // Confirmar eliminación y manejar la acción
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este tipo?");
        if (confirmDelete) {
            try {
                await deleteTipo(id);
                setTipos(tipos.filter(tipo => tipo.id !== id)); // Eliminar tipo de la lista localmente
                setMessage('Tipo eliminado con éxito'); // Mensaje de éxito
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al eliminar el tipo');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Listado de Tipos</h1>
                <Link to="/tipos/crear" className="btn btn-primary">
                    Crear Nuevo Tipo
                </Link>
            </div>

            {/* Mostrar spinner mientras cargan los datos */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando tipos...</p>
                </div>
            ) : (
                <>
                    {/* Mostrar mensaje de éxito o error */}
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <Table bordered hover>
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.length > 0 ? (
                                tipos.map((tipo, index) => (
                                    <tr key={tipo.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{tipo.nombre}</td>
                                        <td>
                                            <Link
                                                to={`/tipos/editar/${tipo.id}`}
                                                className="btn btn-warning btn-sm mr-2"
                                            >
                                                Editar
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(tipo.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No hay tipos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default ListTipoPage;
