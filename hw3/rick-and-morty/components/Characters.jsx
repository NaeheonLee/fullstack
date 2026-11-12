import { useState, useEffect } from 'react';

/**
 * Renders a grid of the first 100 characters from the Rick and Morty API.
 * Fetches data concurrently from multiple API pages on mount.
 */
export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    /**
     * Fetches the first 5 pages of characters and updates the state.
     */
    const fetch100Characters = async () => {

      // Fetch pages 1 through 5 concurrently to get 100 characters
      const urls = Array.from({ length: 5 }, (_, i) => `https://rickandmortyapi.com/api/character?page=${i + 1}`);
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));
      
      // Flatten the paginated results into a single character array
      const allCharacters = data.flatMap((page) => page.results);
      setCharacters(allCharacters);
    };

    fetch100Characters();
  }, []);

  return (
    <div>
      <h2>First 100 Characters</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {characters.map((char) => (
          <div key={char.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={char.image} alt={char.name} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{char.name}</h3>
            <p><strong>Species:</strong> {char.species}</p>
            <p><strong>Status:</strong> {char.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}