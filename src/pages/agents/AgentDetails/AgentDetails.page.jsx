import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const AgentDetails = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();

  // mock data (matches compact travel_agents schema)
  const agent = {
    id: agentId,
    full_name: 'Ceylon Travel Pvt Ltd',
    primary_email: 'sales@ceylongate.com',
    support_email: 'support@ceylongate.com',
    phone_number: '+94771234567',
    secondary_phone: '',
    address_line1: 'No 12, Galle Rd',
    address_line2: '',
    city: 'Colombo',
    state: 'Western',
    country: 'Sri Lanka',
    postal_code: '00100',
    description: 'Preferred partner for inbound groups.',
    commission_rate: 10.0,
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-09-01T12:00:00Z'
  };

  return (
    <div className="trip-overview">
      <button className="btn-back" onClick={() => navigate('/agents')}>← Back to Agents</button>

      <div className="info-section">
        <h1 className="section-title">{agent.full_name}</h1>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Primary Email</span>
            <span className="info-value"><a href={`mailto:${agent.primary_email}`}>{agent.primary_email}</a></span>
          </div>

          <div className="info-card">
            <span className="info-label">Support Email</span>
            <span className="info-value">{agent.support_email || '—'}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Phone</span>
            <span className="info-value">{agent.phone_number}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Secondary Phone</span>
            <span className="info-value">{agent.secondary_phone || '—'}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Address</span>
            <span className="info-value">{[agent.address_line1, agent.address_line2, agent.city, agent.state, agent.postal_code].filter(Boolean).join(', ')}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Country</span>
            <span className="info-value">{agent.country}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Commission Rate</span>
            <span className="info-value">{agent.commission_rate ? agent.commission_rate + '%' : '—'}</span>
          </div>

          <div className="info-card" style={{gridColumn: '1 / -1'}}>
            <span className="info-label">Description</span>
            <span className="info-value">{agent.description}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Metadata</h3>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Created</span>
            <span className="info-value">{new Date(agent.created_at).toLocaleString()}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Last Updated</span>
            <span className="info-value">{new Date(agent.updated_at).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
