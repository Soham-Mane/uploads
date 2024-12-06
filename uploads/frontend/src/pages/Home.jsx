import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import DisplaySchedule from '../components/DisplaySchedule.jsx';
import Home1 from "../components/Home1.jsx";
import Topnav from '../components/Topnav.jsx';
const Home = () => {
  return (
    <div className="h-full w-full">
  <div className='relative w-full  max-w-[1140px] mx-auto bg-cover bg-center'>
    <Topnav/>
      <Head />
      </div>
      <div>
      <Home1/>
      </div>
   
    </div>
  );
}

export default Home;
