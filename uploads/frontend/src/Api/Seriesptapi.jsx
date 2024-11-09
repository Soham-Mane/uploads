import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeriesPointsAPI = ({ seriesId }) => {
  const [pointsData, setPointsData] = useState(null);

  useEffect(() => {
    const fetchSeriesPointsData = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series_points', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: seriesId,
          },
        });

        console.log(response.data); 
        setPointsData(response.data.data);
      } catch (error) {
        console.error('Error fetching series points data:', error);
      }
    };

    if (seriesId) {
      fetchSeriesPointsData();
    }
  }, [seriesId]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Series Points Table</h1>
      {pointsData ? (
        pointsData.map((team, index) => (
          <div key={index} className="flex items-center bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow hover:shadow-lg transition-shadow">
            <img src={team.img} alt={team.teamname} className="w-20 h-20 mr-4" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-600">{team.teamname}</h2>
              <p className="text-gray-700"><strong>Matches:</strong> {team.matches}</p>
              <p className="text-gray-700"><strong>Wins:</strong> {team.wins}</p>
              <p className="text-gray-700"><strong>Losses:</strong> {team.loss}</p>
              <p className="text-gray-700"><strong>Ties:</strong> {team.ties}</p>
              <p className="text-gray-700"><strong>No Result:</strong> {team.nr}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading points table...</p>
      )}
    </div>
  );
};

export default SeriesPointsAPI;
