import React, { useState } from 'react';
import '../../trips/TripsList/CreateTripForm.css';

const CreateAgentForm = ({ onClose, onSubmit, initialData = null, isEditMode = false }) => {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    company: initialData?.company || '',
    contact: initialData?.contact || '',
    email: initialData?.email || '',
    street: initialData?.address?.street || '',
    city: initialData?.address?.city || '',
    postal: initialData?.address?.postal || '',
    country: initialData?.address?.country || '',
    notes: initialData?.notes || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      company: form.company,
      contact: form.contact,
      email: form.email,
      address: {
        street: form.street,
        city: form.city,
        postal: form.postal,
        country: form.country
      },
      notes: form.notes
    };
    if (onSubmit) onSubmit(payload);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Travel Agent' : 'Create New Travel Agent'}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label>Agency / Agent Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. London Historic Tours" />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company or legal name" />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input name="contact" value={form.contact} onChange={handleChange} placeholder="+44 20 7123456" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="agent@example.com" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Address</h3>
              <div className="form-group">
                <label>Street / Address Line</label>
                <input name="street" value={form.street} onChange={handleChange} placeholder="Street address" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal / ZIP" />
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
              </div>

            </div>

            <div className="form-section full-width">
              <h3 className="section-title">Notes & Preferences</h3>
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any notes about this agent" />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">{isEditMode ? 'Save Changes' : 'Create Agent'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentForm;
