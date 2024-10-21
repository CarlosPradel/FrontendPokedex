import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/pokemones/HomePage.jsx';
import PokemonDetailPage from './pages/pokemones/PokemonDetailPage.jsx';
import PokemonFormPage from './pages/pokemones/PokemonFormPage.jsx';
import ListTipoPage from './pages/tipos/ListTipoPage.jsx';
import TipoFormPage from './pages/tipos/TipoFormPage.jsx';
import ListHabilidadPage from './pages/habilidades/ListHabilidadPage.jsx';
import HabilidadFormPage from './pages/habilidades/HabilidadFormPage.jsx';
import './index.css';
import EvolucionForm from './pages/pokemones/EvolucionForm.jsx';
import PokemonList from './pages/pokemones/PokemonList.jsx';
import EvolucionList from './pages/pokemones/EvolucionList.jsx';

// Crear el root en la aplicación
const root = createRoot(document.getElementById('root'));

// Definir las rutas de la aplicación usando Router y Routes de react-router-dom
root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Página principal que lista todos los Pokémon */}
        <Route path="/" element={<HomePage />} />

        <Route path="/pokemoneslist" element={<PokemonList />} />

        {/* Página de detalle de un Pokémon, mostrando su información y evoluciones */}
        <Route path="/pokemones/:id" element={<PokemonDetailPage />} />

        {/* Página para crear un nuevo Pokémon */}
        <Route path="/pokemones/crear" element={<PokemonFormPage />} />

        {/* Página para editar un Pokémon existente */}
        <Route path="/pokemones/editar/:id" element={<PokemonFormPage />} />

        {/* Página para listar todos los tipos */}
        <Route path="/tipos" element={<ListTipoPage />} />

        {/* Página para crear un nuevo tipo */}
        <Route path="/tipos/crear" element={<TipoFormPage />} />

        {/* Página para editar un tipo existente */}
        <Route path="/tipos/editar/:id" element={<TipoFormPage />} />

        {/* Página para listar todas las habilidades */}
        <Route path="/habilidades" element={<ListHabilidadPage />} />

        {/* Página para crear una nueva habilidad */}
        <Route path="/habilidades/crear" element={<HabilidadFormPage />} />

        {/* Página para editar una habilidad existente */}
        <Route path="/habilidades/editar/:id" element={<HabilidadFormPage />} />

        <Route path="/pokemones/:pokemonId/evoluciones/crear" element={<EvolucionForm />} />

        {/* Lista de Evoluciones */}
        <Route path="/evoluciones" element={<EvolucionList />} />

        {/* Editar Evolucion Página */}
        <Route path="/pokemones/:pokemonId/evoluciones/editar/:id" element={<EvolucionForm />} />

      </Routes>
    </Router>
  </StrictMode>
);
