import React, { useState } from 'react';
import '../../trips/TripsList/CreateTripForm.css';

const CreateGuideForm = ({ onClose, onSubmit, initialData = null, isEditMode = false }) => {
  const [form, setForm] = useState({
    full_name: initialData?.full_name || '',
    license: initialData?.license || '',
    primary_email: initialData?.primary_email || '',
    phone_number: initialData?.phone_number || '',
    address_line1: initialData?.address_line1 || '',
    city: initialData?.city || '',
    country: initialData?.country || 'Sri Lanka',
    description: initialData?.description || '',
    languages_input: initialData?.languages_spoken ? initialData.languages_spoken.map(l => l.language).join(', ') : '',
    specialties_input: initialData?.specialties ? initialData.specialties.join(', ') : '',
    service_regions_input: initialData?.service_regions ? initialData.service_regions.join(', ') : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // parse inputs into JSON structures
    const languages_spoken = form.languages_input
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(lang => ({ language: lang, proficiency: 'fluent' }));

    const specialties = form.specialties_input.split(',').map(s => s.trim()).filter(Boolean);
    const service_regions = form.service_regions_input.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      full_name: form.full_name,
      primary_email: form.primary_email,
      phone_number: form.phone_number,
      address_line1: form.address_line1,
      city: form.city,
      country: form.country,
      description: form.description,
      languages_spoken,
      specialties,
      service_regions
    };

  if (onSubmit) onSubmit(payload);
  // close modal
  onClose && onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Tour Guide</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>License / ID</label>
                <input name="license" value={form.license} onChange={handleChange} placeholder="e.g. TG-2023-001" />
              </div>

              <div className="form-group">
                <label>Primary Email</label>
                <input name="primary_email" value={form.primary_email} onChange={handleChange} type="email" required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone_number" value={form.phone_number} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 5 years" />
              </div>

              <div className="form-group">
                <label>Languages (comma separated)</label>
                <input name="languages_input" value={form.languages_input} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Address</h3>
              <div className="form-group">
                <label>Street / Address Line</label>
                <input name="address_line1" value={form.address_line1} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input name="country" value={form.country} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Service Regions (comma separated)</label>
                <input name="service_regions_input" value={form.service_regions_input} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section full-width">
              <h3 className="section-title">About / Notes</h3>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Create Guide</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGuideForm;
