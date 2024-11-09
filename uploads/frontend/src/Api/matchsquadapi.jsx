import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SquadAPI = ({ offset }) => {
  const [squadData, setSquadData] = useState(null);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/match_squad', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: offset, // Using the offset prop to fetch squad data for that specific series
          },
        });

        setSquadData(response.data.data); // Assuming `response.data.data` holds the squad information
      } catch (error) {
        console.error('Error fetching squad data:', error);
      }
    };

    if (offset) {
      fetchSquadData();
    }
  }, [offset]); // Re-fetch the squad data when the offset changes

  return (
    <div>
      <h1>Squad Information</h1>
      {squadData ? (
        squadData.map((team, index) => (
          <div key={index}>
            <h2>{team.teamName} ({team.shortname})</h2>
            <img src={team.img} alt={`${team.teamName} logo`} width="48" />
            <h3>Players</h3>
            <ul>
              {team.players.map((player) => (
                <li key={player.id}>
                  <img src={player.playerImg} alt={player.name} width="48" /> 
                  <strong>{player.name}</strong> - {player.role}
                  <p>Batting Style: {player.battingStyle}</p>
                  <p>Bowling Style: {player.bowlingStyle}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading squad information...</p>
      )}
    </div>
  );
};

export default SquadAPI;
 