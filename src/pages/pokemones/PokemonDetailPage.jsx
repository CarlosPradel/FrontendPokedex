import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById } from '../../service/pokemonService';
import EvolucionPage from './EvolucionPage';
import './PokemonDetailPage.css'; // Asegúrate de tener este archivo para estilos personalizados.

const PokemonDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook para navegar a la Pokedex
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemonById(id);
                setPokemon(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener Pokémon:", error);
                setError("No se pudo cargar el Pokémon. Inténtalo más tarde.");
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [id]);

    if (loading) {
        return <div className="loading text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="error text-center">{error}</div>;
    }

    if (!pokemon) {
        return <div className="text-center">No se encontró el Pokémon.</div>;
    }

    // Manejo de URLs de imágenes
    const imageUrl = pokemon.imagen_url
        ? `http://localhost:3000${pokemon.imagen_url}`
        : '/default-image.png';

    const handleGoToPokedex = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5 pokemon-detail-page">
            <div className="row justify-content-center text-center">
                <div className="col-md-4">
                    <h1 className="pokemon-title">{pokemon.nombre} N.º {pokemon.nroPokedex}</h1>
                    <img src={imageUrl} alt={pokemon.nombre} className="pokemon-image img-fluid mb-3" />
                </div>
                <div className="col-md-6">
                    <p className="pokemon-description">{pokemon.descripcion}</p>

                    {/* Tipos del Pokémon */}
                    <div className="pokemon-types mb-3">
                        <h4>Tipo:</h4>
                        {pokemon.tipos?.length > 0 ? (
                            pokemon.tipos.map(tipo => (
                                <span key={tipo.id} className={`badge badge-pill badge-primary mx-1`}>
                                    {tipo.nombre}
                                </span>
                            ))
                        ) : (
                            <p>No hay tipos disponibles</p>
                        )}
                    </div>

                    {/* Habilidades del Pokémon */}
                    <div className="pokemon-habilidades mb-3">
                        <h4>Habilidad:</h4>
                        {pokemon.habilidades?.length > 0 ? (
                            pokemon.habilidades.map(habilidad => (
                                <span key={habilidad.id} className="badge badge-pill badge-info mx-1">
                                    {habilidad.nombre}
                                </span>
                            ))
                        ) : (
                            <p>No hay habilidades disponibles</p>
                        )}
                    </div>

                    {/* Estadísticas base del Pokémon */}
                    <div className="pokemon-stats mb-3">
                        <h4>Puntos de base:</h4>
                        <table className="table table-striped">
                            <tbody>
                                <tr><td><strong>HP:</strong></td><td>{pokemon.hp}</td></tr>
                                <tr><td><strong>Ataque:</strong></td><td>{pokemon.attack}</td></tr>
                                <tr><td><strong>Defensa:</strong></td><td>{pokemon.defense}</td></tr>
                                <tr><td><strong>Ataque Especial:</strong></td><td>{pokemon.spattack}</td></tr>
                                <tr><td><strong>Defensa Especial:</strong></td><td>{pokemon.spdefense}</td></tr>
                                <tr><td><strong>Velocidad:</strong></td><td>{pokemon.speed}</td></tr>
                                <tr><td><strong>Nivel de Evolución:</strong></td><td>{pokemon.nivelEvolucion}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Línea Evolutiva */}
                    <div className="pokemon-evolutions mt-4">
                        <h4>Línea Evolutiva:</h4>
                        <EvolucionPage pokemonId={pokemon.id} />
                    </div>

                    {/* Botón para ir a la Pokédex */}
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={handleGoToPokedex}>
                            Ir a la Pokédex
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailPage;
