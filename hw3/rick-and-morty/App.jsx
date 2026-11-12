import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Characters from './components/Characters.jsx';
import Species from './components/Species.jsx';
import Locations from './components/Locations.jsx';

/**
 * Main application component that configures routing for the Rick and Morty app.
 * Provides a global navigation bar and maps specific URL paths to their respective page components.
 */
export default function App() {

  // Return the router layout containing the persistent navigation bar and dynamic route paths
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', gap: '1rem' }}>
        <Link to="/home" style={{ color: 'white' }}>Home</Link>
        <Link to="/characters" style={{ color: 'white' }}>Characters</Link>
        <Link to="/species" style={{ color: 'white' }}>Species</Link>
        <Link to="/locations" style={{ color: 'white' }}>Locations</Link>
      </nav>
      
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </Router>
  );
}