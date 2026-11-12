import { useState, useEffect } from 'react';

/**
 * Renders a categorized list of the first 100 characters grouped by species.
 * Displays the character count and individual names for each species category.
 */
export default function Species() {
  const [speciesData, setSpeciesData] = useState({});

  useEffect(() => {
    /**
     * Fetches the first 5 pages of characters and groups their names by species.
     */
    const fetchSpecies = async () => {
      // Fetch pages 1 through 5 concurrently to retrieve the first 100 characters
      const urls = Array.from({ length: 5 }, (_, i) => `https://rickandmortyapi.com/api/character?page=${i + 1}`);
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      // Flatten the paginated responses into a single list of characters
      const allCharacters = data.flatMap((page) => page.results);

      // Group character names into arrays keyed by their species
      const grouped = allCharacters.reduce((acc, char) => {
        if (!acc[char.species]) {
          acc[char.species] = [];
        }

        acc[char.species].push(char.name);
        return acc;
      }, {});

      setSpeciesData(grouped);
    };

    fetchSpecies();
  }, []);

  return (
    <div>
      <h2>Characters by Species</h2>
      {Object.entries(speciesData).map(([species, names]) => (
        <div key={species} style={{ marginBottom: '2rem' }}>
          <h3>{species} ({names.length})</h3>
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}