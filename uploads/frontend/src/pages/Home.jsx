import React from 'react';
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import DisplaySchedule from '../components/DisplaySchedule.jsx';
import Home1 from "../components/Home1.jsx";
import Topnav from '../components/Topnav.jsx';
const Home = () => {
  return (
    <div className="h-full w-full flex flex-col">
    {/* Header Section */}
    <div className="sticky top-0 z-50 w-full ">
      <Topnav />
      <Head />
    </div>

    {/* Main Content */}
    <div className="flex-grow">
      <Home1 />
    </div>

    {/* Footer Section */}
    <Foot />
  </div>
  );
}

export default Home;

