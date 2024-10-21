import React, { useState, useEffect } from 'react';
import { getPokemones } from '../../service/pokemonService';
import PokemonCard from '../../components/PokemonCard';
import './HomePage.css';

const HomePage = () => {
    const [pokemones, setPokemones] = useState([]);  // Todos los Pokémon
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchPokemones = async () => {
        setLoading(true);
        try {
            const data = await getPokemones();
            setPokemones(data.pokemones);
            setFilteredPokemones(data.pokemones);
        } catch (error) {
            console.error('Error al obtener los pokemones:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemones();
    }, []);

    // Función para manejar la búsqueda en tiempo real
    const searchPokemon = (keyword) => {
        if (keyword) {
            const filtered = pokemones.filter((pokemon) =>
                // Filtrar por nombre o número de Pokédex
                pokemon.nombre.toLowerCase().includes(keyword.toLowerCase()) ||
                pokemon.nroPokedex.toString().includes(keyword)
            );
            setFilteredPokemones(filtered); // Actualiza la lista filtrada

            // Si no hay resultados, muestra el mensaje de no encontrado
            if (filtered.length === 0) {
                setNoResults(true);
            } else {
                setNoResults(false);
            }
        } else {
            setFilteredPokemones(pokemones); // Si no hay búsqueda, muestra todos
            setNoResults(false);
        }
    };

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchTerm(keyword);
        searchPokemon(keyword);
    };

    return (
        <div className="pokedex-container container mt-4">
            <h1 className="mb-4 text-center pokedex-title">Pokédex</h1>

            {/* Input de búsqueda */}
            <div className="search-container mb-4 text-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o número"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ display: 'inline-block', width: '300px' }}
                />
            </div>

            {/* Mostrar estado de carga */}
            {loading && (
                <div className="text-center">
                    <h3>Cargando...</h3>
                </div>
            )}

            {/* Mostrar mensaje si no hay resultados */}
            {!loading && noResults && (
                <div className="text-center">
                    <h3>Pokémon no encontrado</h3>
                </div>
            )}

            {/* Lista de Pokémon filtrados */}
            {!noResults && !loading && filteredPokemones.length > 0 && (
                <div className="row pokedex-grid">
                    {filteredPokemones.map((pokemon) => (
                        <div className="col-md-4 mb-4" key={pokemon.id}>
                            <PokemonCard pokemon={pokemon} />
                            <h5 className="text-center">{pokemon.nombre}</h5> {/* Mostrar el nombre del Pokémon */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;