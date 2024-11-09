import React from 'react';
import Logo from "../images/01.png";
import Insta from "../images/instagram.svg";
import Face from "../images/facebook.svg";
import You from "../images/youtube.svg";
import Twit from "../images/twitter.svg";

const Foot = () => {
  return (
  
    <div>
      
      <div className="mx-auto pt-8 pb-8 px-4 lg:max-w-6xl lg:px-8">
        <div className="mt-10 mb-4 gap-y-10 flex flex-wrap justify-between xl:gap-x-8">
          
          <div className="md:mx-0 mx-20">
            <img src={Logo} alt="Website logo" className=" h-16 lg:w-auto w-10/12 mx-auto sm:mx-0"/>
          </div>
          
          <div className="md:ml-0 ml-6">
            <p className="text-[#333333] lg:text-xl text:lg font-semibold mb-9">QUICK LINKS</p>
            <ul className="list-none">
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/">Home</a>
              </li>
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/schedule">Schedule</a>
              </li>
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/cricket-news">News</a>
              </li>
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/series">Series</a>
              </li>
            </ul>
          </div>
          
          <div className="md:mr-0 mr-6">
            <p className="text-[#333333] lg:text-xl text:lg font-semibold mb-9">COMPANY</p>
            <ul className="list-none">
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/">Advertise</a>
              </li>
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/privacy">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a className="text-[#6C6C6C] text-[14px] font-normal mb-6 space-links" href="/terms-of-use">Terms of Use</a>
              </li>
            </ul>
          </div>
          
          <div className="md:mr-0 mr-6">
            <p className="text-[#333333] lg:text-xl text:lg font-semibold mb-9">FOLLOW US ON</p>
            <ul className="list-none">
              <li className="mb-4">
                <a href="https://www.instagram.com/cricketgullyofficial/" target="_blank" rel="noopener noreferrer" className="flex">
                  <img src={Insta} className='h-9 rounded-lg' alt="Instagram" />
                  <span className="text-[#6C6C6C] text-[14px] font-normal ml-2">Instagram</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="https://www.facebook.com/cricketgully.official/" target="_blank" rel="noopener noreferrer" className="flex">
                  <img src={Face} className="h-9" alt="Facebook" />
                  <span className="text-[#6C6C6C] text-[14px] font-normal ml-2">Facebook</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="https://www.youtube.com/channel/UCTKws3gbVaxeLJv4yXDorVQ" target="_blank" rel="noopener noreferrer" className="flex">
                  <img src={You} className='h-9' alt="YouTube" />
                  <span className="text-[#6C6C6C] text-[14px] font-normal ml-2">YouTube</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="https://x.com/thecricketgully" target="_blank" rel="noopener noreferrer" className="flex">
                  <img src={Twit} className='h-9' alt="X (Twitter)" />
                  <span className="text-[#6C6C6C] text-[14px] font-normal ml-2">X (Twitter)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} CricWelly. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default Foot;
