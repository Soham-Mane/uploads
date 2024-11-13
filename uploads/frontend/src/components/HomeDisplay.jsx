import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LatestNews from './LatestNews';

const HomeDisplay = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(8); // Display 8 blogs initially
    const [activeTab, setActiveTab] = useState('articles');

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

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8); // Increase by 8 each time
    };

    const filterBlogsByCategory = (category) => {
        return blogs.filter(blog => blog.category === category)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date descending
            .slice(0, 8); 
    };

    const renderContent = () => {
        let filteredBlogs;
        switch (activeTab) {
            case 'ipl2025':
                filteredBlogs = filterBlogsByCategory('IPL 2025');
                break;
            case 'wtc2025':
                filteredBlogs = filterBlogsByCategory('WTC 2025');
                break;
            case 'Top Story':
                filteredBlogs=filterBlogsByCategory('Top Story'); 
                break;   
            case 'articles':
            default:
                filteredBlogs = filterBlogsByCategory('Articles');
                break;
        }

        return filteredBlogs.map((blog) => (
//             <div
//                 className="shadow-md md:w-11/12 w-full h-60 rounded-lg p-4 mb-3 flex flex-col space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer "
//                 key={blog._id}
//                 onClick={() => handleBlogClick(blog._id)}
//             >
//                 <div className="w-full h-2/3 bg-gray-300 rounded-md">
//                     {blog.imagePath && (
//                         <img
//                             src={`https://uploads-backend.onrender.com/${blog.imagePath}`}
//                             alt={blog.title}
//                             className="w-full h-full object-cover"
//                         />
//                     )}
//                 </div>
       
//                 <div className="h-1/3 overflow-hidden">
//     <h3 className="text-base font-semibold line-clamp-2 overflow-hidden text-ellipsis">
//         {blog.title}
//     </h3>
//     <p className=" text-xs mt-2 truncate">
//         Rahul Mishra
//         <span className="ml-2">
//             {`${new Date(blog.createdAt).toLocaleDateString('en-GB', {
//                 day: '2-digit',
//                 month: 'short',
//                 year: 'numeric',
//             })} • ${new Date(blog.createdAt).toLocaleTimeString('en-US', {
//                 hour: 'numeric',
//                 minute: 'numeric',
//                 hour12: true,
//             })}`}
//         </span>
//     </p>
// </div>

//             </div>
<div
className="  w-11/12 gap-2 h-72 rounded-lg p-4 mb-3 flex flex-col space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl  cursor-pointer"
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
        <div className="container mx-auto p-4">
            {/* Tab Header */}
            <div className="flex space-x-4 mb-4 border-b">
                <button
                    className={`py-2 px-4 ${activeTab === 'articles' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('articles')}
                >
                    Articles
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'ipl2025' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('ipl2025')}
                >
                    IPL 2025
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'Top Story' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Top Story')}
                >
                    Top Story
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'wtc2025' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('wtc2025')}
                >
                    WTC 2025
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 mb-12">
                {renderContent()}
            </div>
            <div>
                <LatestNews/>
            </div>

            {/* Load More Button */}
       
        </div>
    );
};

export default HomeDisplay;



