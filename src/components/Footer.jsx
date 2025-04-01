import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Subscription data:', formData);
    
    // Show success message
    setSubscriptionStatus('Thank you for subscribing! You will receive our latest updates.');
    
    // Reset form
    setFormData({ name: '', phone: '' });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubscriptionStatus('');
    }, 5000);
  };

  const handleAdminLogin = () => {
    // Here you would typically redirect to admin login page or show a modal
    console.log('Admin login clicked');
    navigate("/admin"); // Navigates to the Admin Login page
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* First row with subscription form and admin button */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Subscription Form */}
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded text-gray-800"
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
                  className="w-full px-4 py-2 rounded text-gray-800"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-[#fbb304] text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
              >
                Subscribe
              </button>
              
              {subscriptionStatus && (
                <p className="mt-3 text-green-400">{subscriptionStatus}</p>
              )}
            </form>
          </div>
          
          {/* Admin Login Button */}
          <div className="mt-4 md:mt-0 self-end md:self-start">
            <button 
              onClick={handleAdminLogin}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Admin Login
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Bitzify All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;