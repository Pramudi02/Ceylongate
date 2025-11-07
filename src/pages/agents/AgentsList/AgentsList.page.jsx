import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import CreateAgentForm from '../CreateAgentForm/CreateAgentForm';

const AgentsList = () => {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const agents = [
    { id: 'a1', name: 'Ceylon Travel Pvt Ltd', contact: '+94 77 1234567', email: 'sales@ceylongate.com', region: 'Sri Lanka' },
    { id: 'a2', name: 'Island Tours', contact: '+94 77 2345678', email: 'info@islandtours.com', region: 'Maldives' }
  ];

  return (
    <div className="trip-overview">
      <div className="info-section">
        <div className="section-header-with-button">
          <h1 className="section-title">Travel Agents</h1>
          <div>
            <button className="btn-primary" onClick={() => setShowCreate(true)}>
              + Add New Agent
            </button>
          </div>
        </div>

        <div className="info-grid-boxes">
          {agents.map(agent => (
            <div key={agent.id} className="info-card-box" style={{cursor: 'pointer'}} onClick={() => navigate(`/agents/${agent.id}`)}>
              <span className="info-label">{agent.name}</span>
              <span className="info-value">{agent.region} • <a href={`mailto:${agent.email}`}>{agent.email}</a></span>
            </div>
          ))}
        </div>
      </div>

      {showCreate && <CreateAgentForm onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default AgentsList;
