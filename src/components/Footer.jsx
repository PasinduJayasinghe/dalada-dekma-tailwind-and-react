import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

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

  const handleAdminLogin = () => {
    navigate("/admin");
  };

  return (
    <footer className="bg-gray-800 text-white py-9 cursor-default">
      <div className="container mx-auto px-6">
        {/* Main content row */}
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Subscription Form */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-xl font-bold mb-4">Subscribe to Updates</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded text-amber-50 bg-gray-700"
                  required
                />
              </div>
              
              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded text-amber-50 bg-gray-700"  
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-[#fbb304] text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
              
              {subscriptionStatus && (
                <p className="mt-3 text-green-400">{subscriptionStatus}</p>
              )}
              
              {error && (
                <p className="mt-3 text-red-400">{error}</p>
              )}
            </form>
          </div>
          
          {/* Vertical divider - only visible on larger screens */}
          <div className="hidden lg:block h-60 border-l border-gray-600 mx-8"></div>
          
          {/* Contact Details */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-[#fbb304]" />
                <span>+94 76 123 4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-[#fbb304]" />
                <span>info@bitzify.com</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#fbb304] transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#fbb304] transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#fbb304] transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#fbb304] transition duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Admin Login Button */}
          <div className="w-full lg:w-auto mt-4 lg:mt-0 self-end lg:self-start">
            <button 
              onClick={handleAdminLogin}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-300 cursor-pointer"
            >
              Admin Login
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className='text-sm'>&copy; {new Date().getFullYear()} Bitzify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;