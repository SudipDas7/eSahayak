import React from 'react';
import { MapPin, Clock, ThumbsUp, CheckCircle, Star, AlertCircle } from 'lucide-react';

// Component: Community Support Actions (moved from original CivicComplaint.jsx)
export const CommunitySupport = ({ complaint, onLike, onVerify, userInteractions = {} }) => {
  const credibilityScore = complaint.likes + complaint.verifications;
  const hasLiked = userInteractions[complaint.id]?.liked || false;
  const hasVerified = userInteractions[complaint.id]?.verified || false;

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onLike(complaint.id)}
          disabled={hasLiked}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
            hasLiked 
              ? 'bg-blue-500 text-white cursor-not-allowed' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105'
          }`}
        >
          <ThumbsUp size={16} />
          <span className="font-medium">{complaint.likes}</span>
        </button>
        
        <button
          onClick={() => onVerify(complaint.id)}
          disabled={hasVerified}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
            hasVerified
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-green-100 text-green-600 hover:bg-green-200 hover:scale-105'
          }`}
        >
          <CheckCircle size={16} />
          <span className="font-medium">{complaint.verifications}</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="font-bold text-gray-800">{credibilityScore}</span>
        <span className="text-xs text-gray-500">credibility</span>
      </div>
    </div>
  );
};

// Component: Complaint Card Item
const ComplaintCardItem = ({ complaint, onViewTimeline, onLike, onVerify, userInteractions }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <AlertCircle size={16} />,
        label: 'Pending Review'
      },
      'verified': { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <CheckCircle size={16} />,
        label: 'Verified'
      },
      'in-progress': { 
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: <Clock size={16} />,
        label: 'In Progress'
      },
      'resolved': { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle size={16} />,
        label: 'Resolved'
      }
    };
    return configs[status] || configs.pending;
  };

  const getTypeEmoji = (type) => {
    const emojis = {
      'road': '🛣️',
      'garbage': '🗑️', 
      'water': '💧',
      'electricity': '⚡',
      'drainage': '🌊',
      'other': '📋'
    };
    return emojis[type] || '📋';
  };

  const statusConfig = getStatusConfig(complaint.status);
  const timeAgo = new Date(complaint.dateSubmitted).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img 
              src={complaint.image} 
              alt="Complaint evidence" 
              className="w-24 h-24 object-cover rounded-lg shadow-sm"
            />
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <span className="text-lg">{getTypeEmoji(complaint.type)}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-lg leading-6 line-clamp-2">
                {complaint.description}
              </h3>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-sm font-medium ml-2 ${statusConfig.color}`}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span className="truncate">{complaint.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
        
        <CommunitySupport 
          complaint={complaint}
          onLike={onLike}
          onVerify={onVerify}
          userInteractions={userInteractions}
        />
        
        <button
          onClick={() => onViewTimeline(complaint)}
          className="mt-4 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors border border-gray-200"
        >
          View Progress Timeline →
        </button>
      </div>
    </div>
  );
};

export default ComplaintCardItem;
