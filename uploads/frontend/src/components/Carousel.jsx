

import { useState, useEffect } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://api.cricapi.com/v1/matches?apikey=b2c13310-df73-4fb7-aff3-c8f046de4acf"
        );
        const data = await response.json();
        setMatches(data.data || []);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  const visibleItems = window.innerWidth < 768 ? 1 : 35; // Number of items to show at a time

  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? matches.length - visibleItems : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === matches.length - visibleItems ? 0 : prevIndex + 1
    );
  };
  function formatMatchName(matchName) {
    const match = matchName.match(/(.+?) vs (.+?), (.+ T20I)/);
    if (match) {
      const team1 = match[1];
      const team2 = match[2];
      const matchNumber = match[3];
      return `${matchNumber} ${team1} vs ${team2}`;
    }
    return matchName;
  }
  function formatMatchName1(matchName) {
    const match = matchName.match(/(.+?) vs (.+?),/); // Match team names before the comma
    if (match) {
      const team1 = match[1];
      const team2 = match[2];
      return `${team1}\n${team2}`; // Return only the team names, separated by a newline
    }
    return matchName; // Return the original name if it doesn't match the expected pattern
  }
  
  
  return (
    <div className="relative w-full flex justify-center items-center mt-8  p-4 shadow-lg overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
      >
        &#8249;
      </button>

      {/* Carousel Items */}
      <div className="w-full overflow-hidden">
        <div
          className=" flex transition-transform duration-100 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 200) / visibleItems}%)`,
            width: `${matches.length * (100 / visibleItems)}%`,
          }}
        >
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex-shrink-0 w-1/3 p-1" // Adjust width to fit items per view
            >
              <div className="flex w-[250px] h-40 " data-matchid={match.id}>
                <div className="bg-white h-full w-full rounded-2xl border border-gray-300 px-4 py-2 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-3">
                <p className="text-xs text-gray-700 font-semibold">
                    {formatMatchName(match.name)}
                  </p>
                  <div className="flex items-center">
                  
                  <p className="rounded-[40px] min-w-[33px] whitespace-nowrap text-[10px] px-2 bg-[#6B63FF] bg-opacity-20 text-[#6B63FF]">{match.matchType}</p>
                  </div>
                </div>
                 
                 <div className="flex border-t">
                  <div className="w-1/2 mt-2">
                  <p className="text-xs text-gray-700 font-semibold">
            {formatMatchName1(match.name).split("\n").map((line, index) => (
              <span key={index}>
                {line}
         
                <br />
              </span>
            ))}
          </p>
                
                  </div>
                <div className="w-1/2">
                  
                  <div className="py-1  border-gray-200 mt-2">
                    {match.status === "Match not started" ? (
                      <p className="text-gray-600 text-sm font-semibold">Match Not Started</p>
                    ) : (
                      <div>
                        {match.score && Array.isArray(match.score) && (
                          <>
                            {match.score[0] && (
                              <div className="flex items-center">
                                <span className="text-[14px] font-bold ml-1">
                                  {match.score[0].r !== undefined ? match.score[0].r : 'N/A'}
                                </span>
                                <span className="text-[14px] font-bold">/{match.score[0].w !== undefined ? match.score[0].w : 'N/A'}</span>
                                <span className="text-[10px] text-[#808080] ml-1">
                                  ({match.score[0].o !== undefined ? match.score[0].o : 'N/A'})
                                </span>
                              </div>
                            )}
                            {match.score[1] && (
                              <div className="flex items-center">
                                <span className="text-[14px] font-bold ml-1">
                                  {match.score[1].r !== undefined ? match.score[1].r : 'N/A'}
                                </span>
                                <span className="text-[14px] font-bold">/{match.score[1].w !== undefined ? match.score[1].w : 'N/A'}</span>
                                <span className="text-[10px] text-[#808080] ml-1">
                                  ({match.score[1].o !== undefined ? match.score[1].o : 'N/A'})
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>   
                </div>
                 </div>
                
              <div className="py-1 border-t border-gray-200 mt-2">
                    {/* <p className="text-gray-600 text-sm font-semibold">
                      Venue
                    </p> */}
                    <p className="text-gray-600 text-xs">
                      {match.status}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {match.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
