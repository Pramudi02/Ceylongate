import React, { useState } from 'react';
import './TripHotels.tab.css';
import HotelReservationForm from './HotelReservationForm';

const TripHotels = ({ tripData }) => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [reservationVersions, setReservationVersions] = useState({});
  
  const hotels = [
    {
      id: 1,
      reservationId: 'RES-001',
      version: 3,
      name: 'Paradise Beach Resort',
      address: '123 Beach Road, Bentota, Sri Lanka',
      checkIn: '2025-11-15',
      checkOut: '2025-11-22',
      roomType: 'Deluxe Ocean View',
      guests: 15,
      confirmationNo: 'HB-2024-1001',
      status: 'Confirmed',
      basis: 'HB',
      wing: 'Standard',
      rooms: { SGL: 2, DBL: 5, Twin: 1, TPL: 0, Family: 1, Guide: 1 },
      nights: 7,
      rate: 3500,
      requisitionNo: 'CGT 2025-10-D',
      tourNo: 'CGT 2025-10',
      paymentTerm: 'Payment by Ceylon Gate Travels without extras',
      confirmBy: 'Admin User',
      createdAt: '2025-10-25T10:00:00',
      updatedAt: '2025-10-28T15:30:00',
      isLatestVersion: true
    },
    {
      id: 2,
      reservationId: 'RES-002',
      version: 1,
      name: 'Sunset Villa Maldives',
      address: '456 Ocean Drive, Colombo 3, Sri Lanka',
      checkIn: '2025-11-15',
      checkOut: '2025-11-18',
      roomType: 'Beach Villa',
      guests: 8,
      confirmationNo: 'HB-2024-1002',
      status: 'Pending',
      basis: 'FB',
      wing: 'Superior',
      rooms: { SGL: 1, DBL: 3, Twin: 0, TPL: 1, Family: 0, Guide: 0 },
      nights: 3,
      rate: 1800,
      requisitionNo: 'CGT 2025-10-E',
      tourNo: 'CGT 2025-10',
      paymentTerm: 'Payment by Ceylon Gate Travels without extras',
      confirmBy: 'Admin User',
      createdAt: '2025-10-26T09:00:00',
      updatedAt: '2025-10-26T09:00:00',
      isLatestVersion: true
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

  const handleCreateReservation = () => {
    setEditingReservation(null);
    setShowReservationForm(true);
  };

  const handleEditReservation = (hotel) => {
    if (hotel.isLatestVersion) {
      setEditingReservation(hotel);
      setShowReservationForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowReservationForm(false);
    setEditingReservation(null);
  };

  const handleSubmitReservation = (reservationData) => {
    if (editingReservation) {
      // Create new version
      const newVersion = {
        ...reservationData,
        id: Date.now(),
        reservationId: editingReservation.reservationId,
        version: editingReservation.version + 1,
        updatedAt: new Date().toISOString(),
        isLatestVersion: true
      };
      
      // Mark old version as not latest
      const updatedHotels = hotels.map(h => 
        h.reservationId === editingReservation.reservationId 
          ? { ...h, isLatestVersion: false }
          : h
      );
      
      console.log('New version created:', newVersion);
      // TODO: Save to backend/database with version history
    } else {
      // Create new reservation
      const newReservation = {
        ...reservationData,
        id: Date.now(),
        reservationId: `RES-${String(Date.now()).slice(-6)}`,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLatestVersion: true
      };
      
      console.log('Reservation created:', newReservation);
      setReservations([...reservations, newReservation]);
      // TODO: Save to backend/database
    }
  };

  const handleCancelReservation = (hotel) => {
    if (window.confirm(`Are you sure you want to cancel reservation ${hotel.confirmationNo}?`)) {
      // Create cancelled version
      const cancelledVersion = {
        ...hotel,
        id: Date.now(),
        version: hotel.version + 1,
        status: 'Cancelled',
        updatedAt: new Date().toISOString(),
        isLatestVersion: true
      };
      
      console.log('Reservation cancelled:', cancelledVersion);
      // TODO: Save to backend/database
    }
  };

  const handleViewDetails = (hotel) => {
    setSelectedReservation(hotel);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedReservation(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const getRoomBreakdownText = (rooms) => {
    return Object.entries(rooms)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => `${type}:${count}`)
      .join(', ');
  };

  return (
    <div className="trip-hotels">
      <div className="hotels-header">
        <h3 className="section-title">
          <span className="icon-hotel"></span> Hotel Reservations
        </h3>
        <div className="header-actions">
          <button className="btn-create-order" onClick={handleCreateReservation}>
            <span className="icon-order"></span> Create Hotel Order
          </button>
        </div>
      </div>

      <div className="hotels-grid">
        {hotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-header">
              <div className="hotel-title-section">
                <span className="icon-building"></span>
                <h4 className="hotel-name">{hotel.name}</h4>
                <span className="version-badge">v{hotel.version}</span>
              </div>
              <span className={`status-badge ${getStatusClass(hotel.status)}`}>
                {hotel.status}
              </span>
            </div>

            <div className="hotel-address">
              <span className="icon-location"></span>
              <span>{hotel.address}</span>
            </div>

            <div className="hotel-details">
              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-calendar"></span> Check-in
                  </span>
                  <span className="detail-value">{formatDate(hotel.checkIn)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-calendar"></span> Check-out
                  </span>
                  <span className="detail-value">{formatDate(hotel.checkOut)}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-moon"></span> Nights
                  </span>
                  <span className="detail-value badge-nights">{hotel.nights}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-meal"></span> Basis
                  </span>
                  <span className="detail-value badge-basis">{hotel.basis}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-guests"></span> Guests
                  </span>
                  <span className="detail-value">{hotel.guests} people</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <span className="icon-room"></span> Rooms
                  </span>
                  <span className="detail-value">{getRoomBreakdownText(hotel.rooms)}</span>
                </div>
              </div>

              <div className="confirmation-section">
                <span className="confirmation-label">
                  <span className="icon-confirm"></span> Confirmation No:
                </span>
                <span className="confirmation-value">{hotel.confirmationNo}</span>
              </div>
            </div>

            <div className="hotel-actions">
              <button className="btn-view" onClick={() => handleViewDetails(hotel)}>
                <span className="icon-view"></span> View Details
              </button>
              {hotel.isLatestVersion && hotel.status !== 'Cancelled' && (
                <>
                  <button className="btn-edit" onClick={() => handleEditReservation(hotel)}>
                    <span className="icon-edit"></span> Edit
                  </button>
                  <button className="btn-cancel" onClick={() => handleCancelReservation(hotel)}>
                    <span className="icon-close"></span> Cancel
                  </button>
                </>
              )}
              {!hotel.isLatestVersion && (
                <span className="old-version-label">Old Version</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showReservationForm && (
        <HotelReservationForm
          trip={tripData}
          onClose={handleCloseForm}
          onSubmit={handleSubmitReservation}
          initialData={editingReservation}
        />
      )}

      {showDetailsModal && selectedReservation && (
        <div className="hotel-details-modal">
          <div className="details-modal-container">
            <div className="details-header">
              <h2>
                Hotel Reservation Details 
                <span className="version-info">Version {selectedReservation.version}</span>
                {selectedReservation.isLatestVersion && (
                  <span className="latest-badge">Latest</span>
                )}
              </h2>
              <button className="btn-close-details" onClick={handleCloseDetails}>
                <span className="close-icon"></span>
              </button>
            </div>

            <div className="details-body">
              <div className="reservation-document-view">
                <div className="document-title">
                  <h1>HOTEL RESERVATION ORDER</h1>
                </div>

                <div className="document-content">
                  <div className="hotel-info-section">
                    <strong>To:</strong> {selectedReservation.name}
                    <br />
                    {selectedReservation.address}
                  </div>

                  <div className="reservation-info-grid">
                    <div className="info-item">
                      <span className="info-label">Requisition No:</span>
                      <span className="info-value">{selectedReservation.requisitionNo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Tour No:</span>
                      <span className="info-value">{selectedReservation.tourNo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Confirmation No:</span>
                      <span className="info-value">{selectedReservation.confirmationNo}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Version:</span>
                      <span className="info-value">v{selectedReservation.version}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Status:</span>
                      <span className={`badge ${getStatusClass(selectedReservation.status)}`}>
                        {selectedReservation.status}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Created:</span>
                      <span className="info-value">{formatDate(selectedReservation.createdAt)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Last Updated:</span>
                      <span className="info-value">{formatDate(selectedReservation.updatedAt)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">No. Pax:</span>
                      <span className="info-value">{selectedReservation.guests} Adults</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date:</span>
                      <span className="info-value">{formatDate(selectedReservation.checkIn)}</span>
                    </div>
                  </div>

                  <table className="details-reservation-table">
                    <thead>
                      <tr>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Nights</th>
                        <th>Basis</th>
                        <th>Wing</th>
                        <th>Room Breakdown</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatDate(selectedReservation.checkIn)}</td>
                        <td>{formatDate(selectedReservation.checkOut)}</td>
                        <td>{selectedReservation.nights}</td>
                        <td>{selectedReservation.basis}</td>
                        <td>{selectedReservation.wing}</td>
                        <td>{getRoomBreakdownText(selectedReservation.rooms)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="reservation-footer-info">
                    <div className="footer-item">
                      <span className="footer-label">Payment Term:</span>
                      <span className="footer-value">{selectedReservation.paymentTerm}</span>
                    </div>
                    <div className="footer-item">
                      <span className="footer-label">Confirm By:</span>
                      <span className="footer-value">{selectedReservation.confirmBy}</span>
                    </div>
                    <div className="footer-item highlight">
                      <span className="footer-label">Rate Applicable:</span>
                      <span className="footer-value">${selectedReservation.rate}</span>
                    </div>
                  </div>

                  <div className="room-details-breakdown">
                    <h3>Room Allocation Details</h3>
                    <div className="room-grid">
                      {Object.entries(selectedReservation.rooms).map(([type, count]) => (
                        count > 0 && (
                          <div key={type} className="room-item">
                            <span className="room-type">{type}</span>
                            <span className="room-count">{count}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <button className="btn-action-modal btn-print" onClick={() => window.print()}>
                <span className="icon"></span> Print
              </button>
              {selectedReservation.isLatestVersion && selectedReservation.status !== 'Cancelled' && (
                <button className="btn-action-modal btn-edit" onClick={() => {
                  handleCloseDetails();
                  handleEditReservation(selectedReservation);
                }}>
                  <span className="icon"></span> Edit Reservation
                </button>
              )}
              <button className="btn-action-modal btn-close-alt" onClick={handleCloseDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripHotels;
