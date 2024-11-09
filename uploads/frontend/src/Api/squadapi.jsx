import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SquadAPI = ({ offset }) => {
  const [squadData, setSquadData] = useState(null);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series_squad', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: offset,
          },
        });

        setSquadData(response.data.data);
      } catch (error) {
        console.error('Error fetching squad data:', error);
      }
    };

    if (offset) {
      fetchSquadData();
    }
  }, [offset]);

  return (
    <div className="px-5 md:py-8 py-4">
      <h1 className="text-center text-2xl font-bold mb-6">Squad Information</h1>
      {squadData ? (
        squadData.map((team, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="custom-border-left mr-3 md:mr-6"></span>
              <h2 className="text-[16px] md:text-2xl font-bold">
                {team.teamName} ({team.shortname})
              </h2>
              <span className="custom-border-right ml-3 md:ml-6"></span>
            </div>
            <img
              src={team.img === 'https://h.cricapi.com/img/icon512.png' ? '' : team.img}
              alt={`${team.teamName} logo`}
              className="w-12 h-12 mx-auto md:mx-0 mb-4"
            />
            <h3 className="text-lg font-bold text-center md:text-start">Players</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.players.map((player) => (
                <div
                  key={player.id}
                  className="px-4 py-2 border rounded-lg flex items-center gap-4"
                >
                  <img
                    src={player.playerImg === 'https://h.cricapi.com/img/icon512.png' ? '' : "S"}
                    alt={player.name}
                    className="rounded-full bg-[#c6c6c6] font-semibold text-white h-[38px] w-[38px] md:h-[60px] md:w-[60px]"
                  />
                  <div>
                    <p className="font-bold text-xs md:text-[14px]">{player.name}</p>
                    <p className="text-[#929292] text-[12px]">{player.role}</p>
                    <p className="text-[12px]">Batting Style: {player.battingStyle}</p>
                    <p className="text-[12px]">Bowling Style: {player.bowlingStyle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading squad information...</p>
      )}
    </div>
  );
};

export default SquadAPI;
