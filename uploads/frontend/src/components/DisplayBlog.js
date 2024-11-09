import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrendingNews from './TrendingNews';
import Articles from './Articles';
import Head from './Head';
import Foot from './Foot';
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
   
      <div className="h-full w-full">
      <Head />
    <div className="container mx-auto  px-4 py-2">
      {/* Latest News Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:p-10">
        {/* Latest News */}
        <div className="col-span-2 md:p-10">
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          <div className="space-y-10">
            {/* News Card */}
            {blogs.slice(0, visibleCount).map((blog) => ( // Show only the visible count of blogs
              <div
                className=" shadow-md rounded-lg p-4 flex space-x-4"
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="w-1/2 md:w-32 h-24 bg-gray-300 rounded-md">
                  {blog.imagePath && (
                    <img
                      src={`https://uploads-backend.onrender.com/${blog.imagePath}`}
                      alt={blog.title}
                      className="w-full h-full object-cover" // Make the image responsive
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm ">{blog.category}</p>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className=" text-sm">
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
        <div className="space-y-8 ">
          {/* Trending News */}
     
  <TrendingNews/>
          {/* Articles */}
 
          <Articles/>
        </div>
      </div>
    </div>
    <Foot />
    </div>
    
  );
};

export default NewsSection;
