import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import SeriesAPI from '../components/DisAllSeries.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';

const AddSeries = () => {
  const [seriesName, setSeriesName] = useState('');
  const [overallId, setOverallId] = useState(''); // Changed from offset to overallId
  const [seriesList, setSeriesList] = useState([]);

  const fetchSeries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/overall-series');
      setSeriesList(res.data);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const handleAddSeries = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/overall-series', {
        name: seriesName,
        overallId: overallId, // Changed from offset to overallId
      });
      alert(`Series ${res.data.name} added with overallId ${res.data.overallId}`);
      fetchSeries(); // Refresh the series list after adding
    } catch (error) {
      console.error('Error adding series:', error);
    }
  };

  useEffect(() => {
    fetchSeries(); // Fetch the series when the component mounts
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="px-4 py-2 text-lg font-semibold text-gray-800 border-b border-gray-300">SERIES</h3>
      <div className="space-y-6 mt-4">
        {seriesList.map((series) => (
          <div key={series.overallId} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <Link
                to={`/series/${series.overallId}`}
                className="font-semibold text-blue-600 hover:underline lg:text-base text-sm"
              >
                {series.name}
              </Link>
              <p className="text-gray-500 text-xs mt-1">{series.date}</p>
            </div>
            <div>
              <svg
                width="12"
                height="16"
                viewBox="0 0 9 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-4 text-gray-700"
              >
                <path
                  d="M8.37656 6L2.37656 12L0.976562 10.6L5.55156 6L0.976562 1.4L2.37656 0L8.37656 6Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoSeries = () => {
  return (
    <div className="h-full w-full">
      
      <div className="flex flex-col md:flex-row p-4 md:p-10 gap-10">
        <div className="flex-grow max-w-[1000px] mx-auto">
          <AddSeries />
        </div>
        
      </div>
      
    </div>
  );
};

export default InfoSeries;
