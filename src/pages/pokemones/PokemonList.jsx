import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemones, deletePokemon } from '../../service/pokemonService';
import './PokemonList.css';

const PokemonList = () => {
    const [pokemones, setPokemones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const data = await getPokemones();
                setPokemones(data.pokemones);
            } catch (error) {
                setError("Error al obtener los Pokémon.");
                console.error(error);
            }
        };

        fetchPokemones();
    }, []);

    const handleEdit = (id) => {
        navigate(`/pokemones/editar/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await deletePokemon(id);
            setPokemones(pokemones.filter(pokemon => pokemon.id !== id));
        } catch (error) {
            setError("Error al eliminar el Pokémon.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Listado de Pokémon</h1>

            {error && <p className="alert alert-danger">{error}</p>}

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Tipo(s)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemones.map((pokemon, index) => (
                        <tr key={pokemon.id}>
                            <td>{index + 1}</td>
                            <td>{pokemon.nombre}</td>
                            <td>{pokemon.tipos.map(tipo => tipo.nombre).join(', ')}</td>
                            <td>
                                <button
                                    className="btn btn-warning mr-2"
                                    onClick={() => handleEdit(pokemon.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(pokemon.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PokemonList;
