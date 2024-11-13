import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrendingNews from './TrendingNews';
import Articles from './Articles';
import Head from './Head';
import Foot from './Foot';
import IPL2025 from './IPL2025';
import rohit from '../images/rohit';
import Hero from './Hero';
const NewsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // State to track visible blog count
  const navigate = useNavigate(); // Use useNavigate hook for navigation

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

// const trendingNewsBlogs=blogs.filter(blog=>blog.category==='Trending News')
const articleBlogs=blogs.filter(blog=>blog.category==='Articles')

  const handleBlogClick = (blogId) => {
    // Use the correct path to match with the route defined in App.js
    navigate(`/blog/${blogId}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Increase the count by 4 each time
  };

  return (
   
      <div className="relative w-full h-[500px] max-w-[1140px] mx-auto bg-cover bg-center">
      <Head />
      <Hero/>
    <div className=" container mx-auto  px-4 py-2">
     
      {/* Latest News Section */}
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:p-10">
        {/* Latest News */}
        <div className="col-span-2 md:p-10">
        <div className='flex flex-row items-center justify-center gap-4 p-4'>
            <h2 className='text-4xl font-bold'>Latest News</h2>
            {/* BLACK LINE */}
            <div className="flex-1 border-t border-gray-400 "
            style={{
                borderTop: '2px solid', 
                borderImage: 'linear-gradient(to right, #000, #aaa) 1'
            }}
            
            
            ></div>
            </div>
          <div className="space-y-2">
            {/* News Card */}
            {blogs.slice(0, visibleCount).map((blog) => ( // Show only the visible count of blogs
              <div
                className="w-full h-full rounded-lg flex space-x-4"
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="w-1/2 md:w-1/3 md:h-56 p-4 ">
                  {blog.imagePath && (
                    <img
                      src={`https://uploads-backend.onrender.com/${blog.imagePath}`}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-lg" // Make the image responsive
                    />
                  )}
                </div>
                <div className='w-2/3'>
                  <p className="text-sm ">{blog.category}</p>
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className=" text-lg">
                    {blog.description}
                  </p>
                  <p className=" text-xs mt-2">Rahul Mishra
                  <br/>
                    {`${new Date(blog.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })} • ${new Date(blog.createdAt).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Load More Button */}
          {visibleCount < blogs.length && ( // Only show button if there are more blogs
            <div className="mt-8 text-center">
              <button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md shadow-md"
                onClick={handleLoadMore} // Load more on click
              >
                Load More Posts
              </button>
            </div>
          )}
        </div>

        {/* Trending News and Articles */}
        <div className="space-y-8">
          {/* Trending News */}
     
  <TrendingNews/>
          {/* Articles */}
 
          <Articles/>
        </div>
      </div>
      <IPL2025/>
    </div>
    {/* <Foot /> */}
    </div>
    
  );
};

export default NewsSection;

// import React from 'react';

// const App = () => {
//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen p-20">
//       {/* Main Content Container */}
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Latest News Section */}
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold mb-4">Latest News</h2>
//           <div className="space-y-4">
//             {[...Array(4)].map((_, index) => (
//               <NewsCard key={index} />
//             ))}
//           </div>
//           <button className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">Load More Posts</button>
//         </div>

//         {/* Sidebar Section */}
//         <div className="space-y-8">
//           <TrendingNews />
//           <Articles />
//         </div>
//       </div>
//     </div>
//   );
// };

// // NewsCard Component
// const NewsCard = () => (
//   <div className="bg-white rounded-lg shadow p-4 flex">
//     <img src="https://via.placeholder.com/150" alt="news-thumbnail" className="w-60 h-40 rounded-lg object-cover mr-4" />
//     <div>
//       <p className="text-sm text-gray-600 mb-1">IPL 2025</p>
//       <h3 className="text-lg font-bold">Lorem Ipsum is simply dummy text of the printing.</h3>
//       <p className="text-sm text-gray-600 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//       <p className="text-xs text-gray-500 mt-1">Rahul Mishra • Oct 15, 2024</p>
//     </div>
//   </div>
// );

// // TrendingNews Component
// const TrendingNews = () => (
//   <div className="bg-white rounded-lg shadow p-4">
//     <h3 className="text-xl font-bold mb-4">Trending News</h3>
//     <div className="space-y-4">
//       {[...Array(4)].map((_, index) => (
//         <TrendingCard key={index} />
//       ))}
//     </div>
//   </div>
// );

// const TrendingCard = () => (
//   <div className="flex items-center">
//     <img src="https://via.placeholder.com/60" alt="trending-thumbnail" className="w-16 h-16 rounded-lg object-cover mr-4" />
//     <div>
//       <h4 className="text-sm font-semibold">Lorem Ipsum is simply dummy text of the printing.</h4>
//       <p className="text-xs text-gray-500">Oct 15, 2024</p>
//     </div>
//   </div>
// );

// // Articles Component
// const Articles = () => (
//   <div className="bg-white rounded-lg shadow p-4">
//     <h3 className="text-xl font-bold mb-4">Articles</h3>
//     <div className="space-y-4">
//       {[...Array(4)].map((_, index) => (
//         <ArticleCard key={index} />
//       ))}
//     </div>
//   </div>
// );

// const ArticleCard = () => (
//   <div className="flex items-center">
//     <img src="https://via.placeholder.com/60" alt="article-thumbnail" className="w-16 h-16 rounded-lg object-cover mr-4" />
//     <div>
//       <h4 className="text-sm font-semibold">Lorem Ipsum is simply dummy text of the printing.</h4>
//       <p className="text-xs text-gray-500">Oct 15, 2024</p>
//     </div>
//   </div>
// );

// export default App;
