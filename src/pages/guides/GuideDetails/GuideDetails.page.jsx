import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const GuideDetails = () => {
  const navigate = useNavigate();
  const { guideId } = useParams();

  const guide = {
    id: guideId,
    full_name: 'K. Perera',
    primary_email: 'k.perera@guides.lk',
    phone_number: '+94773456789',
    address_line1: '',
    city: 'Kandy',
    country: 'Sri Lanka',
    description: 'Experienced cultural guide',
    languages_spoken: [{ language: 'English', proficiency: 'fluent' }, { language: 'Sinhala', proficiency: 'native' }],
    specialties: ['heritage', 'culture'],
    service_regions: ['Kandy', 'Nuwara Eliya']
  };

  return (
    <div className="trip-overview">
      <button className="btn-back" onClick={() => navigate('/guides')}>← Back to Guides</button>

      <div className="info-section">
        <h1 className="section-title">{guide.full_name}</h1>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Primary Email</span>
            <span className="info-value"><a href={`mailto:${guide.primary_email}`}>{guide.primary_email}</a></span>
          </div>

          <div className="info-card">
            <span className="info-label">Phone</span>
            <span className="info-value">{guide.phone_number}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Location</span>
            <span className="info-value">{[guide.city, guide.country].filter(Boolean).join(', ')}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Languages</span>
            <span className="info-value">{guide.languages_spoken.map(l => l.language).join(', ')}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Specialties</span>
            <span className="info-value">{guide.specialties.join(', ')}</span>
          </div>

          <div className="info-card" style={{gridColumn: '1 / -1'}}>
            <span className="info-label">Service Regions</span>
            <span className="info-value">{guide.service_regions.join(', ')}</span>
          </div>

          <div className="info-card" style={{gridColumn: '1 / -1'}}>
            <span className="info-label">Description</span>
            <span className="info-value">{guide.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
