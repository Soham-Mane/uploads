import React, { useEffect, useState } from 'react';

const Teammates = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://api.cricapi.com/v1/players?apikey=b5f0e764-4719-4d92-a87c-ff96e5bce7db';

    // Fetch the player data
    const fetchPlayers = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'success') {
          setPlayers(data.data);
        } else {
          setError('Failed to fetch players');
        }
      } catch (error) {
        setError('Error fetching players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Render loading, error, or player list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Teammates</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} - {player.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teammates;
