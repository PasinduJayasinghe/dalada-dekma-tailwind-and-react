import React, { useState } from 'react';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }
    
    // In a real application, you would authenticate with an API here
    console.log('Login attempt with:', credentials);
    
    // For demo purposes, simulate successful login and redirect
    if (credentials.username === 'admin' && credentials.password === 'password') {
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#1a2332] py-6 px-4 text-center">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="text-gray-300 mt-1">Enter your credentials to access the dashboard</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-600 hover:underline">
            &larr; Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;