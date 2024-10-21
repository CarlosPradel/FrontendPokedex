import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getEvolucionByPokemonId } from '../../service/evolucionService';

const EvolucionPage = ({ pokemonId }) => {
  const [evoluciones, setEvoluciones] = useState([]);

  useEffect(() => {
    const fetchEvoluciones = async () => {
      try {
        const data = await getEvolucionByPokemonId(pokemonId);
        console.log('Evoluciones obtenidas:', data);
        setEvoluciones(data);
      } catch (error) {
        console.error('Error al obtener evoluciones:', error);
      }
    };

    if (pokemonId) {
      fetchEvoluciones();
    }
  }, [pokemonId]);

  return (
    <div>
      {evoluciones.length > 0 ? (
        <div>
          <h3>Línea Evolutiva</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            {evoluciones.map(evolucion => (
              <div key={evolucion.id} style={{ textAlign: 'center' }}>
                <p>{evolucion.nombre} (Nivel {evolucion.nivelEvolucion})</p>
                {evolucion.imagen_url ? (
                  <img
                    src={`http://localhost:3000${evolucion.imagen_url}`}
                    alt={evolucion.nombre}
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  />
                ) : (
                  <p>Sin imagen</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Este Pokémon no tiene evoluciones.</p>
      )}
    </div>
  );
};


EvolucionPage.propTypes = {
  pokemonId: PropTypes.number.isRequired,
};

export default EvolucionPage;
