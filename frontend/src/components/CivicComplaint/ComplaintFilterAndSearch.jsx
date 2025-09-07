import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import ComplaintCardItem from './ComplaintCardItem';

const ComplaintFilterAndSearch = ({ complaints, onViewTimeline, onLike, onVerify, userInteractions }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    sortBy: 'credibility'
  });

  const filteredComplaints = complaints
    .filter(complaint => {
      const matchesSearch = complaint.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           complaint.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = !filters.type || complaint.type === filters.type;
      const matchesStatus = !filters.status || complaint.status === filters.status;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'credibility') {
        return (b.likes + b.verifications) - (a.likes + a.verifications);
      } else if (filters.sortBy === 'recent') {
        return new Date(b.dateSubmitted) - new Date(a.dateSubmitted);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="road">🛣️ Road Issues</option>
            <option value="garbage">🗑️ Garbage</option>
            <option value="water">💧 Water</option>
            <option value="electricity">⚡ Electricity</option>
            <option value="drainage">🌊 Drainage</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="credibility">Most Credible</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredComplaints.length} complaint(s)</span>
        {filters.search && (
          <span>for "{filters.search}"</span>
        )}
      </div>

      {/* Complaints Grid */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredComplaints.map(complaint => (
            <ComplaintCardItem
              key={complaint.id}
              complaint={complaint}
              onViewTimeline={onViewTimeline}
              onLike={onLike}
              onVerify={onVerify}
              userInteractions={userInteractions}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintFilterAndSearch;
