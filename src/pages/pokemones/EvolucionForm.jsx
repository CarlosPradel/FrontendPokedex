import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createOrUpdateEvolucion, getEvolucionByPokemonId } from '../../service/evolucionService';
import { getPokemones } from '../../service/pokemonService';

const EvolucionForm = () => {
  const { pokemonId, evolucionId } = useParams();
  const [idEvPrevia, setIdEvPrevia] = useState('');
  const [idEvSiguiente, setIdEvSiguiente] = useState('');
  const [nivelEvolucion, setNivelEvolucion] = useState(1);
  const [imagen, setImagen] = useState(null);
  const [pokemones, setPokemones] = useState([]);

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


  useEffect(() => {
    const fetchEvolucion = async () => {
      if (evolucionId) {
        try {
          const evolucion = await getEvolucionByPokemonId(pokemonId, evolucionId);
          setIdEvPrevia(evolucion.idEvPrevia || '');
          setIdEvSiguiente(evolucion.idEvSiguiente || '');
          setNivelEvolucion(evolucion.nivelEvolucion);
        } catch (error) {
          console.error('Error al cargar la evolución:', error);
        }
      }
    };
    fetchEvolucion();
  }, [evolucionId, pokemonId]);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('idEvPrevia', idEvPrevia || null);
    formData.append('idEvSiguiente', idEvSiguiente || null);
    formData.append('nivelEvolucion', nivelEvolucion);

    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {

      await createOrUpdateEvolucion(pokemonId, evolucionId, formData);
      alert('Evolución creada/actualizada correctamente');
    } catch (error) {
      console.error('Error creando/actualizando la evolución:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{evolucionId ? 'Editar Evolución' : 'Crear Evolución'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Pokémon Previo */}
          <div className="col-md-6 mb-3">
            <label htmlFor="idEvPrevia" className="form-label">Pokémon Previo (Opcional)</label>
            <select
              id="idEvPrevia"
              className="form-control"
              value={idEvPrevia}
              onChange={(e) => setIdEvPrevia(e.target.value)}
            >
              <option value="">Ninguno</option>
              {pokemones.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Pokémon Siguiente */}
          <div className="col-md-6 mb-3">
            <label htmlFor="idEvSiguiente" className="form-label">Pokémon Siguiente (Opcional)</label>
            <select
            id="idEvSiguiente"
            className="form-control"
            value={idEvSiguiente}
              onChange={(e) => setIdEvSiguiente(e.target.value)}
            >
              <option value="">Ninguno</option>
              {pokemones.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Nivel de Evolución */}
          <div className="col-md-6 mb-3">
            <label htmlFor="nivelEvolucion" className="form-label">Nivel de Evolución</label>
            <input
              type="number"
              id="nivelEvolucion"
              className="form-control"
              value={nivelEvolucion}
              onChange={(e) => setNivelEvolucion(e.target.value)}
              min="1"
            />
          </div>

          {/* Imagen */}
          <div className="col-md-12 mb-3">
            <label htmlFor="imagen" className="form-label">Imagen de la Evolución</label>
            <input
              type="file"
              id="imagen"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Botón Guardar */}
        <button type="submit" className="btn btn-primary">Guardar Evolución</button>
      </form>
    </div>
  );
};

export default EvolucionForm;
