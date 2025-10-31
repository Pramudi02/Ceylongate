import React, { useState } from 'react';
import './TripOverview.tab.css';
import CreateTripForm from '../../TripsList/CreateTripForm';

const TripOverview = ({ tripData }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  // Helper function to get status class based on status value
  const getStatusClass = (status) => {
    switch(status) {
      case 'Ongoing': return 'status-ongoing';
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-planned';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-planned';
    }
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  const handleSubmitEdit = (editedData) => {
    console.log('Edited trip data:', editedData);
    // Here you would update the trip data in your backend/state management
    setShowEditForm(false);
    // You might want to refresh the trip data here
  };

  return (
    <div className="trip-overview">
      {/* Trip Information */}
      <div className="info-section">
        <div className="section-header-with-button">
          <h3 className="section-title">Trip Information</h3>
          <button className="btn-edit-trip" onClick={handleEditClick}>
            <span className="icon-edit"></span> Edit Trip Details
          </button>
        </div>
        <div className="info-grid-boxes">
          <div className="info-card-box">
            <span className="info-label">Tour Number</span>
            <span className="info-value"><strong>{tripData.tourNo}</strong></span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Trip Name</span>
            <span className="info-value">{tripData.name}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Client Country</span>
            <span className="info-value"><span className="icon-location"></span> {tripData.countryOfClient}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Trip Country</span>
            <span className="info-value"><span className="icon-location"></span> {tripData.tripCountry}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Tour Type</span>
            <span className="info-value">{tripData.tourType}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Travel Period</span>
            <span className="info-value"><span className="icon-calendar"></span> {tripData.startDate} to {tripData.endDate}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Duration</span>
            <span className="info-value"><span className="icon-clock"></span> {tripData.days} days / {tripData.nights} nights</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Total Clients</span>
            <span className="info-value"><span className="icon-users"></span> {tripData.numberOfClients} passengers</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Destinations</span>
            <span className="info-value">{tripData.destinations.join(', ')}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Assigned Employee</span>
            <span className="info-value"><span className="icon-user"></span> {tripData.assignedEmployee}</span>
          </div>
          <div className="info-card-box">
            <span className="info-label">Status</span>
            <span className="info-value"><span className={`badge ${getStatusClass(tripData.status)}`}>{tripData.status}</span></span>
          </div>
        </div>
      </div>

      {/* Agent Details & Guide Details - Side by Side */}
      <div className="split-section">
        {/* Agent Details */}
        <div className="info-section">
          <h3 className="section-title">Agent Details</h3>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Agency Name</span>
              <span className="info-value">{tripData.agent.name}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Company</span>
              <span className="info-value">{tripData.agent.company}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Contact</span>
              <span className="info-value">{tripData.agent.contact}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Email</span>
              <span className="info-value"><a href={`mailto:${tripData.agent.email}`}>{tripData.agent.email}</a></span>
            </div>
            <div className="info-card">
              <span className="info-label">Address</span>
              <span className="info-value">{tripData.agent.address}</span>
            </div>
          </div>
        </div>

        {/* Guide Details */}
        <div className="info-section">
          <h3 className="section-title">Tour Guide Details</h3>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Guide Name</span>
              <span className="info-value"><span className="icon-user"></span> {tripData.guide.name}</span>
            </div>
            <div className="info-card">
              <span className="info-label">License ID</span>
              <span className="info-value">{tripData.guide.license}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Contact</span>
              <span className="info-value">{tripData.guide.contact}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Email</span>
              <span className="info-value"><a href={`mailto:${tripData.guide.email}`}>{tripData.guide.email}</a></span>
            </div>
            <div className="info-card">
              <span className="info-label">Experience</span>
              <span className="info-value">{tripData.guide.experience}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Languages</span>
              <span className="info-value">{tripData.guide.languages.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes / Remarks */}
      <div className="info-section">
        <h3 className="section-title">Notes & Remarks</h3>
        <div className="notes-box">
          <p>{tripData.notes}</p>
        </div>
      </div>

      {/* Itinerary */}
      <div className="info-section">
        <h3 className="section-title">Daily Itinerary</h3>
        <div className="itinerary-list">
          {tripData.itinerary.map(item => (
            <div key={item.day} className="itinerary-item">
              <div className="day-badge">Day {item.day}</div>
              <div className="itinerary-content">
                <h4 className="itinerary-title">{item.title}</h4>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Details */}
      <div className="info-section">
        <div className="section-header">
          <h3 className="section-title">Client Details ({tripData.clients.length} of {tripData.numberOfClients})</h3>
          <button className="btn-secondary"><span className="icon-plus"></span> Add Client</button>
        </div>

        <div className="passengers-table-container">
          <table className="passengers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Passport Number</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tripData.clients.map((client, index) => (
                <tr key={index}>
                  <td>
                    <span className="passenger-name"><span className="icon-user"></span> {client.name}</span>
                  </td>
                  <td>{client.passport}</td>
                  <td>{client.contact}</td>
                  <td>
                    <a href={`mailto:${client.email}`} className="passenger-email">
                      {client.email}
                    </a>
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

      {/* Financial Summary */}
      <div className="info-section">
        <h3 className="section-title">Financial Summary</h3>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Total Cost</span>
            <span className="info-value">{tripData.currency} {tripData.totalCost.toLocaleString()}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Paid Amount</span>
            <span className="info-value" style={{color: 'var(--success)'}}>{tripData.currency} {tripData.paidAmount.toLocaleString()}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Balance</span>
            <span className="info-value" style={{color: 'var(--danger)'}}>{tripData.currency} {tripData.balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Edit Trip Form Modal */}
      {showEditForm && (
        <CreateTripForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitEdit}
          initialData={tripData}
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default TripOverview;
