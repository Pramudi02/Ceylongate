import React from 'react';
import './TripHotels.tab.css';

const TripHotels = ({ tripData }) => {
  const hotels = [
    {
      id: 1,
      name: 'Paradise Beach Resort',
      checkIn: '2025-11-15',
      checkOut: '2025-11-22',
      roomType: 'Deluxe Ocean View',
      guests: 15,
      confirmationNo: 'HB-2024-1001',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Sunset Villa Maldives',
      checkIn: '2025-11-15',
      checkOut: '2025-11-18',
      roomType: 'Beach Villa',
      guests: 8,
      confirmationNo: 'HB-2024-1002',
      status: 'Pending'
    }
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Confirmed': return 'status-completed';
      case 'Pending': return 'status-planned';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="trip-hotels">
      <div className="hotels-header">
        <h3 className="section-title">Hotel Reservations</h3>
        <button className="btn-primary">➕ Add Reservation</button>
      </div>

      <div className="hotels-grid">
        {hotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-header">
              <h4 className="hotel-name">🏨 {hotel.name}</h4>
              <span className={`badge ${getStatusClass(hotel.status)}`}>
                {hotel.status}
              </span>
            </div>

            <div className="hotel-details">
              <div className="detail-row">
                <span className="detail-label">📅 Check-in</span>
                <span className="detail-value">{hotel.checkIn}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">📅 Check-out</span>
                <span className="detail-value">{hotel.checkOut}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">🛏️ Room Type</span>
                <span className="detail-value">{hotel.roomType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">👥 Guests</span>
                <span className="detail-value">{hotel.guests} people</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">🔖 Confirmation</span>
                <span className="detail-value confirmation">{hotel.confirmationNo}</span>
              </div>
            </div>

            <div className="hotel-actions">
              <button className="btn-action">✏️ Edit</button>
              <button className="btn-action">👁️ View Details</button>
              <button className="btn-action btn-danger">❌ Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHotels;
