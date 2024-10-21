import React, { useState, useEffect } from 'react';
import { getEvoluciones, deleteEvolucion, getEvolucionById, createOrUpdateEvolucion } from '../../service/evolucionService';
import { getPokemones } from '../../service/pokemonService';
import { Table, Button, Spinner, Modal, Form } from 'react-bootstrap';

const EvolucionList = () => {
    const [evoluciones, setEvoluciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvolucion, setSelectedEvolucion] = useState(null);
    const [pokemones, setPokemones] = useState([]);
    const [formData, setFormData] = useState({
        idEvPrevia: '',
        idEvSiguiente: '',
        nivelEvolucion: 1,
        imagen: null,
    });

    useEffect(() => {
        const fetchEvoluciones = async () => {
            try {
                const data = await getEvoluciones();
                setEvoluciones(data);
                setLoading(false);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al obtener las evoluciones');
                setLoading(false);
            }
        };

        fetchEvoluciones();
    }, []);

    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const response = await getPokemones();
                setPokemones(response.pokemones);
            } catch (error) {
                console.error('Error obteniendo los Pokémon:', error);
            }
        };

        fetchPokemones();
    }, []);

    // Eliminar una evolución
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta evolución?');
        if (confirmDelete) {
            try {
                await deleteEvolucion(id);
                setEvoluciones(evoluciones.filter((evolucion) => evolucion.id !== id));
                setMessage('Evolución eliminada correctamente');
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error al eliminar la evolución');
            }
        }
    };

// Abrir el formulario de edición
const handleEdit = async (evolucion) => {
    try {

        const data = await getEvolucionById(evolucion.id);
        setSelectedEvolucion(evolucion);
        setFormData({
            idEvPrevia: data.idEvPrevia || '',
            idEvSiguiente: data.idEvSiguiente || '',
            nivelEvolucion: data.nivelEvolucion,
            imagen: null
        });
        setShowModal(true);
    } catch (error) {
        console.error('Error al cargar la evolución:', error);
    }
};

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = new FormData();
            updatedFormData.append('idEvPrevia', formData.idEvPrevia);
            updatedFormData.append('idEvSiguiente', formData.idEvSiguiente);
            updatedFormData.append('nivelEvolucion', formData.nivelEvolucion);

            if (formData.imagen) {
                updatedFormData.append('imagen', formData.imagen);
            }

            await createOrUpdateEvolucion(selectedEvolucion.pokemonId, selectedEvolucion.id, updatedFormData);
            setMessage('Evolución actualizada correctamente');
            setShowModal(false);
        } catch (error) {
            console.error('Error actualizando la evolución:', error);
            setError('Error al actualizar la evolución');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Evoluciones</h1>

            {/* Mostrar mensaje de éxito o error */}
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando evoluciones...</p>
                </div>
            ) : (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pokemon Origen</th>
                            <th>Pokemon Destino</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evoluciones.length > 0 ? (
                            evoluciones.map((evolucion, index) => (
                                <tr key={evolucion.id}>
                                    <td>{index + 1}</td>
                                    <td>{evolucion.pokemonOrigen ? evolucion.pokemonOrigen.nombre : 'No disponible'}</td>
                                    <td>{evolucion.pokemonDestino ? evolucion.pokemonDestino.nombre : 'No disponible'}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="mr-2"
                                            onClick={() => handleEdit(evolucion)}
                                        >
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(evolucion.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay evoluciones disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal para editar la evolución */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Evolución</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formIdEvPrevia">
                            <Form.Label>Pokémon Previo</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.idEvPrevia}
                                onChange={(e) => setFormData({ ...formData, idEvPrevia: e.target.value })}
                            >
                                <option value="">Ninguno</option>
                                {pokemones.map((pokemon) => (
                                    <option key={pokemon.id} value={pokemon.id}>
                                        {pokemon.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formIdEvSiguiente">
                            <Form.Label>Pokémon Siguiente</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.idEvSiguiente}
                                onChange={(e) => setFormData({ ...formData, idEvSiguiente: e.target.value })}
                            >
                                <option value="">Ninguno</option>
                                {pokemones.map((pokemon) => (
                                    <option key={pokemon.id} value={pokemon.id}>
                                        {pokemon.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formNivelEvolucion">
                            <Form.Label>Nivel de Evolución</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.nivelEvolucion}
                                onChange={(e) => setFormData({ ...formData, nivelEvolucion: e.target.value })}
                                min="1"
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EvolucionList;
