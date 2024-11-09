import React, { useEffect, useState } from 'react';

const DisplaySchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(5); // Start in the middle (0-10 days)
  const [selectedMatchType, setSelectedMatchType] = useState('ALL'); // New state for match type
  const daysToShow = 5; // Number of days to show

  // Fetching data from CricAPI
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          'https://api.cricapi.com/v1/cricScore?apikey=b2c13310-df73-4fb7-aff3-c8f046de4acf'
        );
        const data = await response.json();
        setScheduleData(data.data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchSchedule();
  }, []);

  // Generate an array of days from the current date
  const generateCalendarDays = (currentDate) => {
    const days = [];
    for (let i = -daysToShow; i <= daysToShow; i++) {
      const day = new Date(currentDate);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleNext = () => {
    if (selectedIndex < 10) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Filter matches based on the selected date and match type
  const filteredMatches = scheduleData.filter((match) => {
    const matchDate = new Date(match.dateTimeGMT);
    const selectedDate = generateCalendarDays(new Date())[selectedIndex];
    const matchTypeMatches = selectedMatchType === 'ALL' || match.matchType.toUpperCase() === selectedMatchType;
    return matchDate.toDateString() === selectedDate.toDateString() && matchTypeMatches;
  });

  // Convert date to IST
  const convertToIST = (date) => {
    return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      {/* Carousel Buttons */}
      <div className="flex justify-between my-4">
        <button onClick={handlePrev} disabled={selectedIndex === 0} className="px-4 py-2 bg-gray-300 rounded-lg">
          &lt; Previous
        </button>
        <button onClick={handleNext} disabled={selectedIndex === 10} className="px-4 py-2 bg-gray-300 rounded-lg">
          Next &gt;
        </button>
      </div>

      {/* Calendar Bar */}
      <div className="calendar-bar my-4 flex justify-center flex-wrap">
        {generateCalendarDays(new Date()).map((day, index) => (
          <button
            key={index}
            className={`px-3 py-2 mx-1 mb-2 ${selectedIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-lg`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="text-sm font-bold">{day.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
            <div className="text-xs">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
          </button>
        ))}
      </div>

      {/* Match Type Filters */}
      <div className="md: rounded-b-xl py-1">
        <div className="overflow-auto hideScrollbar max-w-full">
          <div className="md:gap-4 gap-2 text-xs md:text-base p-1 flex flex-wrap">
            {['ALL', 'TEST', 'ODI', 'T20'].map((type) => (
              <button
                key={type}
                className={`md:rounded-xl rounded-lg p-2 md:py-1.5 py-2.5 md:px-8 md:border ${selectedMatchType === type ? 'bg-[#3A32D1] text-white' : 'bg-white text-black font-medium'}`}
                onClick={() => setSelectedMatchType(type)}
                data-testid={type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display selected date only once */}
      {filteredMatches.length > 0 && (
        <div className="px-2 py-4 pt-5">
          <div className="md:min-h-[18px] md:min-w-[180px] min-w-[50px] md:text-[24px] leading-[28px]  font-bold flex items-center">
            {convertToIST(new Date(generateCalendarDays(new Date())[selectedIndex])).toDateString()}
            <span className="custom-border-right ml-6"></span>
          </div>
        </div>
      )}

      {/* Match Schedule */}
      <div>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div key={match.id} className=" py-4">
              <div className="col-span-4 md:border border-[#E3E3E4] py-3 rounded-xl">
                <div className=" md:bg-transparent md:rounded-none rounded-xl">
                  <div className="md:hover:bg-gray-100 hover:text-black rounded-xl transition-colors border md:border-none border-[#E3E3E4]">
                    <div className="p-4">
                      <div>
                        <a href={`/series/${match.series}/matches/${match.id}/scorecard`}>
                          <div className="md:grid grid-cols-9">
                            <div className="flex md:block justify-between items-center col-span-3">
                              <p className=" opacity-80 min-h-[20px] text-sm font-medium md:w-[250px]">
                                {match.series}
                              </p>
                              <div className="md:hidden block">
                                <p className="text-[10px] bg-[#f0ddb6] text-[#ce9942] font-medium flex items-center rounded-full ml-1 px-2 whitespace-nowrap">
                                  {match.matchType.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between md:items-start items-center col-span-6 md:grid grid-cols-3">
                              <div className="md:mt-0 mt-2 md:w-[325px] xl:w-[375px] col-span-2">
                                <div className="md:flex items-center md:w-[320px] md:max-w-[320px] text-left">
                                  <div className="flex">
                                    <div className="flex min-w-20 md:min-w-0">
                                      <img
                                        src={match.t1img}
                                        alt={match.t1}
                                        className="w-5 h-5 md:mr-1"
                                      />
                                      <p className="text-sm mx-1">{match.t1}</p>
                                    </div>
                                    <div className="hidden md:block">
                                      <p className="text-xs text-[#787878]">vs</p>
                                    </div>
                                    <div className="flex min-w-20 pl-1 md:min-w-0">
                                      <img
                                        src={match.t2img}
                                        alt={match.t2}
                                        className="w-5 h-5 md:mr-1"
                                      />
                                      <p className="text-sm mx-1">{match.t2}</p>
                                    </div>
                                  </div>
                                  <div className="hidden md:block">
                                    <p className="text-[10px] bg-[#f0ddb6] text-[#ce9942] font-medium flex items-center rounded-full ml-1 px-2 whitespace-nowrap">
                                      {match.matchType.toUpperCase()}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-[#3A32D1] text-xs pt-1 font-semibold hidden md:block">
                                  {match.status}
                                </p>
                              </div>
                              <div className="md:w-max md:mx-auto md:mr-4 md:mt-0 col-span-1 mt-2 md:block hidden">
                                <div className="min-h-5 min-w-full text-sm font-bold flex md:justify-start justify-end md:items-center">
                                  {convertToIST(new Date(match.dateTimeGMT)).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matches scheduled for this date.</p>
        )}
      </div>
    </div>
  );
};

export default DisplaySchedule;
