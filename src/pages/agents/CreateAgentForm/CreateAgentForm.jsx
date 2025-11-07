import React, { useState } from 'react';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const CreateAgentForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', contact: '', address: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create agent', form);
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
              <label>Agent Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" required />
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input name="contact" value={form.contact} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} />
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
