import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import CreateGuideForm from '../CreateGuideForm/CreateGuideForm';

const GuidesList = () => {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const guides = [
    { id: 'g1', name: 'K. Perera', languages: ['English', 'Sinhala'], contact: '+94 77 3456789' },
    { id: 'g2', name: 'M. Silva', languages: ['English'], contact: '+94 77 4567890' }
  ];

  return (
    <div className="trip-overview">
      <div className="info-section">
        <div className="section-header-with-button">
          <h1 className="section-title">Tour Guides</h1>
          <div>
            <button className="btn-primary" onClick={() => setShowCreate(true)}>
              + Add New Guide
            </button>
          </div>
        </div>

        <div className="info-grid-boxes">
          {guides.map(g => (
            <div key={g.id} className="info-card-box" style={{cursor: 'pointer'}} onClick={() => navigate(`/guides/${g.id}`)}>
              <span className="info-label">{g.name}</span>
              <span className="info-value">{g.languages.join(', ')} • {g.contact}</span>
            </div>
          ))}
        </div>
      </div>

      {showCreate && <CreateGuideForm onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default GuidesList;
