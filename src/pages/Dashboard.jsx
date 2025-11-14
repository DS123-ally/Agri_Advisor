/**
 * Dashboard Page
 * Show saved recommendations, water usage, and alerts using Recharts
 */

import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import Card from '../components/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ isDarkMode }) => {
  const [cropRecs, setCropRecs] = useState([]);
  const [waterHistory, setWaterHistory] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load all data
    setCropRecs(storage.get('cropRecommendations', []));
    setWaterHistory(storage.get('waterUsageHistory', []));
    setPosts(storage.get('communityPosts', []));
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Prepare data for charts
  const cropData = cropRecs.reduce((acc, rec) => {
    const existing = acc.find(item => item.name === rec.crop);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: rec.crop, count: 1 });
    }
    return acc;
  }, []);

  const waterTrendData = waterHistory.slice().reverse().map((item, index) => ({
    name: `${item.crop.substring(0, 3)}`,
    water: Math.round(item.totalWater / 1000000),
  }));

  const waterByMethod = waterHistory.reduce((acc, rec) => {
    const existing = acc.find(item => item.name === rec.irrigationMethod);
    if (existing) {
      existing.value += rec.totalWater;
    } else {
      acc.push({ name: rec.irrigationMethod, value: rec.totalWater });
    }
    return acc;
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">📊 Dashboard</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Overview of your recommendations, water usage, and community activity
        </p>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card isDarkMode={isDarkMode}>
            <div className="text-center">
              <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Crop Recommendations
              </p>
              <p className="text-3xl font-bold text-primary">{cropRecs.length}</p>
            </div>
          </Card>
          <Card isDarkMode={isDarkMode}>
            <div className="text-center">
              <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Water Calculations
              </p>
              <p className="text-3xl font-bold text-primary">{waterHistory.length}</p>
            </div>
          </Card>
          <Card isDarkMode={isDarkMode}>
            <div className="text-center">
              <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Community Posts
              </p>
              <p className="text-3xl font-bold text-primary">{posts.length}</p>
            </div>
          </Card>
          <Card isDarkMode={isDarkMode}>
            <div className="text-center">
              <p className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Water Used
              </p>
              <p className="text-3xl font-bold text-primary">
                {(waterHistory.reduce((sum, rec) => sum + rec.totalWater, 0) / 1000000).toFixed(0)}ML
              </p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Crop Recommendations Chart */}
          {cropData.length > 0 && (
            <Card title="Crop Recommendations" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cropData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, count }) => `${name}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {cropData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Water Usage Trend */}
          {waterTrendData.length > 0 && (
            <Card title="Water Usage Trend" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="water" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>

        {/* Irrigation Methods */}
        {waterByMethod.length > 0 && (
          <Card title="Water Usage by Irrigation Method" isDarkMode={isDarkMode} className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterByMethod}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Recommendations */}
          {cropRecs.length > 0 && (
            <Card title="Recent Recommendations" isDarkMode={isDarkMode}>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cropRecs.slice(0, 5).map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <p className="font-bold text-primary">{rec.crop}</p>
                    <p className="text-sm">{rec.farmerName}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rec.date}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Water Calculations */}
          {waterHistory.length > 0 && (
            <Card title="Recent Water Calculations" isDarkMode={isDarkMode}>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {waterHistory.slice(0, 5).map((calc, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <p className="font-bold text-primary">{calc.crop}</p>
                    <p className="text-sm">{calc.area} ha</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {(calc.totalWater / 1000000).toFixed(2)}ML - {calc.date}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Empty State */}
        {cropRecs.length === 0 && waterHistory.length === 0 && posts.length === 0 && (
          <Card isDarkMode={isDarkMode} className="text-center py-12">
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No data yet. Start by creating recommendations, calculating water usage, or joining the community!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
