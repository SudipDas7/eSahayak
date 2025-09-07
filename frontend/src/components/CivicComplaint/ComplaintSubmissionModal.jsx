import React, { useState, useRef } from 'react';
import { Camera, MapPin, X } from 'lucide-react';

const ComplaintSubmissionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    description: '',
    location: '',
    type: 'road'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.image || !formData.description || !formData.location) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    const complaint = {
      id: Date.now(),
      ...formData,
      image: imagePreview,
      dateSubmitted: new Date().toISOString(),
      likes: 0,
      verifications: 0,
      status: 'pending',
      timeline: [
        { status: 'submitted', date: new Date().toISOString(), active: true },
        { status: 'verified', date: null, active: false },
        { status: 'in-progress', date: null, active: false },
        { status: 'resolved', date: null, active: false }
      ]
    };
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(complaint);
      setIsSubmitting(false);
      setFormData({ image: null, description: '', location: '', type: 'road' });
      setImagePreview(null);
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setFormData({ image: null, description: '', location: '', type: 'road' });
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Submit New Complaint</h2>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Evidence <span className="text-red-500">*</span>
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 hover:bg-gray-100"
              >
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded">
                      <span className="text-white text-sm">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload photo</span>
                    <span className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the problem in detail..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter exact location"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Category
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="road">🛣️ Road & Infrastructure</option>
                <option value="garbage">🗑️ Garbage & Waste</option>
                <option value="water">💧 Water Supply</option>
                <option value="electricity">⚡ Electricity</option>
                <option value="drainage">🌊 Drainage</option>
                <option value="other">📋 Other</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSubmissionModal;
