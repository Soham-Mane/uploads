import React from 'react'
import insta from '../images/instagram.png';
import facebook from '../images/facebook.png'
import whatsapp from '../images/whatsapp.png'
import linkedin from '../images/linkedin.png'
import telegram from '../images/telegram.png'
import youtube from '../images/youtube.png'
import twitter from '../images/twitter.png'
import message from '../images/message.png'
// import insta from '../images/instagram.png'
const Contact = () => {
  return (
    <div className='w-full h-full flex items-center justify-center '>
        
      <div className='w-3/4 h-3/4  flex flex-col lg:flex-row lg:p-10'>
      <div className="w-full h-full flex flex-col lg:flex-row p-4 lg:p-10">
  {/* Left Section - Form */}
  <div className="w-full lg:w-1/2 h-full p-4 lg:p-10">
    <section className="p-4 lg:p-10">
      <div className="container mx-auto">
        {/* Contact Form Section */}
        <div className="w-full">
          <form className="space-y-6">
            <div>
              <input
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                className="w-full border-2 border-gray-400 p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                className="w-full border-2 border-gray-400 p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Message"
                id="message"
                name="message"
                rows="5"
                className="w-full border-2 border-gray-400 p-3 rounded-lg resize-none"
                required
              ></textarea>
            </div>
<br />
            <input
              type="submit"
              value="Send"
              className=" w-1/2 bg-blue-900 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-white hover:text-blue-900 hover:border-blue-900 border-2 transition duration-300"
            />
          </form>
        </div>
      </div>
    </section>
  </div>

  {/* Right Section - Contact Information */}
  <div className="w-full lg:w-1/2 h-full p-4 lg:p-10 ">
    <div className="lg:p-4 lg:p-8 space-y-12 ">
      {/* Contact Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <a
          href="mailto:cricwelly@gmail.com"
          className="text-black font-bold flex items-center space-x-2"
        >
          <img src={message} />
          <span>cricwelly@gmail.com</span>
        </a>
        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <img src={insta} alt="" />
          <img src={facebook} alt="" />
          <img src={whatsapp} alt="" />
          <img src={linkedin} alt="" />
          <img src={telegram} alt="" />
          <img src={youtube} alt="" />
          <img src={twitter} alt="" />
    

   
        </div>
      </div>

      {/* Advertisement Query Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Advertisement Query</h2>
        <p>
          For advertisement query, kindly reach out to us on the below email
        </p>
        <a
          href="mailto:cricwelly@gmail.com"
          className="text-black font-bold flex items-center space-x-2"
        >
          <img src={message} />
          <span>cricwelly@gmail.com</span>
        </a>
      </div>

      {/* FAQs Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <p>
          Have questions? Visit our FAQs for quick answers, or contact us
          directly for more personalized assistance.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Visit FAQ
        </button>
      </div>
    </div>
  </div>
</div>
      </div>



    </div>
  )
}

export default Contact
