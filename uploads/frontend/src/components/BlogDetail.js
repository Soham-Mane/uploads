

import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import TopStory from './TopStory';
import Articles from './Articles';

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();
  const {id}=useParams();
  const [blog, setBlog] = useState(null);
  const [popBlog,setPopBlog]=useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log(`Fetching blog from: https://uploads-backend.onrender.com//api/blogs/${id}`); // Log request URL
        const response = await axios.get(`https://uploads-backend.onrender.com//api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog: ', error);
      }
    };

    fetchBlog();
  }, [id]);


  // WRITTEN FR ARTICLES COPIED FORM DisplayBlog.js
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://uploads-backend.onrender.com//api/blogs');
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  const articleBlogs=blogs.filter(blog=>blog.category==='Articles')
  const PopularPost=blogs.filter(popBlog=>popBlog.category==='Popular Post')
  const handleBlogClick = (blogId) => {
    // Use the correct path to match with the route defined in App.js
    navigate(`/blog/${blogId}`);
  };
  const handlePopularClick = (blogId) => {
    // Use the correct path to match with the route defined in App.js
    navigate(`/blog/${blogId}`);
  };
  const blogDetailsStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const titleStyle = {
    fontSize: '2rem',
    margin: '20px 0',
    color: '#333',
  };

  const contentStyle = {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.6',
    textAlign: 'justify',
  };
  if (!blog) return <p>Loading blog details...</p>;
  // SHARE URLS FOR WHATSAPP AND INSTAGRAM
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)}%20${encodeURIComponent(window.location.href)}`;

  const StyledWrapper = styled.div`
  .card {
  width: fit-content;
  height: fit-content;
  background-color: rgb(238, 238, 238);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 25px;
  gap: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
}

/* for all social containers*/
.socialContainer {
  width: 52px;
  height: 52px;
  border-radius: 5px;
  background-color: rgb(44, 44, 44);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition-duration: 0.3s;
}
/* instagram*/
.containerOne:hover {
  background-color: #d62976;
  transition-duration: 0.3s;
}
/* Tiktok*/
.containerTwo:hover {
  background-color: #25f4ee;
  transition-duration: 0.3s;
}
/* Facebook*/
.containerThree:hover {
  background-color: #1877f2;
  transition-duration: 0.3s;
}
/* Whatsapp*/
.containerFour:hover {
  background-color: green;
  transition-duration: 0.3s;
}

.socialContainer:active {
  transform: scale(0.9);
  transition-duration: 0.3s;
}

.socialSvg {
  width: 19px;
}
.largeIcon {
  width: 27px; /* Ancho específico solo para el icono de TikTok */
}
.socialSvg path {
  fill: rgb(255, 255, 255);
}

.socialContainer:hover .socialSvg {
  animation: slide-in-top 0.3s both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:p-10">
        {/* Main Blog Post */}
        <div className="col-span-2">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Blog / Web Design</p>
            <h1 className="text-3xl font-bold mb-2">
             {blog.title}
            </h1>
            <p className="text-gray-600">Rahul Mishra 
         {`${new Date(blog.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })} • ${new Date(blog.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`}</p>
           
          </div>
           {blog.imagePath && (
        <img src={`https://uploads-backend.onrender.com//${blog.imagePath}`} alt={blog.title} style={imageStyle} />
      )}
      <br />
          <p className="text-lg text-gray-800 mb-6">
           {blog.description}
          </p>
          <div className='mb-12'>
     
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          </div>

          {/* Social Share Section */}
    
<StyledWrapper>
      <div className="card">
        <h1>Share</h1>
{/* TWITTER SHARE */}
        <a className="socialContainer containerTwo" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}  target="_blank" rel="noopener noreferrer">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="socialSvg twitterSvg"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        </a>
{/* FACEBOOK SHARE */}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="socialContainer containerThree">
          <div>
            <svg
              className="socialSvg tiktokSvg largeIcon"
              width="44px"
              height="44px"
              viewBox="0 0 45 35"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
            >
              <title>Facebook</title>
              <g
                id="Icon/Social/facebook-black"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
              >
                <path
                  d="M30.0793333,40 L30.0793333,27.608 L34.239,27.608 L34.8616667,22.7783333 L30.0793333,22.7783333 L30.0793333,19.695 C30.0793333,18.2966667 30.4676667,17.344 32.4726667,17.344 L35.0303333,17.3426667 L35.0303333,13.0233333 C34.5876667,12.9646667 33.0696667,12.833 31.3036667,12.833 C27.6163333,12.833 25.0923333,15.0836667 25.0923333,19.2166667 L25.0923333,22.7783333 L20.922,22.7783333 L20.922,27.608 L25.0923333,27.608 L25.0923333,40 L30.0793333,40 Z M9.766,40 C8.79033333,40 8,39.209 8,38.234 L8,9.766 C8,8.79033333 8.79033333,8 9.766,8 L38.2336667,8 C39.209,8 40,8.79033333 40,9.766 L40,38.234 C40,39.209 39.209,40 38.2336667,40 L9.766,40 Z"
                  id="Shape"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>
        </a>
{/* WHATSAPP SHARE */}
        <a a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="socialContainer containerFour">
          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a>
      </div>
    </StyledWrapper>
    <TopStory/>
          
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          {/* Popular Posts */}
          <div>
          <div className="bg-white shadow-md rounded-lg p-6">
  <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
  <ul className="space-y-6">
    {PopularPost.slice(0, visibleCount).map((popBlog) => (
      <div
        key={popBlog._id}
        onClick={() => handleBlogClick(popBlog._id)}
        className="flex space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-300"
      >
        <div className="w-28 h-20 bg-gray-200 flex-shrink-0 rounded-md overflow-hidden">
          {popBlog.imagePath ? (
            <img
              src={`https://uploads-backend.onrender.com//${popBlog.imagePath}`}
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
  </ul>
</div>

          </div>

          {/* Articles */}
          <Articles/>
            
        </div>
      </div>
    </div>
  );
};

export default BlogPost;