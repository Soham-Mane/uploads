import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScorecardAPI = ({ offsetIds }) => {
  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {
    const fetchScorecardData = async () => {
      try {
        const allScorecards = await Promise.all(
          offsetIds.map(async (offset) => {
            const response = await axios.get('https://api.cricapi.com/v1/match_scorecard', {
              params: {
                apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
                id: offset, // Using each offset to fetch scorecard data
              },
            });

            if (response && response.data && response.data.data) {
              return response.data.data; // Assuming `response.data.data` holds the scorecard information
            } else {
              console.error('Invalid data returned from the scorecard API for offset:', offset);
              return null;
            }
          })
        );

        setScorecards(allScorecards.filter(scorecard => scorecard !== null)); // Store valid scorecards
      } catch (error) {
        console.error('Error fetching scorecard data:', error);
      }
    };

    if (offsetIds.length > 0) {
      fetchScorecardData();
    }
  }, [offsetIds]);

  return (
    <div>
      <h1>Match Scorecards</h1>
      {scorecards.length > 0 ? (
        scorecards.map((scorecardData, index) => (
          <div key={index}>
            <h2>{scorecardData.name}</h2>
            <p><strong>Status:</strong> {scorecardData.status}</p>
            <p><strong>Venue:</strong> {scorecardData.venue}</p>
            <p><strong>Date:</strong> {new Date(scorecardData.date).toLocaleDateString()}</p>

            {/* Score Display */}
            {scorecardData.score.map((inning, idx) => (
              <div key={idx}>
                <h3>{inning.inning}</h3>
                <p><strong>Runs:</strong> {inning.r}</p>
                <p><strong>Wickets:</strong> {inning.w}</p>
                <p><strong>Overs:</strong> {inning.o}</p>
              </div>
            ))}

            {/* Batting Scorecard */}
            <h3>Batting</h3>
            {scorecardData.scorecard[0] && scorecardData.scorecard[0].batting ? (
              scorecardData.scorecard[0].batting.map((batsman, idx) => (
                <div key={idx}>
                  <p><strong>{batsman.batsman.name}</strong></p>
                  <p><strong>Runs:</strong> {batsman.r}, <strong>Balls:</strong> {batsman.b}</p>
                  <p><strong>4s:</strong> {batsman['4s']}, <strong>6s:</strong> {batsman['6s']}</p>
                  <p><strong>Dismissal:</strong> {batsman.dismissal} ({batsman['dismissal-text']})</p>
                </div>
              ))
            ) : (
              <p>No batting data available.</p>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>Loading scorecard information...</p>
      )}
    </div>
  );
};

export default ScorecardAPI;
