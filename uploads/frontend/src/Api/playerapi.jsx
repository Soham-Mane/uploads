import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerAPI = () => {
  const [players, setPlayers] = useState([]); // State to hold multiple player data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          'https://api.cricapi.com/v1/players_info?apikey=b5f0e764-4719-4d92-a87c-ff96e5bce7db'
        );
        
        // Log the entire response to inspect its structure
        console.log(response.data);

        // Check if the API call was successful
        if (response.data.status === 'success') {
          setPlayers(response.data.data); // Set players data if available
        } else {
          setError('Failed to fetch player details');
        }
      } catch (err) {
        console.error(err); // Log any error from the request
        setError('Error fetching player details');
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Player Details</h1>
      {players.length > 0 ? (
        <div>
          {players.map(player => (
            <div key={player.id} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
              <img src={player.playerImg} alt={player.name} style={{ width: '150px', height: '150px' }} />
              <h2>{player.name}</h2>
              <p>Date of Birth: {new Date(player.dateOfBirth).toLocaleDateString()}</p>
              <p>Role: {player.role}</p>
              <p>Batting Style: {player.battingStyle}</p>
              <p>Country: {player.country}</p>

              <h3>Stats:</h3>
              <ul>
                {player.stats.map((stat, index) => (
                  <li key={index}>
                    <strong>{stat.matchtype.toUpperCase()}</strong> - {stat.fn}: {stat.stat} = {stat.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No player data found</p>
      )}
    </div>
  );
};

export default PlayerAPI;
