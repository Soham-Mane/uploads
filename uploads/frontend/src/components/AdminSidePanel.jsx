import React, { useState } from 'react';
import CsvUpload from './Dummy';
import BlogForm from './BlogEditor';
import AddOverallSeries from './AddOverallSeries';
import AddSeries from './Addsquad';
import AddTournament from './AddTournament';

const AdminSidePanel = () => {
  const [activeComponent, setActiveComponent] = useState('ranking');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ranking':
        return <CsvUpload />;
      case 'createBlog':
        return <BlogForm />;
      case 'addOverallSeries':
        return <AddOverallSeries />;
      // case 'addSquad':
      //   return <AddSeries />;
      case 'addTournament':
        return <AddTournament />;
      default:
        return <CsvUpload />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-64 bg-gradient-to-b from-purple-600 to-indigo-600 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-3 rounded-lg text-lg transition duration-300 ${
              activeComponent === 'ranking' ? 'bg-white text-purple-600' : 'hover:bg-purple-700'
            }`}
            onClick={() => setActiveComponent('ranking')}
          >
            Ranking
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg text-lg transition duration-300 ${
              activeComponent === 'createBlog' ? 'bg-white text-purple-600' : 'hover:bg-purple-700'
            }`}
            onClick={() => setActiveComponent('createBlog')}
          >
            Create Blog
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg text-lg transition duration-300 ${
              activeComponent === 'addOverallSeries' ? 'bg-white text-purple-600' : 'hover:bg-purple-700'
            }`}
            onClick={() => setActiveComponent('addOverallSeries')}
          >
            Add Overall Series
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg text-lg transition duration-300 ${
              activeComponent === 'addSquad' ? 'bg-white text-purple-600' : 'hover:bg-purple-700'
            }`}
            onClick={() => setActiveComponent('addSquad')}
          >
            Add Squad
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg text-lg transition duration-300 ${
              activeComponent === 'addTournament' ? 'bg-white text-purple-600' : 'hover:bg-purple-700'
            }`}
            onClick={() => setActiveComponent('addTournament')}
          >
            Add Tournament
          </li>
        </ul>
      </div>
      <div className="flex-grow p-8 bg-white shadow-inner rounded-lg md:ml-6 mt-6 md:mt-0">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminSidePanel;
