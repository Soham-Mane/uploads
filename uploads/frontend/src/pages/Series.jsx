import React, { useState } from 'react';
import SeriesApi from '../components/DisAllSeries.jsx';
import InfoSeries from './InfoSeries.jsx'; // Import InfoSeries component
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';

const Series = () => {
  const [showAllSeries, setShowAllSeries] = useState(true); // State to track which component to display

  return (
    <div className="h-full w-full">
      <Head />
      <div className="flex flex-col md:flex-row p-4 md:p-10 gap-10">
        <div className="flex-grow">
          <div className="max-w-[1000px] mx-auto">
            {/* Buttons to toggle between All Series and Series Info */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setShowAllSeries(true)}
                className={`px-4 py-2 font-semibold rounded ${
                  showAllSeries ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                All Series
              </button>
              <button
                onClick={() => setShowAllSeries(false)}
                className={`px-4 py-2 font-semibold rounded ${
                  !showAllSeries ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Series Info
              </button>
            </div>

            {/* Conditionally render SeriesApi or InfoSeries based on selected button */}
            {showAllSeries ? <SeriesApi /> : <InfoSeries />}
            
            <div className="pb-5"></div>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-full md:w-1/4">
          <TrendingNews />
          <Articles />
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default Series;
