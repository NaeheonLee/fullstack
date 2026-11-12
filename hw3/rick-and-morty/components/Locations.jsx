import { useState, useEffect } from 'react';

/**
 * Renders a summary list of Rick and Morty locations grouped and counted by type.
 * Fetches all paginated location records from the API upon component mount.
 */
export default function Locations() {
  const [locationTypes, setLocationTypes] = useState({});

  useEffect(() => {
    /**
     * Iteratively fetches all pages from the locations endpoint and tallies each location type.
     */
    const fetchAllLocations = async () => {
      let allLocations = [];
      let nextUrl = 'https://rickandmortyapi.com/api/location';

      // Fetch all pages of locations sequentially until no next page URL remains
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allLocations = [...allLocations, ...data.results];
        nextUrl = data.info.next;
      }

      // Group locations and count occurrences by type, defaulting empty types to 'Unknown'
      const grouped = allLocations.reduce((acc, loc) => {
        const type = loc.type || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      setLocationTypes(grouped);
    };

    fetchAllLocations();
  }, []);

  return (
    <div>
      <h2>Location Counts by Type</h2>
      <ul>
        {Object.entries(locationTypes).map(([type, count]) => (
          <li key={type}>
            <strong>{type}:</strong> {count}
          </li>
        ))}
      </ul>
    </div>
  );
}