import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const GuideDetails = () => {
  const navigate = useNavigate();
  const { guideId } = useParams();

  const guide = {
    id: guideId,
    name: 'K. Perera',
    license: 'G-12345',
    contact: '+94 77 3456789',
    email: 'k.perera@guides.lk',
    experience: '8 years',
    languages: ['English', 'Sinhala']
  };

  return (
    <div className="trip-overview">
      <button className="btn-back" onClick={() => navigate('/guides')}>← Back to Guides</button>

      <div className="info-section">
        <h1 className="section-title">{guide.name}</h1>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">License ID</span>
            <span className="info-value">{guide.license}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Contact</span>
            <span className="info-value">{guide.contact}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Email</span>
            <span className="info-value"><a href={`mailto:${guide.email}`}>{guide.email}</a></span>
          </div>
          <div className="info-card">
            <span className="info-label">Experience</span>
            <span className="info-value">{guide.experience}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Languages</span>
            <span className="info-value">{guide.languages.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
