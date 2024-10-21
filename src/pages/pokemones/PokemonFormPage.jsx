import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPokemon, getPokemonById, updatePokemon } from '../../service/pokemonService';
import { getTipos } from '../../service/tipoService';
import { getHabilidades } from '../../service/habilidadService';

const PokemonFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({
        nombre: '',
        nroPokedex: '',
        descripcion: '',
        hp: '',
        attack: '',
        defense: '',
        spattack: '',
        spdefense: '',
        speed: '',
        nivelEvolucion: '',
        idEvPrevia: '',
        idEvSiguiente: '',
        tipos: [],
        habilidades: []
    });

    const [imagen, setImagen] = useState(null);
    const [tipos, setTipos] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiposData = await getTipos();
                const habilidadesData = await getHabilidades();
                setTipos(tiposData);
                setHabilidades(habilidadesData);
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Error cargando tipos o habilidades');
            }
        };

        fetchData();

        if (id) {
            const fetchPokemon = async () => {
                try {
                    const data = await getPokemonById(id);
                    setPokemon({
                        ...data,
                        tipos: data.tipos.map(t => t.id),
                        habilidades: data.habilidades.map(h => h.id)
                    });
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    setError('Error cargando el Pokémon');
                }
            };
            fetchPokemon();
        }
    }, [id]);

    const handleChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        });
    };

    const handleTiposChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setPokemon({
            ...pokemon,
            tipos: selectedOptions
        });
    };

    const handleHabilidadesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setPokemon({
            ...pokemon,
            habilidades: selectedOptions
        });
    };

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pokemon.nombre || !pokemon.nroPokedex || !pokemon.hp || !pokemon.attack || !pokemon.defense) {
            setError("Todos los campos obligatorios deben ser completados.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(pokemon));
            if (imagen) {
                formData.append('imagen', imagen);
            }

            if (id) {
                await updatePokemon(id, formData);
            } else {
                await createPokemon(formData);
            }

            navigate('/pokemoneslist');
        } catch (error) {
            setError('Error al guardar el Pokémon');
            console.error('Error al guardar el Pokémon:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{id ? 'Editar Pokémon' : 'Crear Pokémon'}</h1>

            {error && <p className="alert alert-danger">{error}</p>}

            <form onSubmit={handleSubmit}>

                <div className="row">
                    {/* Nombre */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="form-control"
                            value={pokemon.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Número de Pokedex */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nroPokedex">Número de Pokedex</label>
                        <input
                            type="number"
                            id="nroPokedex"
                            name="nroPokedex"
                            className="form-control"
                            value={pokemon.nroPokedex}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="col-md-12 mb-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            className="form-control"
                            value={pokemon.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Estadísticas */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="hp">HP</label>
                        <input
                            type="number"
                            id="hp"
                            name="hp"
                            className="form-control"
                            value={pokemon.hp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="attack">Ataque</label>
                        <input
                            type="number"
                            id="attack"
                            name="attack"
                            className="form-control"
                            value={pokemon.attack}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="defense">Defensa</label>
                        <input
                            type="number"
                            id="defense"
                            name="defense"
                            className="form-control"
                            value={pokemon.defense}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="spattack">Ataque Especial</label>
                        <input
                            type="number"
                            id="spattack"
                            name="spattack"
                            className="form-control"
                            value={pokemon.spattack}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="spdefense">Defensa Especial</label>
                        <input
                            type="number"
                            id="spdefense"
                            name="spdefense"
                            className="form-control"
                            value={pokemon.spdefense}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="speed">Velocidad</label>
                        <input
                            type="number"
                            id="speed"
                            name="speed"
                            className="form-control"
                            value={pokemon.speed}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Evolución */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nivelEvolucion">Nivel de Evolución</label>
                        <input
                            type="number"
                            id="nivelEvolucion"
                            name="nivelEvolucion"
                            className="form-control"
                            value={pokemon.nivelEvolucion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="idEvPrevia">Pokémon Previo (ID)</label>
                        <input
                            type="number"
                            id="idEvPrevia"
                            name="idEvPrevia"
                            className="form-control"
                            value={pokemon.idEvPrevia}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="idEvSiguiente">Pokémon Siguiente (ID)</label>
                        <input
                            type="number"
                            id="idEvSiguiente"
                            name="idEvSiguiente"
                            className="form-control"
                            value={pokemon.idEvSiguiente}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Tipos */}
                    <div className="col-md-6 mb-3">
                        <label>Tipos</label>
                        <select
                            multiple={true}
                            name="tipos"
                            className="form-control"
                            value={pokemon.tipos}
                            onChange={handleTiposChange}
                            required
                        >
                            {tipos.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Habilidades */}
                    <div className="col-md-6 mb-3">
                        <label>Habilidades</label>
                        <select
                            multiple={true}
                            name="habilidades"
                            className="form-control"
                            value={pokemon.habilidades}
                            onChange={handleHabilidadesChange}
                        >
                            {habilidades.map(habilidad => (
                                <option key={habilidad.id} value={habilidad.id}>
                                    {habilidad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Imagen */}
                    <div className="col-md-12 mb-3">
                        <label>Imagen</label>
                        <input
                            type="file"
                            name="imagen"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Botón para enviar */}
                <button type="submit" className="btn btn-primary">
                    {id ? 'Actualizar' : 'Crear'} Pokémon
                </button>
            </form>
        </div>
    );
};

export default PokemonFormPage;
