import React, { useState } from 'react';
import CivicComplaintHeader from './CivicComplaintHeader';
import ComplaintFilterAndSearch from './ComplaintFilterAndSearch';
import ComplaintSubmissionModal from './ComplaintSubmissionModal';
import TimelineModal from './TimelineModal';

// Mock data for demonstration
const mockComplaints = [
  {
    id: 1,
    image: '/images/Pothole1.jpeg.jpg',
    description: 'Big pothole near XYZ school causing traffic issues',
    location: 'Park Street, Kolkata',
    type: 'road',
    dateSubmitted: '2024-09-01T10:30:00Z',
    likes: 15,
    verifications: 8,
    status: 'in-progress',
    timeline: [
      { status: 'submitted', date: '2024-09-01T10:30:00Z', active: true },
      { status: 'verified', date: '2024-09-02T14:20:00Z', active: true },
      { status: 'in-progress', date: '2024-09-04T09:15:00Z', active: true },
      { status: 'resolved', date: null, active: false }
    ]
  },
  {
    id: 2,
    image: '/images/Illegaldumping1.jpg',
    description: 'Large garbage accumulation blocking sidewalk',
    location: 'Salt Lake Sector V',
    type: 'garbage',
    dateSubmitted: '2024-09-03T16:45:00Z',
    likes: 23,
    verifications: 12,
    status: 'verified',
    timeline: [
      { status: 'submitted', date: '2024-09-03T16:45:00Z', active: true },
      { status: 'verified', date: '2024-09-04T10:20:00Z', active: true },
      { status: 'in-progress', date: null, active: false },
      { status: 'resolved', date: null, active: false }
    ]
  },
  {
    id: 3,
    image: '/images/Brokenstreetlight.jpg',
    description: 'Street light not working for 3 days',
    location: 'New Town Action Area II',
    type: 'electricity',
    dateSubmitted: '2024-09-05T08:15:00Z',
    likes: 7,
    verifications: 4,
    status: 'pending',
    timeline: [
      { status: 'submitted', date: '2024-09-05T08:15:00Z', active: true },
      { status: 'verified', date: null, active: false },
      { status: 'in-progress', date: null, active: false },
      { status: 'resolved', date: null, active: false }
    ]
  }
];

// Main App Component demonstrating usage
const CivicComplaintApp = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [userInteractions, setUserInteractions] = useState({});

  const handleSubmitComplaint = (newComplaint) => {
    setComplaints([newComplaint, ...complaints]);
  };

  const handleLike = (complaintId) => {
    if (userInteractions[complaintId]?.liked) return;
    
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, likes: c.likes + 1 } : c
    ));
    setUserInteractions({
      ...userInteractions,
      [complaintId]: { ...userInteractions[complaintId], liked: true }
    });
  };

  const handleVerify = (complaintId) => {
    if (userInteractions[complaintId]?.verified) return;
    
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, verifications: c.verifications + 1 } : c
    ));
    setUserInteractions({
      ...userInteractions,
      [complaintId]: { ...userInteractions[complaintId], verified: true }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CivicComplaintHeader onNewComplaintClick={() => setShowSubmissionModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComplaintFilterAndSearch
          complaints={complaints}
          onViewTimeline={setSelectedComplaint}
          onLike={handleLike}
          onVerify={handleVerify}
          userInteractions={userInteractions}
        />
      </main>

      <ComplaintSubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmitComplaint}
      />

      <TimelineModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
};

export default CivicComplaintApp;