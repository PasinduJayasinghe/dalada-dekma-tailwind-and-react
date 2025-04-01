import React, { useState } from 'react';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

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
      setShowSubscribeForm(false);
    }, 5000);
  };

  const handleAdminLogin = () => {
    // Here you would typically redirect to admin login page or show a modal
    console.log('Admin login clicked');
    window.location.href = '/admin'; // Replace with your actual admin route
  };

  const toggleSubscribeForm = () => {
    setShowSubscribeForm(!showSubscribeForm);
  };

  return (
    <footer className="bg-[#1a2332] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top section with buttons */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {!showSubscribeForm ? (
              <button 
                onClick={toggleSubscribeForm}
                className="bg-[#fbb304] text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
              >
                Subscribe
              </button>
            ) : (
              <div className="bg-gray-700 p-4 rounded shadow-lg">
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
                  
                  <div className="flex space-x-2">
                    <button 
                      type="submit" 
                      className="bg-[#fbb304] text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition duration-300"
                    >
                      Submit
                    </button>
                    <button 
                      type="button"
                      onClick={toggleSubscribeForm}
                      className="bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  {subscriptionStatus && (
                    <p className="mt-3 text-green-400">{subscriptionStatus}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          <div>
            <button 
              onClick={handleAdminLogin}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Admin Login
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Bitzify All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;