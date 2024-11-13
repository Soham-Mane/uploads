import Crick from '../Api/crick.jsx';
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import DisplaySchedule from '../components/DisplaySchedule.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';
import RankingsPage from '../components/Ranking.js';

const RankP = () => {
  return (
    <div className="relative w-full h-[500px] max-w-[1140px] mx-auto bg-cover bg-center">
      <Head />
      <div className='min-h-screen flex flex-col px-8'>
      <div className='w-full  h-fit flex flex-col md:flex-row'>
          <div className='md:w-2/3'>
          <div className="container mx-auto p-4">
            <RankingsPage/>
            </div>
            </div>
            <div className='md:w-1/3'><TrendingNews/><Articles/></div>
            </div>
            </div>
      <Foot />
    </div>
  );
}

export default RankP;
