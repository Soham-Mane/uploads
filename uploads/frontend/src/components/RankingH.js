import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerRanking = ({ player, index }) => (
  <div className="grid grid-cols-4 items-center py-2 border-b">
    <div className="col-span-1 flex items-center justify-center">
      <span className="text-lg font-semibold">{index + 1}</span>
      {player.movement && (
        <span
          className={`ml-2 text-xs font-bold ${
            player.movement.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {player.movement}
        </span>
      )}
    </div>
    <div className="col-span-2 flex items-center">
      <div className="ml-3">
        <p className="text-sm font-semibold">{player.playerName}</p>
        <p className="text-xs uppercase text-gray-500">{player.countryName}</p>
      </div>
    </div>
    <div className="col-span-1  flex justify-center font-semibold">{player.ranking}</div>
  </div>
);

const TeamRanking = ({ team, index }) => (
  <div className="grid grid-cols-4 items-center py-2 border-b">
    <div className="col-span-1 flex items-center">
      <span className="text-lg font-semibold">{index + 1}</span>
    </div>
    <div className="col-span-2 flex items-center">
      <div className="ml-3">
        <p className="text-sm font-semibold">{team.playerName}</p>
      </div>
    </div>
    <div className="col-span-1  font-semibold flex ">{team.ranking}</div>
  </div>
);

const RankingTable = ({ format, category }) => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://uploads-backend.onrender.com/rankings/${category}/${format}`
        );
        setRankings(response.data);
      } catch (error) {
        console.error("Failed to fetch rankings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [category, format]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 items-center py-2 font-bold border-b">
        <div className="col-span-1 flex justify-center">Position</div>
        <div className="col-span-2">Player Name</div>
        <div className="col-span-1 flex justify-center">Ranking</div>
      </div>
      {rankings.slice(0, 5).map((player, index) => { // Limit to top 10 players
        if (category === "Teams") {
          return <TeamRanking key={player.position} team={player} index={index} />;
        }
        return <PlayerRanking key={player.position} player={player} index={index} />;
      })}
    </div>
  );
};

const RankingsHPage = () => {
  const [category, setCategory] = useState("Batting");
  const [format, setFormat] = useState("Test");
  const navigate = useNavigate();

  const categories = ["Batting", "Bowling", "All-rounder", "Team"];
  const formats = ["Test", "ODI", "T20"];

  return (
    <div className="max-w-4xl mx-auto mt-8  shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold text-center">
        ICC Cricket Rankings - Men's {category}
      </h1>

      <div className="flex justify-center mt-4 border-b">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`mx-4 py-2 text-sm font-semibold ${
              category === cat
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-4 border-b">
        {formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setFormat(fmt)}
            className={`mx-4 py-2 text-sm font-semibold ${
              format === fmt
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      <RankingTable format={format} category={category} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/ranking")}
          className=" text-black py-2 px-4 rounded-lg "
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default RankingsHPage;
