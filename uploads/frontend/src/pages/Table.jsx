import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import DisplayTournament from '../components/DisplayTournament.jsx';
import TrendingNews from '../components/TrendingNews.jsx';
import Articles from '../components/Articles.jsx';
import Topnav from '../components/Topnav.jsx';

const Table = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header Section */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <Topnav />
        <Head />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Tournament Display */}
          <div className="w-full md:w-2/3">
            <div className="w-full">
              <DisplayTournament />
            </div>
          </div>

          {/* Right Side - Trending News & Articles */}
          <div className="w-full md:w-1/3 space-y-6">
            <TrendingNews />
            <Articles />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Foot />
    </div>
  );
}

export default Table;
