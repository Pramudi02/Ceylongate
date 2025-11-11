import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../trips/TripDetails/TripOverview/TripOverview.tab.css';
import { sampleTrips } from '../../../data/trips.sample';
import CreateAgentForm from '../CreateAgentForm/CreateAgentForm';

const AgentDetails = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();

  // mock data (matches compact travel_agents schema) — now editable
  const [agent, setAgent] = useState({
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
  });

  const [showEdit, setShowEdit] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Ongoing': return 'trip-status-ongoing';
      case 'Completed': return 'trip-status-completed';
      case 'Upcoming': return 'trip-status-planned';
      case 'Cancelled': return 'trip-status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="trip-overview">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button className="btn-back" onClick={() => navigate('/agents')}>← Back to Agents</button>
        <div>
          <button className="btn-view" style={{marginRight: '8px'}} onClick={() => setShowEdit(true)}>Edit</button>
        </div>
      </div>

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

      {showEdit && (
        <CreateAgentForm
          isEditMode={true}
          initialData={{
            name: agent.full_name,
            company: '',
            contact: agent.phone_number,
            email: agent.primary_email,
            address: { street: agent.address_line1, city: agent.city, postal: agent.postal_code, country: agent.country },
            notes: agent.description
          }}
          onSubmit={(payload) => {
            // merge submitted payload into agent state
            setAgent(prev => ({
              ...prev,
              full_name: payload.name || prev.full_name,
              primary_email: payload.email || prev.primary_email,
              phone_number: payload.contact || prev.phone_number,
              address_line1: payload.address?.street || prev.address_line1,
              city: payload.address?.city || prev.city,
              postal_code: payload.address?.postal || prev.postal_code,
              country: payload.address?.country || prev.country,
              description: payload.notes || prev.description,
              updated_at: new Date().toISOString()
            }));
            setShowEdit(false);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* compact timestamps (no Metadata section needed) */}
      <div className="info-section" style={{marginTop: '6px'}}>
        <div style={{fontSize: '0.95rem', color: '#666'}}>
          <span style={{marginRight: '16px'}}>Created 1/10/2025, 3:30:00 PM</span>
          <span>Last Updated 9/1/2025, 5:30:00 PM</span>
        </div>
      </div>
      
      <div className="info-section">
        <h3 className="section-title">Related Trips</h3>
        <div className="passengers-table-container" style={{marginTop: '8px'}}>
          <table className="passengers-table">
            <thead>
              <tr>
                <th>Tour No</th>
                <th>Trip Name</th>
                <th>Period</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/** Match trips where agent name matches or contains the agent.full_name (flexible matching) */}
              {(() => {
                const agentName = (agent.full_name || '').toLowerCase();
                const related = sampleTrips.filter(trip => {
                  const tripAgent = (trip.agent?.name || '').toLowerCase();
                  return tripAgent === agentName || tripAgent.includes(agentName) || agentName.includes(tripAgent);
                });

                // if no related trips found, show a few sample rows so the table isn't empty
                const rows = related.length ? related : sampleTrips.slice(0, 3);

                return rows.map(trip => (
                  <tr key={trip.id}>
                    <td><strong>{trip.tourNo}</strong></td>
                    <td>{trip.name}</td>
                    <td>{trip.startDate} → {trip.endDate}</td>
                    <td>{trip.numberOfClients}</td>
                    <td><span className={`badge ${getStatusClass(trip.status)}`}>{trip.status}</span></td>
                    <td>
                      <button className="btn-view" onClick={() => navigate(`/trips/${trip.id}`, { state: { trip } })}>
                        View Trip
                      </button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default AgentDetails;
