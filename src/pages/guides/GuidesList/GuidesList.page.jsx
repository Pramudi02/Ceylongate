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
    },
    {
      id: 'g3',
      full_name: 'A. Fernando',
      primary_email: 'a.fernando@guides.lk',
      phone_number: '+94771234568',
      address_line1: '',
      city: 'Galle',
      country: 'Sri Lanka',
      languages_spoken: [{ language: 'English', proficiency: 'fluent' }, { language: 'Tamil', proficiency: 'conversational' }],
      specialties: ['beach', 'heritage'],
      service_regions: ['Galle', 'Mirissa']
    },
    {
      id: 'g4',
      full_name: 'S. Wijesekara',
      primary_email: 's.wijesekara@guides.lk',
      phone_number: '+94772345679',
      address_line1: '',
      city: 'Nuwara Eliya',
      country: 'Sri Lanka',
      languages_spoken: [{ language: 'English', proficiency: 'fluent' }],
      specialties: ['nature', 'trekking'],
      service_regions: ['Nuwara Eliya', 'Horton Plains']
    }
  ];

  return (
    <div className="trip-overview">
      <div className="list-banner">
        <div className="banner-left">
          <h2 className="banner-title">Tour Guides</h2>
          <div className="banner-subtitle">Add and manage local tour guides, languages and service regions</div>
        </div>
        <div className="banner-right">
          <div className="banner-pill">{guides.length} Guides</div>
          <button className="btn-primary btn-large" onClick={() => setShowCreate(true)}>+ Add New Guide</button>
        </div>
      </div>

      <div className="info-section">
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
