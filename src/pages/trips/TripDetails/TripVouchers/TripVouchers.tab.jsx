import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TripVouchers.tab.css';

const TripVouchers = ({ tripData }) => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  
  const vouchers = [
    {
      id: 1,
      voucherNo: 'VCH-2025-001',
      customerName: 'John Smith',
      issuedDate: '2025-10-20',
      services: 'Airport Transfer, Hotel, Tour Guide',
      // Detailed voucher information
      tourName: 'Sri Lanka Discovery Tour',
      tourNo: 'CGT-2025-10',
      tourDates: '2025-11-15 to 2025-11-22',
      hotelDates: '2025-11-15 to 2025-11-22',
      arrivalDetails: 'Flight QR 6583 at 22:00 on 2025-11-15',
      departureDetails: 'Flight QR 6584 at 18:00 on 2025-11-22',
      accommodation: [
        { dateRange: '15 Nov - 20 Nov', nights: 5, hotel: 'Paradise Beach Resort', roomType: 'Deluxe Ocean View' },
        { dateRange: '20 Nov - 22 Nov', nights: 2, hotel: 'Colombo City Hotel', roomType: 'Superior Room' }
      ],
      mealBasis: 'Half Board (Breakfast & Dinner)',
      entranceFees: 'Sigiriya Rock, Temple of Tooth, Elephant Orphanage',
      transport: 'Private Air-Conditioned Coach',
      guideType: 'English Speaking Guide',
      emergencyContacts: [
        { name: 'Ceylon Gate Office', phone: '+94 11 234 5678' },
        { name: 'Tour Manager', phone: '+94 77 123 4567' }
      ]
    }
  ];

  const handleViewDetails = (voucher) => {
    setSelectedVoucher(voucher);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedVoucher(null);
  };

  return (
    <div className="trip-vouchers">
      <div className="vouchers-header">
        <h3 className="section-title">Service Vouchers</h3>
        <button
          className="btn-primary"
          onClick={() => navigate(`/trips/${tripData?.id}/service-voucher`, { state: { tripData } })}
        >
          + Create Voucher
        </button>
      </div>

      <div className="vouchers-grid">
        {vouchers.map(voucher => (
          <div key={voucher.id} className="voucher-card">
            <div className="voucher-header">
              <div className="voucher-title-section">
                <h3 className="voucher-name">Romantic Honeymoon Getaway</h3>
              </div>
              <span className="voucher-number-badge">{voucher.voucherNo}</span>
            </div>

            <div className="voucher-details">
              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">CUSTOMER NAME</span>
                  <span className="detail-value">{voucher.customerName}</span>
                </div>
              </div>


              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">TOUR DATES</span>
                  <span className="detail-value">{voucher.tourDates}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">ISSUED DATE</span>
                  <span className="detail-value">{voucher.issuedDate}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">TRANSPORT</span>
                  <span className="detail-value">{voucher.transport}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">GUIDE TYPE</span>
                  <span className="detail-value">{voucher.guideType}</span>
                </div>
              </div>

              <div className="detail-group">
                <div className="detail-row">
                  <span className="detail-label">MEAL BASIS</span>
                  <span className="detail-value">{voucher.mealBasis}</span>
                </div>
              </div>
            </div>

            <div className="voucher-actions">
              <button
                className="btn-voucher-view"
                onClick={() => handleViewDetails(voucher)}
              >
                View Details
              </button>
              <button className="btn-voucher-download">
                Download
              </button>
              <button className="btn-voucher-print">
                Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetailsModal && selectedVoucher && (
        <div className="voucher-details-modal">
          <div className="voucher-modal-container">
            <div className="voucher-modal-header">
              <h2>Service Voucher Details</h2>
              <button className="btn-close-voucher-details" onClick={handleCloseDetails}>
                <span className="close-icon">✕</span>
              </button>
            </div>

            <div className="voucher-modal-body">
              <div className="voucher-document-view">
                <div className="voucher-doc-title">
                  <h1>SERVICE VOUCHER</h1>
                  <p className="voucher-doc-number">{selectedVoucher.voucherNo}</p>
                </div>

                <div className="voucher-doc-content">
                  {/* Tour Information Section */}
                  <div className="voucher-section">
                    <h3 className="section-title">Tour Information</h3>
                    <div className="voucher-info-grid">
                      <div className="voucher-info-item">
                        <span className="v-info-label">Client Name:</span>
                        <span className="v-info-value">{selectedVoucher.customerName}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Tour Name:</span>
                        <span className="v-info-value">{selectedVoucher.tourName}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Tour No:</span>
                        <span className="v-info-value">{selectedVoucher.tourNo}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Tour Dates:</span>
                        <span className="v-info-value">{selectedVoucher.tourDates}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Hotel Dates:</span>
                        <span className="v-info-value">{selectedVoucher.hotelDates}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Arrival:</span>
                        <span className="v-info-value">{selectedVoucher.arrivalDetails}</span>
                      </div>
                      <div className="voucher-info-item">
                        <span className="v-info-label">Departure:</span>
                        <span className="v-info-value">{selectedVoucher.departureDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accommodation Section */}
                  <div className="voucher-section">
                    <h3 className="section-title">Accommodation Details</h3>
                    <table className="voucher-table">
                      <thead>
                        <tr>
                          <th>Date Range</th>
                          <th>Nights</th>
                          <th>Hotel</th>
                          <th>Room Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVoucher.accommodation.map((acc, index) => (
                          <tr key={index}>
                            <td>{acc.dateRange}</td>
                            <td>{acc.nights}</td>
                            <td>{acc.hotel}</td>
                            <td>{acc.roomType}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Other Services Section */}
                  <div className="voucher-services-grid">
                    <div className="voucher-section">
                      <h3 className="section-title">Meal Basis</h3>
                      <p className="service-detail">{selectedVoucher.mealBasis}</p>
                    </div>

                    <div className="voucher-section">
                      <h3 className="section-title">Entrance Fees</h3>
                      <p className="service-detail">{selectedVoucher.entranceFees}</p>
                    </div>

                    <div className="voucher-section">
                      <h3 className="section-title">Transport</h3>
                      <p className="service-detail">{selectedVoucher.transport}</p>
                    </div>

                    <div className="voucher-section">
                      <h3 className="section-title">Guide Type</h3>
                      <p className="service-detail">{selectedVoucher.guideType}</p>
                    </div>
                  </div>

                  {/* Emergency Contacts Section */}
                  <div className="voucher-section">
                    <h3 className="section-title">Emergency Contacts</h3>
                    <div className="contacts-grid">
                      {selectedVoucher.emergencyContacts.map((contact, index) => (
                        <div key={index} className="contact-item">
                          <span className="contact-name">{contact.name}:</span>
                          <span className="contact-phone">{contact.phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="voucher-footer">
                    <p className="footer-note">This voucher is valid for the specified tour dates only.</p>
                    <p className="footer-issued">Issued on: {selectedVoucher.issuedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="voucher-modal-actions">
              <button className="btn-action-modal btn-print" onClick={() => window.print()}>
                Print
              </button>
              <button 
                className="btn-action-modal btn-edit" 
                onClick={() => {
                  handleCloseDetails();
                  navigate(`/trips/${tripData?.id}/service-voucher`, { state: { tripData, voucher: selectedVoucher } });
                }}
              >
                Edit Voucher
              </button>
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

export default TripVouchers;
