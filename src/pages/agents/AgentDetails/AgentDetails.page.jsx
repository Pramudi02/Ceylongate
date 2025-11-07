import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';

const AgentDetails = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();

  // mock data for now
  const agent = {
    id: agentId,
    name: 'Ceylon Travel Pvt Ltd',
    company: 'Ceylon Travel Pvt Ltd',
    contact: '+94 77 1234567',
    email: 'sales@ceylongate.com',
    address: 'No 12, Galle Rd, Colombo',
    notes: 'Preferred partner for inbound groups.'
  };

  return (
    <div className="trip-overview">
      <button className="btn-back" onClick={() => navigate('/agents')}>← Back to Agents</button>

      <div className="info-section">
        <h1 className="section-title">{agent.name}</h1>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-label">Company</span>
            <span className="info-value">{agent.company}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Contact</span>
            <span className="info-value">{agent.contact}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Email</span>
            <span className="info-value"><a href={`mailto:${agent.email}`}>{agent.email}</a></span>
          </div>
          <div className="info-card">
            <span className="info-label">Address</span>
            <span className="info-value">{agent.address}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">Notes</h3>
        <div className="notes-box">
          <p>{agent.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
