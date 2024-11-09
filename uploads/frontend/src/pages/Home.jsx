import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import SidePanel from '../components/SidePanel.jsx';
import DisplaySchedule from '../components/DisplaySchedule.jsx';
import Home1 from "../components/Home1.jsx";
const Home = () => {
  return (
    <div className="h-full w-full">
      <Head />
      <div>
      <Home1/>
      </div>
      <Foot />
    </div>
  );
}

export default Home;
