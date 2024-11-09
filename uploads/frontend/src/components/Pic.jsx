import React, { useState } from 'react';

const Pic = () => {
  // Array of image URLs
  const images = [
    "https://static.cricketgully.com/moment/20241010-171227-2e18bbf263.webp",
    "", // Replace with your own image URLs
    "https://example.com/image3.jpg",
    
  ];

  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for next button click
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handler for previous button click
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className=''>
      <div>
        <div className="border pt-4 order-2 md:rounded-xl rounded-[15px] bg-white md:mt-5 mt-1 lg:order-1">
          <h3 className="md:text-lg text-sm px-4 mb-4 font-bold leading-[18px] text-center">
            ⭐ Legendary Momentum
            <p className="text-xs opacity-60 text-center md:hidden mt-[10px]">12-Oct-2024</p>
          </h3>
          <div className="relative">
            <div className="md:px-4 px-[10px] overflow-hidden relative">
              <div className="h-[298px] w-full rounded-xl" style={{ position: 'relative' }}>
                <img
                  src={images[currentIndex]} // Dynamically display the current image
                  alt="Legendary Momentum"
                  className="transition-opacity duration-500 ease-in-out object-cover opacity-100 animate-fade-in h-[298px] w-full rounded-xl"
                />
              </div>
              <div className="absolute bottom-0 left-0 pl-8 py-4 w-[200px] max-w-[200px] text-[#FFFFFF]">
                <p className="text-lg"></p>
                <p className="text-xs opacity-60 hidden md:block">12-Oct-2024</p>
              </div>
            </div>
            <div className="flex justify-between items-center my-3 md:my-0">
              {/* Previous Button */}
              <button className="disabled:opacity-50 hidden md:block visible" onClick={prevImage}>
                <img
                  src="data:image/svg+xml,%3csvg%20width='52'%20height='52'%20viewBox='0%200%2052%2052'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_d_26_2485)'%3e%3ccircle%20cx='12'%20cy='12'%20r='12'%20transform='matrix(-1%200%200%201%2038%2010)'%20fill='white'/%3e%3ccircle%20cx='12'%20cy='12'%20r='11.9'%20transform='matrix(-1%200%200%201%2038%2010)'%20stroke='%23E3E3E4'%20stroke-width='0.2'/%3e%3c/g%3e%3cpath%20d='M27.6001%2018L22.8001%2022L27.6001%2026'%20stroke='%233A32D1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                  alt="Previous"
                />
              </button>

              <div className="flex justify-center flex-grow overflow-hidden mx-[10px] md:mx-0">
                <div className="h-1 md:w-6 w-full mx-0.5 rounded-full bg-[#3A32D1] cursor-pointer"></div>
                <div className="h-1 md:w-6 w-full mx-0.5 rounded-full bg-[#D8D6F6] cursor-pointer"></div>
              </div>

              {/* Next Button */}
              <button className="disabled:opacity-50 hidden md:block visible" onClick={nextImage}>
                <img
                  src="data:image/svg+xml,%3csvg%20width='52'%20height='52'%20viewBox='0%200%2052%2052'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_d_26_2485)'%3e%3ccircle%20cx='26'%20cy='22'%20r='12'%20fill='white'/%3e%3ccircle%20cx='26'%20cy='22'%20r='11.9'%20stroke='%23E3E3E4'%20stroke-width='0.2'/%3e%3c/g%3e%3cpath%20d='M24.3999%2018L29.1999%2022L24.3999%2026'%20stroke='%233A32D1'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                  alt="Next"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pic;
