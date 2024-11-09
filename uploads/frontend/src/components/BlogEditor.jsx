import React, { useState, useRef, useMemo  } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import styled from "styled-components";

const BlogForm = ({placeholder}) => {
  const editor=useRef(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    content: '',
    description: '',
    image: null,
  });
  const handleContentChange = (newContent) => {
    setFormData({
      ...formData,
      content: newContent, // Update content field with new content
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
    
    if (imageFile) {
      alert("Image uploaded successfully!");
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('content', formData.content);
    formDataToSubmit.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/blogs', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Blog posted successfully!');
      setFormData({category: '', title: '',description: '', content: '', image: null });
    } catch (err) {
      console.error('Error posting blog:', err);
      alert('Error posting blog');
    }
  };

// INPUT UI
const StyledWrapper = styled.div`
  .custum-file-upload {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cacaca;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: rgba(75, 85, 99, 1);
}

.custum-file-upload input {
  display: none;
}
`;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 space-y-6 "
    >
      <h1 className="text-3xl font-bold text-center text-gray-700">Create Blog</h1>
      <div className="flex flex-col">

   <label className="text-lg font-semibold text-gray-600 mb-2">Category Name</label>
<div className="flex space-x-6 mt-2">
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="Popular Post"
      checked={formData.category === "Popular Post"}
      onChange={handleChange}
      className="hidden"
      required
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "Popular Post"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      Popular Post
    </span>
  </label>
  
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="Articles"
      checked={formData.category === "Articles"}
      onChange={handleChange}
      className="hidden"
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "Articles"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      Articles
    </span>
  </label>
  
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="Trending News"
      checked={formData.category === "Trending News"}
      onChange={handleChange}
      className="hidden"
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "Trending News"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      Trending News
    </span>
  </label>
<label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="Top Story"
      checked={formData.category === "Top Story"}
      onChange={handleChange}
      className="hidden"
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "Top Story"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      Top Story
    </span>
  </label>
</div>
<div className='flex space-x-6 mt-4'>
<label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="WTC 2025"
      checked={formData.category === "WTC 2025"}
      onChange={handleChange}
      className="hidden"
      required
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "WTC 2025"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      WTC 2025
    </span>
  </label>
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="IPL 2025"
      checked={formData.category === "IPL 2025"}
      onChange={handleChange}
      className="hidden"
      required
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "IPL 2025"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
      IPL 2025
    </span>
  </label>

  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="category"
      value="Latest News"
      checked={formData.category === "Latest News"}
      onChange={handleChange}
      className="hidden"
      required
    />
    <span
      className={`px-4 py-2 rounded-lg ${
        formData.category === "Latest News"
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-200 text-gray-600"
      } transition duration-200 ease-in-out`}
    >
    Latest News
    </span>
  </label>
</div>

      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-600 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter your blog title"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-600 mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter your blog title"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-gray-600 mb-2">Content</label>
        <JoditEditor
			ref={editor}
			value={formData.content}
						// onBlur={content => setFormData(content)} // preferred to use only this option to update the content for performance reasons
			onChange={handleContentChange}
		/>
      </div>

      <div className="flex flex-col items-center">

        <StyledWrapper>
      <label className="custum-file-upload" htmlFor="file">
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill=""
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />{" "}
            </g>
          </svg>
        </div>
        <div className="text">
          <span>Click to upload image</span>
        </div>
        <input type="file"
              name="image"
              onChange={handleImageChange}
        id="file" />
      </label>
    </StyledWrapper>
      </div>

      <button
        type="submit"
        className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Submit Blog
      </button>
    </form>
  );
};

export default BlogForm;
