import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import CreateGuideForm from '../CreateGuideForm/CreateGuideForm';

const GuidesList = () => {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const guides = [
    {
      id: 'g1',
      full_name: 'K. Perera',
      primary_email: 'k.perera@guides.lk',
      phone_number: '+94773456789',
      address_line1: '',
      city: 'Kandy',
      country: 'Sri Lanka',
      languages_spoken: [{ language: 'English', proficiency: 'fluent' }, { language: 'Sinhala', proficiency: 'native' }],
      specialties: ['heritage', 'culture'],
      service_regions: ['Kandy', 'Nuwara Eliya']
    },
    {
      id: 'g2',
      full_name: 'M. Silva',
      primary_email: 'm.silva@guides.lk',
      phone_number: '+94774567890',
      address_line1: '',
      city: 'Colombo',
      country: 'Sri Lanka',
      languages_spoken: [{ language: 'English', proficiency: 'fluent' }],
      specialties: ['wildlife'],
      service_regions: ['Yala', 'Udawalawe']
    }
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
              <span className="info-label">{g.full_name}</span>
              <span className="info-value">{g.city ? g.city + ', ' : ''}{g.country} • <a href={`mailto:${g.primary_email}`}>{g.primary_email}</a></span>
              <div className="info-sub">{g.languages_spoken.map(l => l.language).join(', ')} • {g.phone_number}</div>
            </div>
          ))}
        </div>
      </div>

      {showCreate && <CreateGuideForm onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default GuidesList;
