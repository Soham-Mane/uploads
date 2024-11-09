import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerAPI = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          'https://api.cricapi.com/v1/matches?apikey=b5f0e764-4719-4d92-a87c-ff96e5bce7db'
        );
        if (response.data.status === 'success') {
          setMatches(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Upcoming Matches</h1>
      {matches.length > 0 ? (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              <h2>{match.name}</h2>
              <p>Match Type: {match.matchType}</p>
              <p>Status: {match.status}</p>
              <p>Venue: {match.venue}</p>
              <p>Date: {new Date(match.dateTimeGMT).toLocaleString()}</p>
              <div>
                <h3>Teams:</h3>
                <ul>
                  {match.teamInfo && match.teamInfo.length > 0 ? (
                    match.teamInfo.map(team => (
                      <li key={team.name}>
                        <img src={team.img} alt={team.name} />
                        <p>{team.name} ({team.shortname})</p>
                      </li>
                    ))
                  ) : (
                    <p>No team info available</p>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default PlayerAPI;
