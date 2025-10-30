import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TripOverview from './TripOverview/TripOverview.tab';
import TripInvoices from './TripInvoices/TripInvoices.tab';
import TripHotels from './TripHotels/TripHotels.tab';
import TripVouchers from './TripVouchers/TripVouchers.tab';
import TripFeedback from './TripFeedback/TripFeedback.tab';
import './TripDetails.page.css';

const TripDetails = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const tripData = {
    id: tripId,
    name: 'Maldives Paradise',
    destination: 'Maldives',
    guide: 'Kamal Silva',
    startDate: '2025-11-15',
    endDate: '2025-11-22',
    guests: 15,
    status: 'Upcoming'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'file' },
    { id: 'invoices', label: 'Invoices', icon: 'dollar' },
    { id: 'hotels', label: 'Hotels', icon: 'hotel' },
    { id: 'vouchers', label: 'Vouchers', icon: 'document' },
    { id: 'feedback', label: 'Feedback', icon: 'star' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <TripOverview tripData={tripData} />;
      case 'invoices':
        return <TripInvoices tripData={tripData} />;
      case 'hotels':
        return <TripHotels tripData={tripData} />;
      case 'vouchers':
        return <TripVouchers tripData={tripData} />;
      case 'feedback':
        return <TripFeedback tripData={tripData} />;
      default:
        return <TripOverview tripData={tripData} />;
    }
  };

  return (
    <div className="trip-details-page">
      {/* Header */}
      <div className="trip-header">
        <button className="btn-back" onClick={() => navigate('/trips')}>
          ← Back to Trips
        </button>
        
        <div className="trip-header-content">
          <div>
            <h1 className="trip-title">{tripData.name}</h1>
            <p className="trip-meta">
              <span><span className="icon-location"></span> {tripData.destination}</span>
              <span>•</span>
              <span><span className="icon-user"></span> Guide: {tripData.guide}</span>
              <span>•</span>
              <span><span className="icon-calendar"></span> {tripData.startDate} to {tripData.endDate}</span>
            </p>
          </div>
          <span className="badge status-planned">{tripData.status}</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={`tab-icon icon-${tab.icon}`}></span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
