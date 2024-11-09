import Crick from '../Api/crick.jsx';
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import DisplaySchedule from '../components/DisplaySchedule.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';
import DisplayBlog from '../components/DisplayBlog.js'
const News = () => {
  return (
    <div className="h-full w-full">
      <Head />
      <div className='min-h-screen flex flex-col px-8'>
      <div className='w-full  h-fit flex flex-col md:flex-row'>
          <div className='md:w-3/4'>
          <div className="container mx-auto p-4">
            <DisplayBlog/>
            </div>
            </div>
            <div className='md:w-1/4'><TrendingNews/><Articles/></div>
            </div>
            </div>
      <Foot />
    </div>
  );
}

export default News;
