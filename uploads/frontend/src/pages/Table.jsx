import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import DisplayTournament from '../components/DisplayTournament.jsx';
import SidePanel from '../components/SidePanel.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';



const Table = () => {
  return (
    <div className="relative w-full h-[500px] max-w-[1200px] mx-auto bg-cover bg-center">
      <Head />
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
      <Foot />
    </div>
  )
}

export default Table
