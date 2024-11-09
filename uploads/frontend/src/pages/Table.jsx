import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import DisplayTournament from '../components/DisplayTournament.jsx';
import SidePanel from '../components/SidePanel.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';



const Table = () => {
  return (
    <div className="h-full w-full">
      <Head />
      <div className="flex flex-col md:flex-row p-4 md:p-10 gap-10">
        <div className="flex-grow">
          <div className="max-w-[1000px] mx-auto">
            <DisplayTournament/>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-1/4">
          <TrendingNews/>
          <Articles/>
        </div>
      </div>
      <Foot />
    </div>
  )
}

export default Table