import React from 'react';
import './TripOverview.tab.css';

const TripOverview = ({ tripData }) => {
  const passengers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+94 771234567', room: '101' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+94 771234568', room: '102' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '+94 771234569', room: '103' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '+94 771234570', room: '104' },
    { id: 5, name: 'David Wilson', email: 'david@email.com', phone: '+94 771234571', room: '105' }
  ];

  const itinerary = [
    { day: 1, title: 'Arrival & Check-in', description: 'Arrive at Maldives International Airport, transfer to resort, welcome dinner' },
    { day: 2, title: 'Island Exploration', description: 'Morning beach walk, snorkeling session, sunset cruise' },
    { day: 3, title: 'Water Sports Day', description: 'Jet skiing, parasailing, kayaking, beach BBQ' },
    { day: 4, title: 'Spa & Relaxation', description: 'Full day spa treatments, yoga session, meditation' },
    { day: 5, title: 'Dolphin Watching', description: 'Early morning dolphin cruise, island hopping, local cuisine' },
    { day: 6, title: 'Diving Experience', description: 'Scuba diving lessons, coral reef exploration, underwater photography' },
    { day: 7, title: 'Departure', description: 'Breakfast, check-out, transfer to airport' }
  ];

  return (
    <div className="trip-overview">
      {/* Trip Information */}
      <div className="info-section">
        <h3 className="section-title">Trip Information</h3>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Destination</span>
            <span className="info-value"><span className="icon-location"></span> {tripData.destination}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Tour Guide</span>
            <span className="info-value"><span className="icon-user"></span> {tripData.guide}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Start Date</span>
            <span className="info-value"><span className="icon-calendar"></span> {tripData.startDate}</span>
          </div>
          <div className="info-card">
            <span className="info-label">End Date</span>
            <span className="info-value"><span className="icon-calendar"></span> {tripData.endDate}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Total Guests</span>
            <span className="info-value"><span className="icon-users"></span> {tripData.guests} passengers</span>
          </div>
          <div className="info-card">
            <span className="info-label">Duration</span>
            <span className="info-value"><span className="icon-clock"></span> 7 days / 6 nights</span>
          </div>
        </div>
        <button className="btn-primary" style={{marginTop: '20px'}}>
          <span className="icon-edit"></span> Edit Trip Info
        </button>
      </div>

      {/* Itinerary */}
      <div className="info-section">
        <h3 className="section-title">Daily Itinerary</h3>
        <div className="itinerary-list">
          {itinerary.map(item => (
            <div key={item.day} className="itinerary-item">
              <div className="day-badge">Day {item.day}</div>
              <div className="itinerary-content">
                <h4 className="itinerary-title">{item.title}</h4>
                <p className="itinerary-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Passengers List */}
      <div className="info-section">
        <div className="section-header">
          <h3 className="section-title">Passengers ({passengers.length})</h3>
          <button className="btn-secondary"><span className="icon-plus"></span> Add Passenger</button>
        </div>

        <div className="passengers-table-container">
          <table className="passengers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Room</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map(passenger => (
                <tr key={passenger.id}>
                  <td>
                    <span className="passenger-name"><span className="icon-user"></span> {passenger.name}</span>
                  </td>
                  <td>
                    <a href={`mailto:${passenger.email}`} className="passenger-email">
                      {passenger.email}
                    </a>
                  </td>
                  <td>{passenger.phone}</td>
                  <td>
                    <span className="room-badge">Room {passenger.room}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn btn-edit"><span className="icon-edit"></span></button>
                      <button className="action-btn btn-delete"><span className="icon-trash"></span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripOverview;
