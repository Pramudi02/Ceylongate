import React, { useState } from 'react';
import './CreateTripForm.css';

const CreateTripForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tourNo: '',
    name: '',
    countryOfClient: '',
    agentName: '',
    agentContact: '',
    guideName: '',
    guideContact: '',
    guideLicense: '',
    startDate: '',
    endDate: '',
    days: '',
    nights: '',
    numberOfClients: '',
    destinations: '',
    tourType: 'Cultural',
    status: 'Upcoming',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform form data to match trip structure
    const tripData = {
      id: Date.now(),
      tourNo: formData.tourNo,
      name: formData.name,
      countryOfClient: formData.countryOfClient,
      agent: {
        name: formData.agentName,
        contact: formData.agentContact
      },
      guide: {
        name: formData.guideName,
        contact: formData.guideContact,
        license: formData.guideLicense
      },
      tripCountry: 'Sri Lanka',
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: parseInt(formData.days),
      nights: parseInt(formData.nights),
      numberOfClients: parseInt(formData.numberOfClients),
      destinations: formData.destinations.split(',').map(d => d.trim()),
      tourType: formData.tourType,
      assignedEmployee: 'Admin User',
      notes: formData.notes,
      status: formData.status
    };

    onSubmit(tripData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Trip</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              
              <div className="form-group">
                <label>Tour Number *</label>
                <input
                  type="text"
                  name="tourNo"
                  value={formData.tourNo}
                  onChange={handleChange}
                  placeholder="e.g., CGT-2025-007"
                  required
                />
              </div>

              <div className="form-group">
                <label>Trip Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Sri Lanka Heritage Tour"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tour Type *</label>
                <select
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  required
                >
                  <option value="Cultural">Cultural</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Wildlife">Wildlife</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Leisure">Leisure</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Client & Agent Information */}
            <div className="form-section">
              <h3 className="section-title">Client & Agent Details</h3>
              
              <div className="form-group">
                <label>Client Country *</label>
                <input
                  type="text"
                  name="countryOfClient"
                  value={formData.countryOfClient}
                  onChange={handleChange}
                  placeholder="e.g., Italy"
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Clients *</label>
                <input
                  type="number"
                  name="numberOfClients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  placeholder="e.g., 15"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Agent Name *</label>
                <input
                  type="text"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleChange}
                  placeholder="e.g., Rome Travel Agency"
                  required
                />
              </div>

              <div className="form-group">
                <label>Agent Contact *</label>
                <input
                  type="text"
                  name="agentContact"
                  value={formData.agentContact}
                  onChange={handleChange}
                  placeholder="e.g., +39 06 1234567"
                  required
                />
              </div>
            </div>

            {/* Tour Guide Information */}
            <div className="form-section">
              <h3 className="section-title">Tour Guide Details</h3>
              
              <div className="form-group">
                <label>Guide Name *</label>
                <input
                  type="text"
                  name="guideName"
                  value={formData.guideName}
                  onChange={handleChange}
                  placeholder="e.g., Kamal Silva"
                  required
                />
              </div>

              <div className="form-group">
                <label>Guide Contact *</label>
                <input
                  type="text"
                  name="guideContact"
                  value={formData.guideContact}
                  onChange={handleChange}
                  placeholder="e.g., +94 77 123 4567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Guide License *</label>
                <input
                  type="text"
                  name="guideLicense"
                  value={formData.guideLicense}
                  onChange={handleChange}
                  placeholder="e.g., TG-2023-001"
                  required
                />
              </div>
            </div>

            {/* Travel Details */}
            <div className="form-section">
              <h3 className="section-title">Travel Details</h3>
              
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Days *</label>
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    placeholder="8"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nights *</label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleChange}
                    placeholder="7"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Destinations *</label>
                <input
                  type="text"
                  name="destinations"
                  value={formData.destinations}
                  onChange={handleChange}
                  placeholder="Colombo, Kandy, Sigiriya, Ella (comma-separated)"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any special notes or requirements..."
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <span className="icon-check"></span>
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripForm;
