import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Head from './Head';
import Foot from './Foot';
import SidePanel from './SidePanel';
import SeriesPointsAPI from '../Api/Seriesptapi';
import SquadAPI from '../Api/squadapi';
import SeriesInfo from '../Api/seriinfoapi';
import Disptandscd from './Disptandscd';
import TrendingNews from './TrendingNews';
import Articles from './Articles';

const SeriesDetail = () => {
  const { id } = useParams(); // Get the series id from the URL
  const [activeTab, setActiveTab] = useState('schedule'); // State to toggle between schedule and squad
  const [seriesInfo, setSeriesInfo] = useState(null); // State to store series information

  useEffect(() => {
    const fetchSeriesInfo = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series_info', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            id: id,
          },
        });
        
        if (response.data && response.data.data) {
          setSeriesInfo(response.data.data.info);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching series info:', error);
      }
    };

    if (id) {
      fetchSeriesInfo();
    }
  }, [id]);

  return (
    <div className="relative w-full  max-w-[1140px] mx-auto bg-cover bg-center">
      <Head />

      {/* Series Header */}
      

      <div className="flex flex-col md:flex-row p-4 md:p-10 gap-10">
        <div className="flex-grow w-2/3">
          <div className="max-w-[1000px] mx-auto">
            <div className="p-4">
            <div className="md:min-h-[18px] md:min-w-[180px] flex items-center min-w-[50px] justify-center mt-5 mb-5">
        <span className="custom-border-left mr-3 md:mr-6"></span>
        <h1 className="text-[16px] md:text-2xl">
          {seriesInfo ? seriesInfo.name : 'Loading Series Info...'}
        </h1>
        <span className="custom-border-right ml-3 md:ml-6"></span>
      </div>
      
      {/* Series Dates and Match Info */}
      {seriesInfo && (
        <p className="text-center text-xs md:text-sm">
           • {seriesInfo.startdate} - {seriesInfo.enddate} <br/>
           • {seriesInfo.matches} matches {seriesInfo.t20} T20 {seriesInfo.test} tests {seriesInfo.odi} ODI {seriesInfo.squads} squads
        </p>
      
      )}
              {/* Tab Buttons */}
              <div className="flex justify-center gap-4 mt-4 mb-6">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`font-bold px-5 py-2 rounded-full ${
                    activeTab === 'schedule' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  Schedule and Points
                </button>
                <button
                  onClick={() => setActiveTab('squad')}
                  className={`font-bold px-5 py-2 rounded-full ${
                    activeTab === 'squad' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  Squad
                </button>
              </div>

              {/* Content Based on Active Tab */}
              {activeTab === 'schedule' ? (
                <>
                  <Disptandscd seriesId={id}/>
                </>
              ) : (
                <SquadAPI offset={id} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-1/3">
          <TrendingNews/>
          <Articles/>
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default SeriesDetail;
