
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rightImage from "../images/rightimage.png";

const TopStory = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://uploads-backend.onrender.com/api/blogs');
                setBlogs(response.data);
            } catch {
                console.error('Error fetching data');
            }
        };
        fetchBlogs();
    }, []);

    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    const filterLatestNewsBlogs = () => {
        return blogs
            .filter(blog => blog.category === 'Top Story')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date descending
    };

    const renderMainContent = () => {
        const filteredBlogs = filterLatestNewsBlogs().slice(0, 8);

        return filteredBlogs.slice(0, 8).map((blog, index) => (
            <div
                className="w-full h-64 mb-2 relative shadow-md rounded-2xl overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
            >
                <div className="w-full h-full">
                    {blog.imagePath && (
                        <img
                            src={`https://uploads-backend.onrender.com/${blog.imagePath}`}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="absolute bottom-5 left-0 w-full bg-opacity-50 p-2 text-white">
                    <h3 className="text-lg font-extrabold line-clamp-3">
                        {blog.title}
                    </h3>
                </div>
            </div>
        ));
    };

    const renderRightSideImages = () => {
       
      
    };

    return (
        <div className="container mx-auto p-4">
            {/* Top Header */}
            <div className='flex flex-row items-center justify-center p-4'>
                <h2 className='text-4xl font-bold'>Top Story</h2>
                <div
                    className="flex-1 border-t border-gray-400"
                    style={{
                        borderTop: '2px solid',
                        borderImage: 'linear-gradient(to right, #000, #aaa) 1',
                    }}
                ></div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Side (Main Stories) */}
                <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {renderMainContent()}
                </div>

                {/* Right Side (6 Images) */}
                {/* <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                <div
        className="w-full h-36 mb-4 relative shadow-md rounded-xl overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
    
    >
        <div className="w-full h-full">
                <img
                src={rightImage}
                    className="w-full h-full object-cover"
                />
        </div>
    </div>
                </div> */}
                <div className="grid grid-cols-2 gap-4">
  {[...Array(6)].map((_, index) => (
    <div
      key={index}
      className="w-full h-40 relative shadow-md rounded-xl overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <div className="w-full h-full">
        <img
          src={rightImage}
          alt={`image-${index}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ))}
</div>

            </div>
        </div>
    );
};

export default TopStory;
