/**
 * Government Schemes & Yojana Page
 * Display farming schemes, subsidies, and government programs
 */

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { StarIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const GovernmentSchemes = ({ isDarkMode }) => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  const SCHEMES = [
    {
      id: 1,
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      category: 'income-support',
      state: 'National',
      benefits: '₹6000 per year in 3 installments',
      eligibility: 'All landholding farmers',
      description: 'Direct income support scheme providing ₹6000 per year to all farmer households.',
      amount: '₹6000/year',
      url: 'https://pmkisan.gov.in',
      highlights: ['Direct bank transfer', 'No loan needed', 'For all farmers']
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'crop-insurance',
      state: 'National',
      benefits: 'Comprehensive crop insurance coverage',
      eligibility: 'All farmers growing notified crops',
      description: 'Crop insurance scheme protecting farmers against crop failure due to natural calamities.',
      amount: 'Premium varies by crop',
      url: 'https://pmfby.gov.in',
      highlights: ['Insurance coverage', 'Fair compensation', 'Easy claims']
    },
    {
      id: 3,
      name: 'Soil Health Card Scheme',
      category: 'soil-health',
      state: 'National',
      benefits: 'Free soil testing and recommendations',
      eligibility: 'All farmers',
      description: 'Provides soil health cards with nutrient information and fertilizer recommendations.',
      amount: 'Free',
      url: 'https://soilhealth.dac.gov.in',
      highlights: ['Free testing', 'Customized recommendations', 'Online portal']
    },
    {
      id: 4,
      name: 'Rashtriya Krishi Vikas Yojana',
      category: 'development',
      state: 'National',
      benefits: 'Agricultural development and modernization',
      eligibility: 'Farmers and agricultural entrepreneurs',
      description: 'Focuses on agricultural development through state-specific interventions.',
      amount: 'Varies by project',
      url: 'https://rkvy.nic.in',
      highlights: ['Modern equipment', 'Infrastructure', 'Training']
    },
    {
      id: 5,
      name: 'Kisan Credit Card (KCC)',
      category: 'credit',
      state: 'National',
      benefits: 'Agricultural credit at concessional rates',
      eligibility: 'Farmers engaged in cultivation',
      description: 'Easy credit access for agricultural operations and investment activities.',
      amount: 'Up to ₹5 lakh',
      url: 'https://www.nabard.org',
      highlights: ['Low interest rates', 'Easy process', 'Flexible repayment']
    },
    {
      id: 6,
      name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'organic-farming',
      state: 'National',
      benefits: 'Support for organic farming adoption',
      eligibility: 'Farmers interested in organic farming',
      description: 'Promotes organic farming through cluster approach and subsidies.',
      amount: 'Up to ₹50,000 per hectare',
      url: 'https://www.dae.gov.in',
      highlights: ['Organic certification', 'Market linkage', 'Training support']
    },
    {
      id: 7,
      name: 'Pradhan Mantri Krishi Sinchayee Yojana',
      category: 'irrigation',
      state: 'National',
      benefits: '50-75% subsidy on micro-irrigation',
      eligibility: 'Farmers with land and water source',
      description: 'Promotes micro-irrigation and water-saving techniques.',
      amount: '50-75% subsidy',
      url: 'https://pmksy.gov.in',
      highlights: ['Water conservation', 'Technology support', 'Expert guidance']
    },
    {
      id: 8,
      name: 'Sukanya Samriddhi Yojana',
      category: 'savings',
      state: 'National',
      benefits: 'High-interest savings for girl children',
      eligibility: 'Parents of girl child',
      description: 'Savings scheme for education and marriage of girl children.',
      amount: 'High interest rates',
      url: 'https://www.indiapost.gov.in',
      highlights: ['Tax benefits', 'Safe investment', 'Government backed']
    },
    {
      id: 9,
      name: 'Pradhan Mantri Fasal Bima Yojana Weather Based',
      category: 'crop-insurance',
      state: 'Regional',
      benefits: 'Weather-triggered indemnity',
      eligibility: 'Farmers in notified areas',
      description: 'Insurance triggered automatically by adverse weather conditions.',
      amount: 'Premium varies',
      url: 'https://pmfby.gov.in',
      highlights: ['Weather triggers', 'Quick settlement', 'Real-time monitoring']
    },
    {
      id: 10,
      name: 'National Mission for Sustainable Agriculture',
      category: 'sustainability',
      state: 'National',
      benefits: 'Sustainable farming practices support',
      eligibility: 'All farmers',
      description: 'Promotes sustainable agriculture including natural farming.',
      amount: 'Support up to ₹10,000',
      url: 'https://nmsa.dac.gov.in',
      highlights: ['Sustainable practices', 'Resource conservation', 'Market support']
    },
    {
      id: 11,
      name: 'Pradhan Mantri Annadata Aay Sanrakshan Abhiyaan',
      category: 'income-support',
      state: 'National',
      benefits: 'Income support and price stability',
      eligibility: 'Farmers selling regulated commodities',
      description: 'Ensures minimum income support through price guarantees.',
      amount: 'Minimum price guarantee',
      url: 'https://pib.gov.in',
      highlights: ['Price support', 'Guaranteed purchase', 'Fair compensation']
    },
    {
      id: 12,
      name: 'Mahila Kisan Samrudhi Yojana',
      category: 'women-farmers',
      state: 'National',
      benefits: 'Special support for women farmers',
      eligibility: 'Women farmers and groups',
      description: 'Dedicated scheme for women farmer empowerment and support.',
      amount: 'Subsidies and training',
      url: 'https://www.dae.gov.in',
      highlights: ['Women empowerment', 'Training', 'Market linkage']
    },
  ];

  const CATEGORIES = [
    { id: 'all', name: 'All Schemes', icon: '📋' },
    { id: 'income-support', name: 'Income Support', icon: '💰' },
    { id: 'crop-insurance', name: 'Crop Insurance', icon: '🛡️' },
    { id: 'credit', name: 'Credit & Loans', icon: '💳' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'organic-farming', name: 'Organic Farming', icon: '🌱' },
    { id: 'women-farmers', name: 'Women Farmers', icon: '👩‍🌾' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('savedSchemes');
    if (saved) {
      setSavedSchemes(JSON.parse(saved));
    }
  }, []);

  const filteredSchemes = filterCategory === 'all' 
    ? SCHEMES 
    : SCHEMES.filter(s => s.category === filterCategory);

  const toggleSaveScheme = (schemeId) => {
    let updated;
    if (savedSchemes.includes(schemeId)) {
      updated = savedSchemes.filter(id => id !== schemeId);
    } else {
      updated = [...savedSchemes, schemeId];
    }
    setSavedSchemes(updated);
    localStorage.setItem('savedSchemes', JSON.stringify(updated));
  };

  const isSaved = (schemeId) => savedSchemes.includes(schemeId);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">🏛️ Government Schemes & Yojana</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Explore farming subsidies and government programs available for farmers
        </p>

        {/* Filter Categories */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  filterCategory === cat.id
                    ? 'bg-primary text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSchemes.map(scheme => (
            <Card
              key={scheme.id}
              title={scheme.name}
              isDarkMode={isDarkMode}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedScheme(selectedScheme?.id === scheme.id ? null : scheme)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase">{scheme.state}</p>
                    <p className="text-sm font-medium mt-1">{scheme.benefits}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveScheme(scheme.id);
                    }}
                    className="shrink-0 p-2 hover:bg-yellow-500 hover:text-white rounded transition"
                  >
                    <StarIcon className={`w-5 h-5 ${isSaved(scheme.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                </div>

                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {scheme.description}
                </p>

                <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-primary/10'}`}>
                  <p className="text-xs font-semibold text-primary">{scheme.amount}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {scheme.highlights.slice(0, 2).map((h, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {selectedScheme?.id === scheme.id && (
                  <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 space-y-3">
                    <div>
                      <p className="text-xs font-semibold mb-2">Eligibility:</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {scheme.eligibility}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-2">All Features:</p>
                      <div className="space-y-1">
                        {scheme.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={scheme.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-medium"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Learn More
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Saved Schemes */}
        {savedSchemes.length > 0 && (
          <Card title={`⭐ Your Saved Schemes (${savedSchemes.length})`} isDarkMode={isDarkMode}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCHEMES.filter(s => savedSchemes.includes(s.id)).map(scheme => (
                <div
                  key={scheme.id}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} border-2 border-yellow-400`}
                >
                  <p className="font-semibold text-primary text-sm mb-1">{scheme.name}</p>
                  <p className="text-xs mb-2">{scheme.benefits}</p>
                  <button
                    onClick={() => toggleSaveScheme(scheme.id)}
                    className="text-xs px-2 py-1 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500 transition"
                  >
                    Remove from Saved
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Important Notice */}
        <Card title="ℹ️ Important Information" isDarkMode={isDarkMode}>
          <div className={`space-y-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>✓ All schemes listed are government-approved programs</p>
            <p>✓ Eligibility criteria and benefits may vary by state</p>
            <p>✓ Applications can be submitted through official government portals</p>
            <p>✓ Contact your local agricultural office for specific guidance</p>
            <p>✓ No fees or registration charges for government schemes</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
