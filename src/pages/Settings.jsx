/**
 * Settings Page
 * Language and theme preferences saved to LocalStorage
 */

import React, { useState, useEffect } from 'react';
import { recordManager } from '../utils/recordManager';
import Card from '../components/Card';
import Button from '../components/Button';
import { TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const Settings = ({ isDarkMode, setIsDarkMode }) => {
  const [farmSettings, setFarmSettings] = useState({});
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // Load settings from recordManager
    const settings = recordManager.farmSettings.get();
    setFarmSettings(settings);
    
    // Load statistics
    const stats = recordManager.getStatistics();
    setStatistics(stats);
  }, []);

  const handleFarmSettingChange = (key, value) => {
    const updated = { ...farmSettings, [key]: value };
    setFarmSettings(updated);
    recordManager.farmSettings.update({ [key]: value });
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    recordManager.farmSettings.update({ theme: !isDarkMode ? 'dark' : 'light' });
  };

  const exportData = () => {
    const allData = recordManager.exportAll();
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agri-advisor-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const success = recordManager.importAll(data);
        if (success) {
          alert('Data imported successfully! Please refresh the page.');
          setStatistics(recordManager.getStatistics());
        }
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('This will delete all your data. This action cannot be undone. Continue?')) {
      recordManager.deleteAllData();
      alert('All data cleared. Refreshing page...');
      window.location.reload();
    }
  };

  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Customize your experience',
      display: 'Display Settings',
      theme: 'Theme',
      language: 'Language',
      notification: 'Notification Settings',
      enableNotif: 'Enable Notifications',
      autoSync: 'Auto Sync Data',
      dataManagement: 'Data Management',
      export: 'Export Data',
      import: 'Import Data',
      clearAll: 'Clear All Data',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
    hi: {
      title: 'सेटिंग्स',
      subtitle: 'अपने अनुभव को कस्टमाइज़ करें',
      display: 'डिस्प्ले सेटिंग्स',
      theme: 'थीम',
      language: 'भाषा',
      notification: 'सूचना सेटिंग्स',
      enableNotif: 'सूचनाएं सक्षम करें',
      autoSync: 'डेटा स्वचालित सिंक करें',
      dataManagement: 'डेटा प्रबंधन',
      export: 'डेटा निर्यात करें',
      import: 'डेटा आयात करें',
      clearAll: 'सभी डेटा साफ़ करें',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">⚙️ {t.title}</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.subtitle}
        </p>

        <div className="space-y-6">
          {/* Display Settings */}
          <Card title={`🎨 ${t.display}`} isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <label className="text-sm font-semibold">{t.theme}</label>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full ${
                    isDarkMode ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      isDarkMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm">{isDarkMode ? t.darkMode : t.lightMode}</span>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                <label className="block text-sm font-semibold mb-2">{t.language}</label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card title={`🔔 ${t.notification}`} isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <label className="text-sm font-semibold">{t.enableNotif}</label>
                <button
                  onClick={() => handleToggle('notifications', !notifications)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full ${
                    notifications ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                <div className="flex items-center justify-between py-3">
                  <label className="text-sm font-semibold">{t.autoSync}</label>
                  <button
                    onClick={() => handleToggle('autoSync', !autoSync)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full ${
                      autoSync ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                        autoSync ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Farm Settings */}
          <Card title="🏡 Farm Settings" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Farm Name</label>
                <input
                  type="text"
                  value={farmSettings.farmName || ''}
                  onChange={(e) => handleFarmSettingChange('farmName', e.target.value)}
                  placeholder="e.g., Green Valley Farm"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input
                  type="text"
                  value={farmSettings.location || ''}
                  onChange={(e) => handleFarmSettingChange('location', e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Farm Area (hectares)</label>
                  <input
                    type="number"
                    value={farmSettings.area || ''}
                    onChange={(e) => handleFarmSettingChange('area', e.target.value)}
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
                    value={farmSettings.soilType || ''}
                    onChange={(e) => handleFarmSettingChange('soilType', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">Select Soil Type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="alluvial">Alluvial</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Statistics */}
          <Card title="📊 Data Statistics" isDarkMode={isDarkMode}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className="text-xs font-semibold text-primary">Crop Recommendations</p>
                <p className="text-2xl font-bold text-primary">{statistics.totalCropRecommendations || 0}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <p className="text-xs font-semibold text-primary">Water Records</p>
                <p className="text-2xl font-bold text-primary">{statistics.totalWaterRecords || 0}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <p className="text-xs font-semibold text-primary">Community Posts</p>
                <p className="text-2xl font-bold text-primary">{statistics.totalCommunityPosts || 0}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <p className="text-xs font-semibold text-primary">Weather Records</p>
                <p className="text-2xl font-bold text-primary">{statistics.totalWeatherRecords || 0}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-pink-50'}`}>
                <p className="text-xs font-semibold text-primary">Notifications</p>
                <p className="text-2xl font-bold text-primary">{statistics.totalNotifications || 0}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                <p className="text-xs font-semibold text-primary">Unread</p>
                <p className="text-2xl font-bold text-primary">{statistics.unreadNotifications || 0}</p>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card title={`💾 ${t.dataManagement}`} isDarkMode={isDarkMode}>
            <div className="space-y-3">
              <Button onClick={exportData} variant="primary" className="w-full">
                📥 {t.export}
              </Button>
              <div className="relative">
                <Button variant="secondary" className="w-full">
                  📤 {t.import}
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Button
                onClick={clearAllData}
                variant="danger"
                className="w-full"
              >
                🗑️ {t.clearAll}
              </Button>
            </div>
          </Card>

          {/* About */}
          <Card title="ℹ️ About" isDarkMode={isDarkMode}>
            <div className={`space-y-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p><span className="font-semibold">App Name:</span> Smart & Climate-Resilient Agriculture Advisor</p>
              <p><span className="font-semibold">Version:</span> 1.0.0</p>
              <p><span className="font-semibold">Storage:</span> LocalStorage (No backend required)</p>
              <p><span className="font-semibold">Offline Support:</span> ✅ Full PWA support</p>
              <p><span className="font-semibold">Made with:</span> React, Vite, Tailwind CSS, Recharts</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
