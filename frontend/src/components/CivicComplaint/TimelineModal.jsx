import React from 'react';
import { X, MapPin, Star } from 'lucide-react';

const TimelineModal = ({ complaint, isOpen, onClose }) => {
  if (!isOpen || !complaint) return null;

  const timelineSteps = [
    { 
      key: 'submitted', 
      label: 'Complaint Submitted', 
      icon: '📅',
      description: 'Complaint received and logged in system'
    },
    { 
      key: 'verified', 
      label: 'Community Verified', 
      icon: '✅',
      description: 'Verified by community members as authentic'
    },
    { 
      key: 'in-progress', 
      label: 'Work in Progress', 
      icon: '🏗️',
      description: 'Authorities have started working on the issue'
    },
    { 
      key: 'resolved', 
      label: 'Issue Resolved', 
      icon: '✔️',
      description: 'Problem has been completely resolved'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Complaint Progress</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Complaint Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
            <div className="flex space-x-4">
              <img 
                src={complaint.image} 
                alt="Complaint" 
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{complaint.description}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500" />
                    <span>{complaint.likes + complaint.verifications} credibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timelineSteps.map((step, index) => {
              const timelineItem = complaint.timeline.find(t => t.status === step.key);
              const isCompleted = timelineItem?.date;
              const isCurrent = timelineItem?.active && !isCompleted;
              
              return (
                <div key={step.key} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium border-2 ${
                      isCompleted 
                        ? 'bg-green-500 text-white border-green-500' 
                        : isCurrent
                          ? 'bg-blue-500 text-white border-blue-500 animate-pulse'
                          : 'bg-gray-100 text-gray-400 border-gray-300'
                    }`}>
                      {step.icon}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className={`w-0.5 h-12 mt-2 ${
                        isCompleted ? 'bg-green-300' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-lg ${
                      isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                    {timelineItem?.date ? (
                      <p className="text-sm text-gray-500">
                        ✓ Completed on {new Date(timelineItem.date).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    ) : isCurrent ? (
                      <p className="text-sm text-blue-600 font-medium">🔄 In progress...</p>
                    ) : (
                      <p className="text-sm text-gray-400">⏳ Pending...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineModal;
