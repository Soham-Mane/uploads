import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeriesAPI = () => {
  const [series, setSeries] = useState([]);

  // Helper function to format date as "Mon dd"
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            offset: 0,
          },
        });
        setSeries(response.data.data || []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Cricket Series</h1>
        {series.length > 0 ? (
          <ul className="space-y-4">
            {series.map((item) => (
              <li
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-[#F5F5F5] hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <strong className="text-lg font-semibold text-black">{item.name}</strong>
                  <span className="text-sm text-gray-500">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-6">
                  <p className="text-sm text-gray-700">ODIs: <span className="font-medium text-[#333333]">{item.odi}</span></p>
                  <p className="text-sm text-gray-700">T20s: <span className="font-medium text-[#333333]">{item.t20}</span></p>
                  <p className="text-sm text-gray-700">Tests: <span className="font-medium text-[#333333]">{item.test}</span></p>
                  <p className="text-sm text-gray-700">Matches: <span className="font-medium text-[#333333]">{item.matches}</span></p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SeriesAPI;
