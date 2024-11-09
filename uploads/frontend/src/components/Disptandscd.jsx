import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Disptandscd = ({ seriesId }) => {
  const [pointsData, setPointsData] = useState(null);
  const [seriesInfo, setSeriesInfo] = useState(null);
  const [matches, setMatches] = useState([]);

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

    const fetchSeriesInfo = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series_info', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: seriesId,
          },
        });

        if (response.data && response.data.data) {
          setSeriesInfo(response.data.data.info);
          setMatches(response.data.data.matchList);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching series info:', error);
      }
    };

    if (seriesId) {
      fetchSeriesPointsData();
      fetchSeriesInfo();
    }
  }, [seriesId]);

  // Create a mapping of team names to their images for quick access
  const teamImages = pointsData 
    ? pointsData.reduce((acc, team) => {
        acc[team.teamname] = team.img;
        return acc;
      }, {}) 
    : {};

  return (
    <div className="mx-auto p-6  rounded-lg shadow-lg">
      {/* Series Points Table */}
      <h1 className="text-3xl font-bold text-center mb-6">Series Points Table</h1>
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

      {/* Series Info */}
      {seriesInfo ? (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-5 ">Match List</h3>
          <div className="grid gap-6">
            {matches.map((match) => (
              <div key={match.id} className="md:border border-[#E3E3E4] rounded-xl p-4">
                <div className="my-6 md:min-h-[18px] md:min-w-[180px] text-[24px] leading-[28px]  font-bold">
                  {new Date(match.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div className="p-4 items-center flex justify-between md:hover:bg-gray-100 rounded-xl transition-colors border md:border-none">
                  <div className="flex items-center text-left">
                    {/* Use the team image from the points data */}
                    
                    <p className="text-sm mx-1 ">{match.name}</p>
                    <p className="text-[10px]  bg-[#f0ddb6] text-[#ce9942] font-medium flex items-center rounded-full ml-1 px-2">
                      {match.matchType}
                    </p>
                  </div>
                  <div className="text-[#019F0B] text-xs font-semibold">
                    {match.status}
                  </div>
                </div>
                <div className="text-left mt-2 ml-3 text-sm font-bold flex items-center ">
                  {new Date(match.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-[10px] text-[#787878]">
                  <span>{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-8">Loading series info...</p>
      )}
    </div>
  );
};

export default Disptandscd;
