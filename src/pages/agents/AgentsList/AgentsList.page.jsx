import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import CreateAgentForm from '../CreateAgentForm/CreateAgentForm';

const AgentsList = () => {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const agents = [
    {
      id: 'a1',
      full_name: 'Ceylon Travel Pvt Ltd',
      primary_email: 'sales@ceylongate.com',
      support_email: 'support@ceylongate.com',
      phone_number: '+94771234567',
      secondary_phone: '',
      address_line1: 'No 12, Galle Rd',
      city: 'Colombo',
      country: 'Sri Lanka',
      commission_rate: 10.0,
      last_trip_date: '2025-10-22'
    },
    {
      id: 'a2',
      full_name: 'Island Tours',
      primary_email: 'info@islandtours.com',
      support_email: '',
      phone_number: '+960771234567',
      secondary_phone: '',
      address_line1: '',
      city: '',
      country: 'Maldives',
      commission_rate: 12.5
    },
    {
      id: 'a3',
      full_name: 'Global Getaways Ltd',
      primary_email: 'hello@globalgetaways.com',
      support_email: 'help@globalgetaways.com',
      phone_number: '+442071234567',
      secondary_phone: '+447701234567',
      address_line1: '22 Baker Street',
      city: 'London',
      country: 'United Kingdom',
      commission_rate: 8.5
    },
    {
      id: 'a4',
      full_name: 'Nordic Routes',
      primary_email: 'contact@nordicroutes.se',
      support_email: '',
      phone_number: '+46701234567',
      secondary_phone: '',
      address_line1: 'Sodra Hamngatan 21',
      city: 'Stockholm',
      country: 'Sweden',
      commission_rate: 9.0
    }
  ];

  // sort agents by last_trip_date (most recent first). If missing date, push to end.
  const sortedAgents = agents.slice().sort((a, b) => {
    const da = a.last_trip_date ? new Date(a.last_trip_date) : new Date(0);
    const db = b.last_trip_date ? new Date(b.last_trip_date) : new Date(0);
    return db - da; // descending: most recent first
  });

  return (
    <div className="trip-overview">
      <div className="list-banner">
        <div className="banner-left">
          <h2 className="banner-title">Travel Agents</h2>
          <div className="banner-subtitle">Manage partnered agencies and their commission settings</div>
        </div>
        <div className="banner-right">
          <div className="banner-pill">{agents.length} Agents</div>
          <button className="btn-primary btn-large" onClick={() => setShowCreate(true)}>+ Add New Agent</button>
        </div>
      </div>

      <div className="info-section">

        <div className="passengers-table-container" style={{marginTop: '12px'}}>
          <table className="passengers-table agents-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Primary Email</th>
                <th>Last Trip</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAgents.map(agent => (
                <tr key={agent.id}>
                  <td>
                    <span className="passenger-name">{agent.full_name}</span>
                  </td>
                  <td>{agent.country}</td>
                  <td><a href={`mailto:${agent.primary_email}`} className="passenger-email">{agent.primary_email}</a></td>
                  <td>{agent.last_trip_date ? new Date(agent.last_trip_date).toLocaleDateString() : '—'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view" onClick={() => navigate(`/agents/${agent.id}`)}>View Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && <CreateAgentForm onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default AgentsList;
