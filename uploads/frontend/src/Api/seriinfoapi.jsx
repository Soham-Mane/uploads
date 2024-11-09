import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeriesInfo = ({ seriesId }) => {
  const [seriesInfo, setSeriesInfo] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    console.log('Fetching series info for ID:', seriesId);
    const fetchSeriesInfo = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series_info', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: seriesId,
          }
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
      fetchSeriesInfo();
    }
  }, [seriesId]);

  return (
    <div className="mx-2 lg:mx-3 md:pt-3">
      {seriesInfo ? (
        <div>
          <h3 className="text-2xl font-bold mb-5">Match List</h3>
          <div className="grid gap-6">
            {matches.map((match) => (
              <div key={match.id} className="md:border border-[#E3E3E4] rounded-xl p-4">
                <div className="my-6 md:min-h-[18px] md:min-w-[180px] text-[24px] leading-[28px] text-[#000000] font-bold">
                  {new Date(match.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div className="p-4 items-center flex justify-between md:hover:bg-gray-100 rounded-xl transition-colors border md:border-none">
                  <div className="flex items-center text-left">
                    <img src={match.teamAImage} alt={match.teamA} className="w-5 h-5 mr-1" />
                    <p className="text-sm mx-1">{match.teamA}</p>
                    <p className="mx-1 text-xs text-[#787878]">vs</p>
                    <img src={match.teamBImage} alt={match.teamB} className="w-5 h-5 mx-1" />
                    <p className="text-sm mx-1">{match.teamB}</p>
                    <p className="text-[10px] bg-[#f0ddb6] text-[#ce9942] font-medium flex items-center rounded-full ml-1 px-2">
                      T20
                    </p>
                  </div>
                  <div className="text-[#019F0B] text-xs font-semibold">
                    {match.status}
                  </div>
                </div>
                <div className="text-left mt-2 ml-3 text-sm font-bold flex items-center">
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
        <p>Loading series info...</p>
      )}
    </div>
  );
};

export default SeriesInfo;
