import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel'
import HomeDisplay from './HomeDisplay';
import Ranking from './Ranking'
import LatestNews from './LatestNews';
import TopStory from './TopStory';
import DisplayTournament from './DisplayTournament';
import DisplayTournamentH from './DisplayTournamentH';
import LatestNews1 from './CricketNews';
import TrendingNews from './TrendingNews';
import Foot from './Foot';
const Home1 = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // State to track visible blog count
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://uploads-backend.onrender.com/api/blogs');
        setBlogs(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

const trendingNewsBlogs=blogs.filter(blog=>blog.category==='Trending News')
const handleBlogClick = (blogId) => {
  // Use the correct path to match with the route defined in App.js
  navigate(`/blog/${blogId}`);
};
  return (
  
    <div className="relative w-full h-[500px] max-w-[1200px] mx-auto bg-cover bg-center">
    {/* Header */}
    
    <div>
    <div className="flex-grow flex flex-col items-center justify-center ">

      
      {/* Carousel Component */}
      <Carousel />
      </div>
      {/* Additional Content */}
    {/* Additional Content */}
    <div className='w-full h-fit flex flex-col md:flex-row'>
          <div className='md:w-3/4 '>
          <HomeDisplay/>
          </div>
          <div className='md:w-1/4'>
          
          <Ranking/>
          <DisplayTournamentH/>
          </div>
      </div>
      <LatestNews1/>

      {/* <div className='w-full h-fit flex flex-col md:flex-row'>
          <div className='md:w-3/4 none'>
          
          </div>
          <div className='md:w-1/4'>
       <Ranking/>
          </div>
      </div>

      <div className='w-full h-fit flex flex-col md:flex-row'>
          <div className='md:w-3/4'>
              <TopStory/>
          </div>
          <div className='md:w-1/4'>
          <DisplayTournament/>
          </div>
      </div> */}

     
    </div>

    {/* Footer */}
    <Foot/>
  </div>
  )
}

export default Home1
