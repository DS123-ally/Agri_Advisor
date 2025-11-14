/**
 * Farmer Profile Page
 * Store farmer details, documents, and personal information
 */

import React, { useState, useEffect } from 'react';
import { recordManager } from '../utils/recordManager';
import Card from '../components/Card';
import Button from '../components/Button';
import { DocumentArrowUpIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const FarmerProfile = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    fatherName: '',
    village: '',
    city: '',
    state: '',
    pincode: '',
    birthDate: '',
    aadharNumber: '',
    phoneNumber: '',
    email: '',
    cropType: '',
    farmArea: '',
  });

  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [saved, setSaved] = useState(false);

  const DOCUMENT_TYPES = [
    { name: 'Aadhar Card', key: 'aadhar', required: true },
    { name: 'Land Document (Krushi Bhumi Praman Patra)', key: 'landDoc', required: true },
    { name: 'Bank Passbook', key: 'bankPassbook', required: false },
    { name: 'Ration Card', key: 'rationCard', required: false },
    { name: 'Photo ID', key: 'photoId', required: false },
  ];

  useEffect(() => {
    // Load farmer profile
    const farmerSettings = recordManager.farmSettings.get();
    if (farmerSettings && farmerSettings.farmerProfile) {
      setFormData(farmerSettings.farmerProfile);
    }

    // Load documents
    const savedDocs = localStorage.getItem('farmerDocuments');
    if (savedDocs) {
      try {
        setUploadedFiles(JSON.parse(savedDocs));
      } catch (e) {
        console.error('Error loading documents:', e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type (images and PDFs only)
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, PNG, or PDF files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const updatedFiles = {
        ...uploadedFiles,
        [docType]: {
          name: file.name,
          type: file.type,
          data: event.target.result,
          uploadedAt: new Date().toISOString(),
        },
      };
      setUploadedFiles(updatedFiles);
      localStorage.setItem('farmerDocuments', JSON.stringify(updatedFiles));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    // Validate required fields
    if (!formData.farmerName || !formData.aadharNumber || !formData.village || !formData.city) {
      alert('Please fill all required fields');
      return;
    }

    // Validate Aadhar (12 digits)
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      alert('Aadhar number must be 12 digits');
      return;
    }

    // Check required documents
    const requiredDocs = DOCUMENT_TYPES.filter(d => d.required).map(d => d.key);
    const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc]);
    if (missingDocs.length > 0) {
      alert(`Please upload required documents: ${missingDocs.join(', ')}`);
      return;
    }

    // Save profile
    recordManager.farmSettings.update({ farmerProfile: formData });
    setSaved(true);
    alert('Farmer profile saved successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteDocument = (docType) => {
    const updated = { ...uploadedFiles };
    delete updated[docType];
    setUploadedFiles(updated);
    localStorage.setItem('farmerDocuments', JSON.stringify(updated));
  };

  const downloadDocument = (docType) => {
    const doc = uploadedFiles[docType];
    if (!doc) return;

    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    link.click();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">👨‍🌾 Farmer Profile</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Register your farm and personal details for government schemes
        </p>

        {saved && (
          <div className="mb-4 p-4 bg-green-500 text-white rounded-lg flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            Profile saved successfully!
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card title="👤 Personal Information" isDarkMode={isDarkMode}>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Farmer Name *</label>
                    <input
                      type="text"
                      name="farmerName"
                      value={formData.farmerName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="Father's name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Aadhar Number *</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    placeholder="12-digit Aadhar number"
                    maxLength="12"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit phone"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Address Information */}
            <Card title="📍 Address Information" isDarkMode={isDarkMode}>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Village *</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      placeholder="Village name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">City/Town *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City/town name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Pin Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pin code"
                      maxLength="6"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Farm Information */}
            <Card title="🌾 Farm Information" isDarkMode={isDarkMode}>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Farm Area (hectares)</label>
                    <input
                      type="number"
                      name="farmArea"
                      value={formData.farmArea}
                      onChange={handleInputChange}
                      placeholder="Area in hectares"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Primary Crop Type</label>
                    <select
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Select crop</option>
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="cotton">Cotton</option>
                      <option value="sugarcane">Sugarcane</option>
                      <option value="corn">Corn</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="pulses">Pulses</option>
                      <option value="oilseeds">Oilseeds</option>
                      <option value="spices">Spices</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <Button onClick={saveProfile} size="lg" className="w-full">
              💾 Save Farmer Profile
            </Button>
          </div>

          {/* Document Upload Sidebar */}
          <div className="space-y-4">
            <Card title="📄 Document Upload" isDarkMode={isDarkMode}>
              <div className="space-y-3">
                {DOCUMENT_TYPES.map((doc) => (
                  <div
                    key={doc.key}
                    className={`p-3 rounded-lg border-2 ${
                      uploadedFiles[doc.key]
                        ? isDarkMode
                          ? 'border-green-600 bg-green-900'
                          : 'border-green-300 bg-green-50'
                        : isDarkMode
                        ? 'border-gray-600 bg-gray-700'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm flex items-center gap-1">
                          {doc.name}
                          {doc.required && <span className="text-red-500">*</span>}
                        </p>
                        {uploadedFiles[doc.key] && (
                          <p className="text-xs mt-1 text-green-600">
                            ✓ {uploadedFiles[doc.key].name}
                          </p>
                        )}
                      </div>
                      {uploadedFiles[doc.key] && (
                        <CheckCircleIcon className="w-5 h-5 text-green-600 shrink-0" />
                      )}
                    </div>

                    {uploadedFiles[doc.key] ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadDocument(doc.key)}
                          className="flex-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                        >
                          ⬇️ Download
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.key)}
                          className="flex-1 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ) : (
                      <label className="block cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white text-xs rounded hover:opacity-90 transition">
                          <DocumentArrowUpIcon className="w-4 h-4" />
                          Upload
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, doc.key)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 text-gray-500">
                Max file size: 5MB. Allowed: JPG, PNG, PDF
              </p>
            </Card>

            {/* Summary */}
            <Card title="📊 Profile Summary" isDarkMode={isDarkMode}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Profile Status:</span>
                  <span className={formData.farmerName ? 'text-green-600' : 'text-red-600'}>
                    {formData.farmerName ? '✓ Filled' : '○ Empty'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-bold">{Object.keys(uploadedFiles).length} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Docs:</span>
                  <span className={Object.keys(uploadedFiles).includes('aadhar') && Object.keys(uploadedFiles).includes('landDoc') ? 'text-green-600' : 'text-red-600'}>
                    {Object.keys(uploadedFiles).includes('aadhar') && Object.keys(uploadedFiles).includes('landDoc') ? '✓' : '○'} Complete
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
