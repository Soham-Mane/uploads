
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRanking = ({ team, index }) => (
  <div className=" grid grid-cols-5 items-center py-2 border-b ">
    <div className= "text-2xl text-purple-600 text-gray-500 font-extrabold ml-2">
      <span>  {index+1}</span>
    

    </div>
    <div className="col-span-3 flex flex-col items-start">
      <p className="text-base font-semibold">{team.playerName}</p>
      <p className="text-sm text-gray-500">{team.countryName}</p>
    </div>
    <div className="text-lg text-gray-500 font-semibold text-center ">{team.ranking}</div>
  </div>
)

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
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div>
      <div className=" grid grid-cols-3 items-center py-1 font-semibold border-b">
        <span className="text-left text-base text-gray-500">Rank</span>
        <div className="text-left text-base text-gray-500">Player</div>
        <div className="text-center text-base text-gray-500">Rating</div>
      </div>
      {rankings.slice(0, 5).map((team, index) => (
        <TeamRanking key={team.position} team={team} index={index} />
      ))}
    </div>
  );
};

const RankingsPage = () => {
  const [category, setCategory] = useState("Team");
  const [format, setFormat] = useState("T20");
  const navigate = useNavigate();

  const categories = ["Team", "Batting", "Bowling", "All-rounder"];
  const formats = ["T20", "ODI", "Test"];

  return (
    <div className="max-w-4xl mx-auto  p-3  shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
      <span role="img" aria-label="smiling with stars in eyes">
  🤩
</span>
        <span className="ml-2">TOP RANKINGS</span>
      </h1>
<div className="flex justify-center mb-2">
  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
    {formats.map((fmt, idx) => (
      <button
        key={fmt}
        onClick={() => setFormat(fmt)}
        className={`px-2 py-1 text-sm font-medium transition-colors duration-300 ${
          format === fmt
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600"
        } ${
          idx === 0 ? "rounded-l-full" : idx === formats.length - 1 ? "rounded-r-full" : ""
        }`}
      >
        {fmt}
      </button>
    ))}
  </div>
</div>

      <div className="flex justify-center gap-2 mb-2 border-b">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`py-2 px-2 text-sm font-semibold ${
              category === cat
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <RankingTable format={format} category={category} />

      <div className="flex justify-center mt-2">
        <button
          onClick={() => navigate("/ranking")}
          className="text-blue-600 font-medium px-2 py-2 rounded-lg hover:bg-blue-100"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default RankingsPage;
