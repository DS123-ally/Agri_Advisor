/**
 * Climate Alerts Page
 * Fetch weather from OpenWeatherMap API and show climate risk alerts
 */

import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import Card from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';
import WeatherMap from '../components/WeatherMap';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Extended dummy weather data for quick testing
const DUMMY_WEATHER_DATA = {
  'mumbai': { name: 'Mumbai', sys: { country: 'IN' }, main: { temp: 32, temp_max: 35, temp_min: 28, feels_like: 34, humidity: 72, pressure: 1013 }, wind: { speed: 6.5 }, weather: [{ main: 'Partly Cloudy' }] },
  'delhi': { name: 'Delhi', sys: { country: 'IN' }, main: { temp: 28, temp_max: 31, temp_min: 24, feels_like: 30, humidity: 45, pressure: 1015 }, wind: { speed: 4.2 }, weather: [{ main: 'Clear' }] },
  'bangalore': { name: 'Bangalore', sys: { country: 'IN' }, main: { temp: 26, temp_max: 29, temp_min: 22, feels_like: 27, humidity: 68, pressure: 1012 }, wind: { speed: 3.1 }, weather: [{ main: 'Cloudy' }] },
  'hyderabad': { name: 'Hyderabad', sys: { country: 'IN' }, main: { temp: 30, temp_max: 33, temp_min: 26, feels_like: 32, humidity: 55, pressure: 1014 }, wind: { speed: 5.0 }, weather: [{ main: 'Sunny' }] },
  'pune': { name: 'Pune', sys: { country: 'IN' }, main: { temp: 27, temp_max: 30, temp_min: 23, feels_like: 28, humidity: 60, pressure: 1013 }, wind: { speed: 4.8 }, weather: [{ main: 'Partly Cloudy' }] },
  'kolkata': { name: 'Kolkata', sys: { country: 'IN' }, main: { temp: 29, temp_max: 32, temp_min: 25, feels_like: 31, humidity: 75, pressure: 1012 }, wind: { speed: 5.5 }, weather: [{ main: 'Humid' }] },
  'chennai': { name: 'Chennai', sys: { country: 'IN' }, main: { temp: 31, temp_max: 33, temp_min: 29, feels_like: 33, humidity: 80, pressure: 1011 }, wind: { speed: 7.1 }, weather: [{ main: 'Cloudy' }] },
  'indore': { name: 'Indore', sys: { country: 'IN' }, main: { temp: 26, temp_max: 29, temp_min: 22, feels_like: 27, humidity: 50, pressure: 1014 }, wind: { speed: 3.5 }, weather: [{ main: 'Clear' }] },
  'lucknow': { name: 'Lucknow', sys: { country: 'IN' }, main: { temp: 24, temp_max: 27, temp_min: 20, feels_like: 25, humidity: 40, pressure: 1015 }, wind: { speed: 4.0 }, weather: [{ main: 'Sunny' }] },
  'jaipur': { name: 'Jaipur', sys: { country: 'IN' }, main: { temp: 25, temp_max: 28, temp_min: 21, feels_like: 26, humidity: 35, pressure: 1016 }, wind: { speed: 5.5 }, weather: [{ main: 'Clear' }] },
  'chandigarh': { name: 'Chandigarh', sys: { country: 'IN' }, main: { temp: 22, temp_max: 25, temp_min: 18, feels_like: 23, humidity: 38, pressure: 1016 }, wind: { speed: 6.0 }, weather: [{ main: 'Sunny' }] },
  'amritsar': { name: 'Amritsar', sys: { country: 'IN' }, main: { temp: 20, temp_max: 23, temp_min: 16, feels_like: 21, humidity: 42, pressure: 1017 }, wind: { speed: 7.2 }, weather: [{ main: 'Cloudy' }] },
  'surat': { name: 'Surat', sys: { country: 'IN' }, main: { temp: 33, temp_max: 36, temp_min: 30, feels_like: 35, humidity: 68, pressure: 1012 }, wind: { speed: 6.0 }, weather: [{ main: 'Sunny' }] },
  'ahmedabad': { name: 'Ahmedabad', sys: { country: 'IN' }, main: { temp: 32, temp_max: 35, temp_min: 29, feels_like: 33, humidity: 62, pressure: 1013 }, wind: { speed: 5.5 }, weather: [{ main: 'Partly Cloudy' }] },
  'nagpur': { name: 'Nagpur', sys: { country: 'IN' }, main: { temp: 28, temp_max: 31, temp_min: 25, feels_like: 29, humidity: 52, pressure: 1014 }, wind: { speed: 4.5 }, weather: [{ main: 'Clear' }] },
};

const ClimateAlerts = ({ isDarkMode }) => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const API_KEY = 'f9f79e6c4ce88b9e906102e32e08db9e'; // Free tier key for demo

  useEffect(() => {
    // Load cached weather
    const cached = storage.get('cachedWeather', null);
    if (cached) {
      setWeather(cached.data);
      generateAlerts(cached.data);
    }
  }, []);

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const locationLower = location.toLowerCase().trim();
      
      // Try dummy data first (for quick demo)
      if (DUMMY_WEATHER_DATA[locationLower]) {
        const weatherData = DUMMY_WEATHER_DATA[locationLower];
        setWeather(weatherData);
        storage.set('cachedWeather', {
          data: weatherData,
          timestamp: Date.now(),
        });
        generateAlerts(weatherData);
        setLoading(false);
        return;
      }

      // Fall back to real API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );

      const weatherData = response.data;
      setWeather(weatherData);

      // Cache weather data with timestamp
      storage.set('cachedWeather', {
        data: weatherData,
        timestamp: Date.now(),
      });

      generateAlerts(weatherData);
    } catch (err) {
      const availableCities = Object.keys(DUMMY_WEATHER_DATA).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
      setError(`Location not found. Try: ${availableCities}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateAlerts = (weatherData) => {
    const generatedAlerts = [];
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const weather_condition = weatherData.weather[0].main;

    // Heatwave alert
    if (temp > 35) {
      generatedAlerts.push({
        id: 1,
        type: 'heatwave',
        title: 'Heatwave Warning',
        description: `Temperature is ${temp}°C. Ensure adequate irrigation and protect crops from extreme heat.`,
        severity: 'high',
        icon: '🔥',
      });
    }

    // Frost alert
    if (temp < 0) {
      generatedAlerts.push({
        id: 2,
        type: 'frost',
        title: 'Frost Alert',
        description: `Temperature is ${temp}°C. Risk of frost damage. Cover sensitive crops.`,
        severity: 'critical',
        icon: '❄️',
      });
    }

    // Drought alert
    if (humidity < 30 && temp > 25) {
      generatedAlerts.push({
        id: 3,
        type: 'drought',
        title: 'Drought Risk',
        description: `Low humidity (${humidity}%) and high temperature. Increase irrigation.`,
        severity: 'high',
        icon: '🏜️',
      });
    }

    // Heavy rain alert
    if (weather_condition === 'Rain' && windSpeed > 5) {
      generatedAlerts.push({
        id: 4,
        type: 'rainfall',
        title: 'Heavy Rainfall',
        description: 'Heavy rain expected. Ensure proper drainage in fields.',
        severity: 'medium',
        icon: '⛈️',
      });
    }

    // Good conditions
    if (generatedAlerts.length === 0) {
      generatedAlerts.push({
        id: 5,
        type: 'good',
        title: 'Favorable Conditions',
        description: 'Weather conditions are favorable for farming activities.',
        severity: 'low',
        icon: '✅',
      });
    }

    setAlerts(generatedAlerts);
  };

  const handleQuickCity = (city) => {
    const weatherData = DUMMY_WEATHER_DATA[city];
    setLocation(city.charAt(0).toUpperCase() + city.slice(1));
    setWeather(weatherData);
    setError('');
    storage.set('cachedWeather', {
      data: weatherData,
      timestamp: Date.now(),
    });
    generateAlerts(weatherData);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-300';
      case 'high':
        return isDarkMode ? 'bg-orange-900 border-orange-700' : 'bg-orange-50 border-orange-300';
      case 'medium':
        return isDarkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-300';
      default:
        return isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-300';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">⛈️ Climate Alerts</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Get real-time weather alerts and climate risk warnings
        </p>

        {/* Location Input */}
        <Card title="Enter Your Location" isDarkMode={isDarkMode} className="mb-8">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city name (e.g., Mumbai, Delhi)"
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
              />
              <Button onClick={fetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            {/* Quick City Selection */}
            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
              <p className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Quick Cities:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {Object.keys(DUMMY_WEATHER_DATA).map((city) => (
                  <button
                    key={city}
                    onClick={() => handleQuickCity(city)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-primary text-white'
                        : 'bg-gray-200 hover:bg-primary text-gray-900 hover:text-white'
                    }`}
                  >
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {loading && <Loading isDarkMode={isDarkMode} />}

        {/* Weather Map */}
        <Card title="Location Map" isDarkMode={isDarkMode} className="mb-8">
          <WeatherMap 
            isDarkMode={isDarkMode} 
            selectedCity={location}
            onCityClick={handleQuickCity}
          />
        </Card>

        {weather && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Current Weather */}
            <Card title="Current Weather" isDarkMode={isDarkMode}>
              <div className="space-y-3">
                <div className="text-center py-4">
                  <div className="text-6xl mb-2">
                    {weather.main.temp > 20 ? '☀️' : weather.main.temp > 10 ? '⛅' : '❄️'}
                  </div>
                  <p className="text-3xl font-bold text-primary">{weather.main.temp}°C</p>
                </div>
                <div className={`grid grid-cols-2 gap-2 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div>
                    <p className="text-xs font-semibold">Humidity</p>
                    <p className="text-lg text-primary">{weather.main.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Wind Speed</p>
                    <p className="text-lg text-primary">{weather.wind.speed} m/s</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Pressure</p>
                    <p className="text-lg text-primary">{weather.main.pressure} hPa</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Condition</p>
                    <p className="text-lg text-primary">{weather.weather[0].main}</p>
                  </div>
                </div>
                <p className="text-sm text-center">📍 {weather.name}, {weather.sys.country}</p>
              </div>
            </Card>

            {/* Summary Stats */}
            <Card title="Temperature Range" isDarkMode={isDarkMode}>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="text-sm font-semibold mb-1">Maximum Temperature</p>
                  <p className="text-2xl text-primary font-bold">{weather.main.temp_max}°C</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="text-sm font-semibold mb-1">Minimum Temperature</p>
                  <p className="text-2xl text-primary font-bold">{weather.main.temp_min}°C</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="text-sm font-semibold mb-1">Feels Like</p>
                  <p className="text-2xl text-primary font-bold">{weather.main.feels_like}°C</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Alerts */}
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Active Alerts</h2>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-2 rounded-lg p-4 flex gap-4 ${getSeverityColor(alert.severity)}`}
            >
              <span className="text-3xl shrink-0">{alert.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-primary">{alert.title}</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {alert.description}
                </p>
              </div>
              {alert.severity === 'low' && (
                <CheckCircleIcon className="w-6 h-6 text-green-500 shrink-0" />
              )}
              {alert.severity !== 'low' && (
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClimateAlerts;
