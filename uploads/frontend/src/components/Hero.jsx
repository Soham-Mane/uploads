import React from 'react';
import rohit from '../images/rohit';

const Hero = () => {
  return (
    <div
      className="relative w-full h-[500px] max-w-[1320px] mx-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${rohit})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-20">
        <div className="text-white max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Champions in Blue!
          </h1>
          <p className="text-lg mb-6">
          Celebrating the passion, perseverance, and pride of cricket. Together, these players have shown the world what it means to play for India—each win is a tribute to their hard work and dedication on the field.
          </p>
          <button className="bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200">
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
