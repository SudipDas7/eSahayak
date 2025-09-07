import React from 'react';
import { Plus } from 'lucide-react';

const CivicComplaintHeader = ({ onNewComplaintClick }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Civic Complaint Portal</h1>
            <p className="text-sm text-gray-600">Report issues, track progress, build better communities</p>
          </div>
          <button
            onClick={onNewComplaintClick}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={20} />
            <span className="font-medium">New Complaint</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CivicComplaintHeader;
