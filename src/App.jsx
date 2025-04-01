import { useState } from 'react';
import './App.css';
import Notification from './components/Notification.jsx';
import Banner from './components/Banner.jsx'; // Only import once

import CategoryContainer from './components/CategoryContainer.jsx';

function App() {
  return (
    <div>
      <Banner />
      <Notification />
      <CategoryContainer/>
    </div>
  );
}

export default App;
