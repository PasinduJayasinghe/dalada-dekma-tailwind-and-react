import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import perahara from "../assets/images/perahara.png"

function Footer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://localhost:7249/api/Subscribers', {  // Fixed URL (added colon after https)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          PhoneNumber: formData.phone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Subscription failed');
      }

      setSubscriptionStatus('Thank you for subscribing! You can connect with Bitzify for digital solutions.');
      setFormData({ name: '', phone: '' });
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again.');
      console.error('Subscription error:', err);  // Added error logging
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSubscriptionStatus('');
        setError('');
      }, 5000);
    }
  };

  return (
    <footer 
      className="bg-[#220901] text-amber-50 py-12 cursor-default border-t-4 border-[#BC3908] relative"
      style={{
        backgroundImage: `url(${perahara})`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        backgroundSize: ''
      }}
    >
      {/* Add a semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#220901] opacity-90"></div>
      
      {/* Content container with relative positioning to appear above the overlay */}
      <div className="container mx-auto px-6 relative">
        {/* Main content row */}
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Subscription Form - Left Section */}
          <div className="w-full lg:w-2/5 mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold mb-6 text-[#F6AA1C] font-serif">Stay Connected</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#621708]/70 border border-[#941B0C] focus:border-[#F6AA1C] focus:ring-2 focus:ring-[#F6AA1C]/50 text-amber-50 placeholder-amber-200/70"
                  required
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-[#621708]/70 border border-[#941B0C] focus:border-[#F6AA1C] focus:ring-2 focus:ring-[#F6AA1C]/50 text-amber-50 placeholder-amber-200/70"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#BC3908] to-[#F6AA1C] hover:from-[#F6AA1C] hover:to-[#BC3908] text-[#220901] font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#220901]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Subscribe'}
              </button>
              
              {subscriptionStatus && (
                <p className="mt-3 text-[#F6AA1C] font-medium">{subscriptionStatus}</p>
              )}
              
              {error && (
                <p className="mt-3 text-[#BC3908] font-medium">{error}</p>
              )}
            </form>
          </div>
          
          {/* Vertical divider - only visible on larger screens */}
          <div className="hidden lg:block h-56 border-l border-[#941B0C] mx-8 opacity-60"></div>
          
          {/* Contact Details - Right Section */}
          <div className="hidden md:block w-full lg:w-2/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#F6AA1C] font-serif">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-[#941B0C] rounded-full mr-3 mt-1">
                      <FaPhone className="text-[#F6AA1C]" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">Phone</p>
                      <p className="text-amber-50/90">+94 76 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 bg-[#941B0C] rounded-full mr-3 mt-1">
                      <FaEnvelope className="text-[#F6AA1C]" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">Email</p>
                      <p className="text-amber-50/90">info@bitzify.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social & Admin */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#F6AA1C] font-serif">Follow Us</h3>
                <div className="flex space-x-4 mb-6">
                  {[
                    { icon: <FaFacebook size={20} />, color: 'hover:text-[#4267B2]' },
                    { icon: <FaTwitter size={20} />, color: 'hover:text-[#1DA1F2]' },
                    { icon: <FaInstagram size={20} />, color: 'hover:text-[#E1306C]' },
                    { icon: <FaLinkedin size={20} />, color: 'hover:text-[#0077B5]' }
                  ].map((social, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="p-2 bg-[#621708] rounded-full text-amber-100 hover:bg-[#F6AA1C] hover:text-[#220901] transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#941B0C]/50 mt-12 pt-8 text-center">
          <p className="text-sm text-amber-100/80">
            &copy; {new Date().getFullYear()} Bitzify. All rights reserved. | 
            <a href="#" className="hover:text-[#F6AA1C] ml-2 transition-colors">Privacy Policy</a> | 
            <a href="#" className="hover:text-[#F6AA1C] ml-2 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;