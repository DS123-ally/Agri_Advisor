/**
 * Crop Recommendation Page
 * Form to get crop recommendations based on soil type, location, and water level
 */

import React, { useState, useEffect } from 'react';
import { validation } from '../utils/validation';
import { recordManager } from '../utils/recordManager';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import cropRulesData from '../data/cropRules.json';
import { TrashIcon } from '@heroicons/react/24/outline';

const CropRecommendation = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    soilType: '',
    location: '',
    waterLevel: '',
    farmerName: '',
  });

  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [savedRecs, setSavedRecs] = useState([]);

  useEffect(() => {
    // Load saved recommendations from recordManager
    const saved = recordManager.cropRecommendations.getAll();
    setSavedRecs(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getRecommendations = () => {
    if (!validation.isNotEmpty(formData.soilType) || 
        !validation.isNotEmpty(formData.location) ||
        !validation.isNotEmpty(formData.waterLevel)) {
      alert('Please fill all fields');
      return;
    }

    // Filter crops based on criteria
    const filtered = cropRulesData.crops.filter(crop => {
      const soilMatch = crop.soilTypes.includes(formData.soilType);
      const locationMatch = crop.locations.includes(formData.location) || crop.locations.includes('all');
      const waterMatch = crop.waterLevel === formData.waterLevel;
      return soilMatch && locationMatch && waterMatch;
    });

    setRecommendations(filtered);
    setShowModal(true);
  };

  const saveRecommendation = (crop) => {
    const newRec = recordManager.cropRecommendations.add({
      crop: crop.name,
      soilType: formData.soilType,
      location: formData.location,
      waterLevel: formData.waterLevel,
      farmerName: formData.farmerName || 'Anonymous',
      description: crop.description,
    });

    setSavedRecs(recordManager.cropRecommendations.getAll());
    alert(`${crop.name} saved to recommendations!`);
  };

  const deleteRecommendation = (id) => {
    recordManager.cropRecommendations.delete(id);
    setSavedRecs(recordManager.cropRecommendations.getAll());
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">🌾 Crop Recommendation</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Get personalized crop suggestions based on your farm conditions
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card title="Your Farm Details" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Farmer Name</label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  placeholder="Your name (optional)"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Soil Type</label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Select Soil Type</option>
                  <option value="clayey">Clayey</option>
                  <option value="loamy">Loamy</option>
                  <option value="sandy-loam">Sandy-Loam</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Select Location</option>
                  <option value="north">North India</option>
                  <option value="central">Central India</option>
                  <option value="south">South India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Water Level</label>
                <select
                  name="waterLevel"
                  value={formData.waterLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Select Water Availability</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <Button onClick={getRecommendations} size="lg" className="w-full">
                Get Recommendations
              </Button>
            </div>
          </Card>

          {/* Saved Recommendations */}
          <Card title="Saved Recommendations" isDarkMode={isDarkMode}>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {savedRecs.length === 0 ? (
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No saved recommendations yet. Get started by filling the form!
                </p>
              ) : (
                savedRecs.map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-3 rounded-lg flex justify-between items-start ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-bold text-primary">{rec.crop}</p>
                      <p className="text-sm">{rec.farmerName} - {new Date(rec.createdAt).toLocaleDateString()}</p>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {rec.soilType} | {rec.location} | {rec.waterLevel}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteRecommendation(rec.id)}
                      className="ml-2 p-2 hover:bg-red-500 rounded transition-colors text-red-500 hover:text-white"
                      title="Delete recommendation"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Recommendations Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Recommended Crops"
          isDarkMode={isDarkMode}
        >
          {recommendations.length === 0 ? (
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              No crops found matching your criteria. Try different options.
            </p>
          ) : (
            <div className="space-y-4">
              {recommendations.map((crop) => (
                <div
                  key={crop.id}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <h4 className="font-bold text-lg text-primary mb-2">{crop.name}</h4>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {crop.description}
                  </p>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Season: {crop.season}
                  </p>
                  <Button
                    onClick={() => saveRecommendation(crop)}
                    variant="primary"
                    size="sm"
                  >
                    Save This Recommendation
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CropRecommendation;
