/**
 * Main App Component
 * Handles routing, theme, and language state management
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { storage } from './utils/storage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import WaterCalculator from './pages/WaterCalculator';
import ClimateAlerts from './pages/ClimateAlerts';
import CommunityHub from './pages/CommunityHub';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import FarmerProfile from './pages/FarmerProfile';
import GovernmentSchemes from './pages/GovernmentSchemes';

// Styles
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = storage.get('darkMode', false);
    setIsDarkMode(savedTheme);

    // Apply theme to document
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update theme
  useEffect(() => {
    storage.set('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
        {/* Navbar */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/crop-recommendation" element={<CropRecommendation isDarkMode={isDarkMode} />} />
            <Route path="/water-calculator" element={<WaterCalculator isDarkMode={isDarkMode} />} />
            <Route path="/climate-alerts" element={<ClimateAlerts isDarkMode={isDarkMode} />} />
            <Route path="/community" element={<CommunityHub isDarkMode={isDarkMode} />} />
            <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route path="/farmer-profile" element={<FarmerProfile isDarkMode={isDarkMode} />} />
            <Route path="/government-schemes" element={<GovernmentSchemes isDarkMode={isDarkMode} />} />
            <Route path="/settings" element={<Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
