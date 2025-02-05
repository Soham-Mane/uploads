import React from 'react';
import Layout from '../Layout';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
const Topnav = () => {
  // Get the current date and format it
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(currentDate);

  return (
    <div className=' bg-[var(--bg-color)]  '>
      <div className='max-w-[1140px] xl:mx-auto flex justify-between items-center pr-6 px-4 md:px-0'>
      <div className='flex items-center gap-2 py-1'><div>{formattedDate}</div><div><Layout/></div></div>
      <div className='flex items-center pr-3 gap-2 py-1'><FaFacebookF /> <FaInstagram /> <FaYoutube />  <FaLinkedinIn /> <FaSquareXTwitter /><FaReddit /><FaTelegram /> <FaWhatsapp /></div>
      </div>
    </div>
  );
};

export default Topnav;
