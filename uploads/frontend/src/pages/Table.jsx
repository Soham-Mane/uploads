import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import DisplayTournament from '../components/DisplayTournament.jsx';
import SidePanel from '../components/SidePanel.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';

import Topnav from '../components/Topnav.jsx';

const Table = () => {
  return (
    <div className="h-full w-full flex flex-col">
    {/* Header Section */}
    <div className="sticky top-0 z-50 w-full  ">
      <Topnav />
      <Head />
    </div>
    <div className=" w-full  max-w-[1140px] mx-auto bg-cover bg-center">
     
      <div className="flex flex-col md:flex-row p-4 md:p-10 gap-10">
        <div className="flex-grow md:w-2/3">
          <div className="max-w-[1000px] mx-auto">
            <DisplayTournament/>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/3">
          <TrendingNews/>
          <Articles/>
        </div>
      </div>
      
    </div>
    <Foot />
    </div>
  )
}

export default Table
