import { useState } from 'react';
import './App.css';
import Notification from './components/Notification.jsx';
import Banner from './components/Banner.jsx'; // Only import once

import CategoryContainer from './components/CategoryContainer.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const notifications = [
    "CHECK OUT THE NEW LIBRARY SPACES",
    "EXTENDED HOURS DURING FINALS WEEK",
    "NEW RESOURCES AVAILABLE ONLINE"
  ];
  return (
    <div>
      <Banner />
      <Notification messages={notifications} />
      <CategoryContainer/>
      <Footer />
    </div>
  );
}

export default App;
