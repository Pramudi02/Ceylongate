import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import { sampleTrips } from '../../../data/trips.sample';

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

  const getStatusClass = (status) => {
    switch (status) {
      case 'Ongoing': return 'trip-status-ongoing';
      case 'Completed': return 'trip-status-completed';
      case 'Upcoming': return 'trip-status-planned';
      case 'Cancelled': return 'trip-status-cancelled';
      default: return '';
    }
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

      {/* compact timestamps */}
      <div className="info-section" style={{marginTop: '6px'}}>
        <div style={{fontSize: '0.95rem', color: '#666'}}>
          <span style={{marginRight: '16px'}}>Created 1/10/2025, 3:30:00 PM</span>
          <span>Last Updated 9/1/2025, 5:30:00 PM</span>
        </div>
      </div>

      {/* Related trips for this guide */}
      <div className="info-section">
        <h3 className="section-title">Related Trips</h3>
        <div className="passengers-table-container" style={{marginTop: '8px'}}>
          <table className="passengers-table">
            <thead>
              <tr>
                <th>Tour No</th>
                <th>Trip Name</th>
                <th>Period</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const guideName = (guide.full_name || '').toLowerCase();
                const related = sampleTrips.filter(trip => ((trip.guide?.name || '').toLowerCase()).includes(guideName));
                const rows = related.length ? related : sampleTrips.slice(0, 3);

                return rows.map(trip => (
                  <tr key={trip.id}>
                    <td><strong>{trip.tourNo}</strong></td>
                    <td>{trip.name}</td>
                    <td>{trip.startDate} → {trip.endDate}</td>
                    <td>{trip.numberOfClients}</td>
                    <td><span className={`badge ${getStatusClass(trip.status)}`}>{trip.status}</span></td>
                    <td>
                      <button className="btn-view" onClick={() => navigate(`/trips/${trip.id}`, { state: { trip } })}>
                        View Trip
                      </button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trips related by agent (helpful cross-reference) */}
      
    </div>
  );
};

export default GuideDetails;
