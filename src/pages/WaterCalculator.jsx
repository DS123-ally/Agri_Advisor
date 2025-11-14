/**
 * Water Usage Calculator Page
 * Calculate irrigation needs and track water usage history
 */

import React, { useState, useEffect } from 'react';
import { validation } from '../utils/validation';
import { recordManager } from '../utils/recordManager';
import Card from '../components/Card';
import Button from '../components/Button';
import waterRulesData from '../data/waterUsageRules.json';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrashIcon } from '@heroicons/react/24/outline';

const WaterCalculator = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    crop: '',
    area: '',
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from recordManager
    const saved = recordManager.waterUsage.getAll();
    setHistory(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateWaterUsage = () => {
    if (!validation.isNotEmpty(formData.crop) || !validation.isPositive(parseFloat(formData.area))) {
      alert('Please fill all fields with valid values');
      return;
    }

    const cropData = waterRulesData.crops.find(c => c.name === formData.crop);
    if (!cropData) {
      alert('Crop not found');
      return;
    }

    // Calculate water requirement: (mm × 10000 × hectares) / efficiency
    const area = parseFloat(formData.area);
    const waterNeeded = (cropData.waterRequirement * 10000 * area) / cropData.efficiency;

    const calculation = {
      crop: cropData.name,
      area: area,
      waterRequirement: cropData.waterRequirement,
      irrigationMethod: cropData.irrigationMethod,
      efficiency: (cropData.efficiency * 100).toFixed(0),
      totalWater: Math.round(waterNeeded),
      waterPerHectare: Math.round(waterNeeded / area),
    };

    // Save to history using recordManager
    recordManager.waterUsage.add(calculation);
    setResult(calculation);

    // Update UI
    const updated = recordManager.waterUsage.getAll();
    setHistory(updated);
  };

  const deleteRecord = (id) => {
    recordManager.waterUsage.delete(id);
    setHistory(recordManager.waterUsage.getAll());
  };

  const clearHistory = () => {
    if (window.confirm('Clear all water usage history?')) {
      recordManager.waterUsage.deleteAll();
      setHistory([]);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">💧 Water Usage Calculator</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Calculate irrigation needs for your crops
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Calculator Form */}
          <Card title="Calculate Water Usage" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Select Crop</label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Select Crop</option>
                  {waterRulesData.crops.map((crop) => (
                    <option key={crop.name} value={crop.name}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Area (hectares)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter area in hectares"
                  step="0.1"
                  min="0"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>

              <Button onClick={calculateWaterUsage} size="lg" className="w-full">
                Calculate
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <h3 className="font-bold text-lg text-primary mb-3">Results</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Total Water:</span> {(result.totalWater / 1000000).toFixed(2)} Million Liters</p>
                  <p><span className="font-semibold">Per Hectare:</span> {(result.waterPerHectare / 10000).toFixed(2)} Million Liters</p>
                  <p><span className="font-semibold">Method:</span> {result.irrigationMethod}</p>
                  <p><span className="font-semibold">Efficiency:</span> {result.efficiency}%</p>
                </div>
              </div>
            )}
          </Card>

          {/* History Chart */}
          <Card title="Water Usage History" isDarkMode={isDarkMode}>
            {history.length > 0 ? (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={history.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="waterPerHectare" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={clearHistory}
                  className="mt-4 w-full"
                >
                  Clear History
                </Button>
              </div>
            ) : (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                No history yet. Calculate water usage to see history here.
              </p>
            )}
          </Card>
        </div>

        {/* Detailed History */}
        {history.length > 0 && (
          <Card title="All Calculations" isDarkMode={isDarkMode}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <th className="text-left py-2 px-2 font-semibold">Crop</th>
                    <th className="text-left py-2 px-2 font-semibold">Area (ha)</th>
                    <th className="text-left py-2 px-2 font-semibold">Total Water (ML)</th>
                    <th className="text-left py-2 px-2 font-semibold">Method</th>
                    <th className="text-left py-2 px-2 font-semibold">Date</th>
                    <th className="text-left py-2 px-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((calc) => (
                    <tr
                      key={calc.id}
                      className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                    >
                      <td className="py-2 px-2">{calc.crop}</td>
                      <td className="py-2 px-2">{calc.area}</td>
                      <td className="py-2 px-2">{(calc.totalWater / 1000000).toFixed(2)}</td>
                      <td className="py-2 px-2">{calc.irrigationMethod}</td>
                      <td className="py-2 px-2">{new Date(calc.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-2">
                        <button
                          onClick={() => deleteRecord(calc.id)}
                          className="p-1 hover:bg-red-500 rounded transition-colors text-red-500 hover:text-white"
                          title="Delete record"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WaterCalculator;
