/**
 * Home Page
 * Landing page with introduction and navigation to all features
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = ({ isDarkMode }) => {
  const features = [
    {
      icon: '🌾',
      title: 'Crop Recommendation',
      description: 'Get personalized crop suggestions based on soil type, location, and water availability',
      link: '/crop-recommendation',
    },
    {
      icon: '💧',
      title: 'Water Usage Calculator',
      description: 'Calculate irrigation needs and track water usage history for your crops',
      link: '/water-calculator',
    },
    {
      icon: '⛈️',
      title: 'Climate Alerts',
      description: 'Get real-time weather alerts and climate risk warnings for your region',
      link: '/climate-alerts',
    },
    {
      icon: '👥',
      title: 'Community Hub',
      description: 'Connect with other farmers, share experiences, and learn from the community',
      link: '/community',
    },
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'View all your recommendations, water usage, and climate alerts in one place',
      link: '/dashboard',
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize language, theme, and other preferences',
      link: '/settings',
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-primary to-secondary'} py-20 page-enter`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 animate-bounce-in">
            <span className="text-6xl">🌱</span>
          </div>
          <h1 className={`text-5xl font-bold mb-4 ${!isDarkMode ? 'text-white' : ''}`}>
            Smart & Climate-Resilient Agriculture Advisor
          </h1>
          <p className={`text-xl mb-8 ${!isDarkMode ? 'text-gray-100' : isDarkMode ? 'text-gray-300' : ''}`}>
            Empower your farming decisions with AI-driven insights and real-time climate data
          </p>
          <Link to="/crop-recommendation">
            <Button variant="secondary" size="lg" className="mb-4 hover-scale">
              Get Started <ArrowRightIcon className="w-5 h-5 inline ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Everything you need to succeed in sustainable agriculture
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="h-full hover:scale-105 transform transition-all duration-300 cursor-pointer" isDarkMode={isDarkMode} interactive>
                <div className="text-4xl mb-4 animate-bounce-in">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <div className="flex items-center text-primary font-semibold text-sm hover:gap-3 transition-all gap-2">
                  Learn More <ArrowRightIcon className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-16 my-8 rounded-lg max-w-7xl mx-auto px-4 w-full animate-slide-up`}>
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <SparklesIcon className="w-8 h-8 text-primary" />
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Enter Your Details', desc: 'Provide information about your soil, location, and water availability' },
            { step: 2, title: 'Get Recommendations', desc: 'Receive personalized crop and water usage recommendations' },
            { step: 3, title: 'Monitor & Grow', desc: 'Track your progress with real-time alerts and analytics' },
          ].map((item) => (
            <div key={item.step} className="text-center hover-scale">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-bounce-in">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
