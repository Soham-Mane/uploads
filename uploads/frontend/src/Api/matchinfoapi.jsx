import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchInfoAPI = ({ offsetIds }) => {
  const [matchInfos, setMatchInfos] = useState([]);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const allMatchInfo = await Promise.all(
          offsetIds.map(async (offset) => {
            const response = await axios.get('https://api.cricapi.com/v1/match_info', {
              params: {
                apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
                id: offset, // Using the offset prop to fetch match data for that specific match
              },
            });
            return response.data.data; // Assuming `response.data.data` holds the match info
          })
        );

        setMatchInfos(allMatchInfo); // Store all fetched match info data
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    if (offsetIds.length > 0) {
      fetchMatchInfo();
    }
  }, [offsetIds]);

  return (
    <div>
      <h1>Match Info for Multiple Matches</h1>
      {matchInfos.length > 0 ? (
        matchInfos.map((matchInfo, index) => (
          <div key={index}>
            <h2>{matchInfo.name}</h2>
            <p>Match Type: {matchInfo.matchType}</p>
            <p>Status: {matchInfo.status}</p>
            <p>Venue: {matchInfo.venue}</p>
            <p>Date: {matchInfo.date}</p>
            <p>Toss: {matchInfo.tossWinner} won the toss and chose to {matchInfo.tossChoice}</p>

            <h3>Teams</h3>
            <ul>
              {matchInfo.teams.map((team, idx) => (
                <li key={idx}>{team}</li>
              ))}
            </ul>

            <h3>Score</h3>
            {matchInfo.score && (
              <p>{matchInfo.score[0].inning}: {matchInfo.score[0].r}/{matchInfo.score[0].w} in {matchInfo.score[0].o} overs</p>
            )}

            <h3>Team Info</h3>
            <ul>
              {matchInfo.teamInfo.map((team) => (
                <li key={team.shortname}>
                  <img src={team.img} alt={team.name} width="48" /> {team.name} ({team.shortname})
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading match info...</p>
      )}
    </div>
  );
};

export default MatchInfoAPI;
