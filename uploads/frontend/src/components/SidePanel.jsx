import React from 'react';
import RankingsPage from './Ranking';
import DisplayTournament from './DisplayTournament';

const SidePanel = () => {
  return (
    <div className="space-y-8">
      {/* Trending News */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Trending News</h3>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-5">
              <div className="w-20 h-12 bg-gray-300 rounded-md"></div>
              <div>
                <h4 className="text-sm font-semibold">Lorem Ipsum is simply dummy text of the printing.</h4>
                <p className="text-xs text-gray-500">Oct 15, 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Articles</h3>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-20 h-12 bg-gray-300 rounded-md"></div>
              <div>
                <h4 className="text-sm font-semibold">Lorem Ipsum is simply dummy text of the printing.</h4>
                <p className="text-xs text-gray-500">Oct 15, 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rankings and Tournaments */}
      <div className="mt-8">
        <RankingsPage />
        <DisplayTournament />
      </div>
    </div>
  );
}

export default SidePanel;
