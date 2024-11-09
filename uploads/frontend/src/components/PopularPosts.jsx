import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularPosts = ({ blogs }) => {
  const navigate = useNavigate();

  // Filter for 'Popular Post' category and limit to visibleCount
  const popularPosts = blogs.filter(blog => blog.category === 'Popular Post').slice(0, 4);

  const handleBlogClick = (blogId) => navigate(`/blog/${blogId}`);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
      <div className="space-y-6">
        {popularPosts.map((popBlog) => (
          <div
            key={popBlog._id}
            onClick={() => handleBlogClick(popBlog._id)}
            className="flex space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-300"
          >
            <div className="w-28 h-20 bg-gray-200 flex-shrink-0 rounded-md overflow-hidden">
              {popBlog.imagePath ? (
                <img
                  src={`http://localhost:5000/${popBlog.imagePath}`}
                  alt={popBlog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="text-sm font-semibold text-gray-800">{popBlog.title}</h4>
              <p className="text-gray-500 text-xs">
                Rahul Mishra
                <br />
                {`${new Date(popBlog.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })} • ${new Date(popBlog.createdAt).toLocaleTimeString('en-US', {
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

export default PopularPosts;
