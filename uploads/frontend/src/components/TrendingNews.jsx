import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrendingNews = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://uploads-backend.onrender.com//api/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    // Filter the 'Trending News' category and get the last 4 blogs
    const trendingNewsBlogs = blogs
        .filter(blog => blog.category === 'Trending News')
        .slice(-4) // Get the last 4 blogs from the filtered list
        .reverse(); // Reverse to show the latest first

    const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

    return (
        <div className=" shadow-md rounded-lg p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">Trending News</h3>
            <div className="space-y-6">
                {trendingNewsBlogs.map(blog => (
                    <div
                        className="flex space-x-4 cursor-pointer  p-2 rounded-md transition-colors duration-300"
                        key={blog._id}
                        onClick={() => handleBlogClick(blog._id)}
                    >
                        <div className="w-28 h-20 bg-gray-200 flex-shrink-0 rounded-md overflow-hidden">
                            {blog.imagePath ? (
                                <img
                                    src={`https://uploads-backend.onrender.com//${blog.imagePath}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between">
                            <h4 className="text-sm font-semibold ">{blog.title}</h4>
                            <p className=" text-xs mt-2">
                                Rahul Mishra
                                <br />
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
        </div>
    );
};

export default TrendingNews;
