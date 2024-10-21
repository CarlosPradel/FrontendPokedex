import React from 'react';
import PropTypes from 'prop-types';
import './StatsTable.css';

const StatsTable = ({ stats }) => {
    return (
        <div className="stats-table">
            <h3>Estadísticas Base</h3>
            <ul>
                {Object.keys(stats).map((stat) => (
                    <li key={stat}>
                        {stat}: {stats[stat]}
                    </li>
                ))}
            </ul>
        </div>
    );
};


StatsTable.propTypes = {
    stats: PropTypes.shape({
        hp: PropTypes.number.isRequired,
        attack: PropTypes.number.isRequired,
        defense: PropTypes.number.isRequired,
        spattack: PropTypes.number.isRequired,
        spdefense: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired,
    }).isRequired
};

export default StatsTable;
