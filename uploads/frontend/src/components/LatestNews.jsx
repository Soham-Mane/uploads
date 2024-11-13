import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopStory from './TopStory';

const LatestNews = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(8); // Display 8 blogs initially

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

    

    // Filter blogs to only show "Latest News" category
    const filterLatestNewsBlogs = () => {
        return blogs.filter(blog => blog.category === 'Latest News')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date descending
            .slice(0, 8); 
    };

    const renderContent = () => {
        const filteredBlogs = filterLatestNewsBlogs();

        return filteredBlogs.map((blog) => (
            <div
                className="  w-11/12 gap-4 h-72 rounded-lg p-4 mb-3 flex flex-col space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
            >
                <div className="w-full h-2/3 ">
                    {blog.imagePath && (
                        <img
                            src={`https://uploads-backend.onrender.com/${blog.imagePath}`}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-3xl"
                        />
                    )}
                </div>

                <div className="h-1/3 overflow-hidden">
                    <h3 className="text-base font-semibold line-clamp-2 overflow-hidden text-ellipsis">
                        {blog.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 truncate">
                        Rahul Mishra
                        <span className="ml-2">
                            {`${new Date(blog.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })} • ${new Date(blog.createdAt).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}`}
                        </span>
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-2 ">
            {/* Content Grid */}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 mb-12">
                {renderContent()}
            </div>
            <div>
                <TopStory/>
            </div>
       
        </div>
    );
};

export default LatestNews;
