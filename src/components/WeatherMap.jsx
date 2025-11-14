/**
 * Weather Map Component
 * Display a simple interactive weather map with city locations
 */

import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

const CITY_COORDINATES = {
  'mumbai': { lat: 19.0760, lng: 72.8777, temp: 32 },
  'delhi': { lat: 28.6139, lng: 77.2090, temp: 28 },
  'bangalore': { lat: 12.9716, lng: 77.5946, temp: 26 },
  'hyderabad': { lat: 17.3850, lng: 78.4867, temp: 30 },
  'pune': { lat: 18.5204, lng: 73.8567, temp: 27 },
  'kolkata': { lat: 22.5726, lng: 88.3639, temp: 29 },
  'chennai': { lat: 13.0827, lng: 80.2707, temp: 31 },
  'indore': { lat: 22.7196, lng: 75.8577, temp: 26 },
  'lucknow': { lat: 26.8467, lng: 80.9462, temp: 24 },
  'jaipur': { lat: 26.9124, lng: 75.7873, temp: 25 },
  'chandigarh': { lat: 30.7333, lng: 76.7794, temp: 22 },
  'amritsar': { lat: 31.6340, lng: 74.8711, temp: 20 },
  'surat': { lat: 21.1458, lng: 72.1984, temp: 33 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714, temp: 32 },
  'nagpur': { lat: 21.1458, lng: 79.0882, temp: 28 },
};

const WeatherMap = ({ isDarkMode, selectedCity, onCityClick }) => {
  // Calculate bounds for India
  const minLat = 8;
  const maxLat = 35;
  const minLng = 68;
  const maxLng = 97;

  // Map dimensions
  const mapWidth = 600;
  const mapHeight = 400;

  // Convert coordinates to SVG coordinates
  const latToY = (lat) => {
    return ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
  };

  const lngToX = (lng) => {
    return ((lng - minLng) / (maxLng - minLng)) * mapWidth;
  };

  const getTemperatureColor = (temp) => {
    if (temp > 32) return '#ef4444'; // Red - Very Hot
    if (temp > 28) return '#f97316'; // Orange - Hot
    if (temp > 24) return '#eab308'; // Yellow - Warm
    if (temp > 20) return '#84cc16'; // Lime - Cool
    return '#06b6d4'; // Cyan - Cold
  };

  return (
    <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h3 className="font-bold text-lg mb-4">🗺️ India Weather Map</h3>
      
      <div className="flex justify-center overflow-x-auto">
        <svg
          width={mapWidth}
          height={mapHeight}
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className={`border-2 rounded-lg ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
        >
          {/* India simplified background */}
          <rect width={mapWidth} height={mapHeight} fill={isDarkMode ? '#1f2937' : '#e5e7eb'} />

          {/* Grid lines */}
          {[...Array(5)].map((_, i) => {
            const x = (i / 4) * mapWidth;
            return (
              <line
                key={`vline-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={mapHeight}
                stroke={isDarkMode ? '#374151' : '#d1d5db'}
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
          {[...Array(5)].map((_, i) => {
            const y = (i / 4) * mapHeight;
            return (
              <line
                key={`hline-${i}`}
                x1={0}
                y1={y}
                x2={mapWidth}
                y2={y}
                stroke={isDarkMode ? '#374151' : '#d1d5db'}
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}

          {/* Cities */}
          {Object.entries(CITY_COORDINATES).map(([city, { lat, lng, temp }]) => {
            const x = lngToX(lng);
            const y = latToY(lat);
            const isSelected = selectedCity?.toLowerCase() === city;
            const color = getTemperatureColor(temp);

            return (
              <g
                key={city}
                onClick={() => onCityClick(city)}
                className="cursor-pointer"
                style={{ transition: 'all 0.2s' }}
              >
                {/* Outer circle for selection */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                )}

                {/* Main circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={color}
                  opacity={isSelected ? 1 : 0.8}
                  className="hover:opacity-100"
                  stroke={isDarkMode ? '#374151' : '#d1d5db'}
                  strokeWidth="2"
                />

                {/* Temperature label */}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={temp > 30 || temp < 15 ? 'white' : 'black'}
                  pointerEvents="none"
                >
                  {temp}°
                </text>

                {/* City name tooltip on hover */}
                <title>{city.charAt(0).toUpperCase() + city.slice(1)}: {temp}°C</title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Temperature Legend */}
      <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span>&gt;32°C</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span>28-32°C</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span>24-28°C</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-lime-500"></div>
          <span>20-24°C</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
          <span>&lt;20°C</span>
        </div>
      </div>

      <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Click on a city dot to view its weather details
      </p>
    </div>
  );
};

export default WeatherMap;
