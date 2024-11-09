import Playerapi from '../Api/playerapi.jsx';
import Head from '../components/Head.jsx';
import Foot from '../components/Foot.jsx';
import Teammates from '../Api/teammates.jsx';
import ParentComponent from '../components/Parentmatch.jsx';


const Player = () => {
  return (
    <div className="h-full w-full ">
    <Head/>
    
    <Foot/>
   </div>
  )
}

export default Player