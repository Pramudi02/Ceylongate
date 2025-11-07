import React, { useState } from 'react';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const CreateAgentForm = ({ onClose }) => {
  const [form, setForm] = useState({
    full_name: '',
    primary_email: '',
    support_email: '',
    phone_number: '',
    secondary_phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    description: '',
    commission_rate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // assemble payload
    const payload = {
      ...form,
      commission_rate: form.commission_rate ? parseFloat(form.commission_rate) : null
    };
    console.log('Create agent payload', payload);
    // TODO: call API to create agent
    onClose && onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Travel Agent</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="full_name" value={form.full_name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Primary Email</label>
              <input name="primary_email" value={form.primary_email} onChange={handleChange} type="email" required />
            </div>

            <div className="form-group">
              <label>Support Email</label>
              <input name="support_email" value={form.support_email} onChange={handleChange} type="email" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone_number" value={form.phone_number} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Secondary Phone</label>
              <input name="secondary_phone" value={form.secondary_phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Address Line 1</label>
              <input name="address_line1" value={form.address_line1} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Address Line 2</label>
              <input name="address_line2" value={form.address_line2} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input name="postal_code" value={form.postal_code} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Commission Rate (%)</label>
              <input name="commission_rate" value={form.commission_rate} onChange={handleChange} type="number" step="0.01" min="0" max="100" />
            </div>

            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Agent</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentForm;
