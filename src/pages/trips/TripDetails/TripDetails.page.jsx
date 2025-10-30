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
    tourNo: 'CGT-2025-001',
    name: 'Sri Lanka Heritage Tour',
    countryOfClient: 'Italy',
    agent: {
      name: 'Rome Travel Agency',
      company: 'Roma Viaggi SRL',
      contact: '+39 06 1234567',
      email: 'info@romavaggi.it',
      address: 'Via Roma 123, Rome, Italy'
    },
    guide: {
      name: 'Kamal Silva',
      contact: '+94 77 123 4567',
      email: 'kamal.silva@ceylongate.com',
      license: 'TG-2023-001',
      experience: '10 years',
      languages: ['English', 'Italian', 'Sinhala']
    },
    tripCountry: 'Sri Lanka',
    startDate: '2025-11-15',
    endDate: '2025-11-22',
    days: 8,
    nights: 7,
    numberOfClients: 15,
    clients: [
      { name: 'Marco Rossi', passport: 'IT1234567', contact: '+39 345 1234567', email: 'marco.rossi@email.it' },
      { name: 'Sofia Romano', passport: 'IT2345678', contact: '+39 345 2345678', email: 'sofia.romano@email.it' },
      { name: 'Giovanni Bianchi', passport: 'IT3456789', contact: '+39 345 3456789', email: 'giovanni.b@email.it' }
    ],
    destinations: ['Colombo', 'Kandy', 'Sigiriya', 'Ella', 'Galle'],
    tourType: 'Cultural',
    assignedEmployee: 'Admin User',
    notes: 'VIP group, special dietary requirements for 3 vegetarian guests. Client requested Italian-speaking guide. Airport pickup arranged with luxury coach.',
    status: 'Upcoming',
    itinerary: [
      { day: 1, title: 'Arrival in Colombo', activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'] },
      { day: 2, title: 'Colombo City Tour', activities: ['Gangaramaya Temple', 'National Museum', 'Galle Face Green'] },
      { day: 3, title: 'Colombo to Kandy', activities: ['Pinnawala Elephant Orphanage', 'Temple of the Tooth', 'Cultural show'] },
      { day: 4, title: 'Kandy to Sigiriya', activities: ['Dambulla Cave Temple', 'Sigiriya Rock Fortress', 'Village tour'] },
      { day: 5, title: 'Sigiriya to Ella', activities: ['Minneriya National Park Safari', 'Scenic train journey', 'Tea plantation visit'] },
      { day: 6, title: 'Ella Exploration', activities: ['Nine Arch Bridge', 'Little Adams Peak hike', 'Ravana Falls'] },
      { day: 7, title: 'Ella to Galle', activities: ['Galle Fort tour', 'Beach relaxation', 'Sunset at ramparts'] },
      { day: 8, title: 'Departure', activities: ['Morning at leisure', 'Airport transfer', 'Departure'] }
    ],
    totalCost: 45000,
    paidAmount: 20000,
    balance: 25000,
    currency: 'USD'
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
            <div className="trip-meta">
              <span className="tour-no-badge">{tripData.tourNo}</span>
              <span className="tour-type-badge">{tripData.tourType}</span>
            </div>
            <h1 className="trip-title">{tripData.name}</h1>
            <p className="trip-meta-info">
              <span><span className="icon-location"></span> {tripData.destinations.join(' → ')}</span>
              <span>•</span>
              <span><span className="icon-user"></span> Guide: {tripData.guide.name}</span>
              <span>•</span>
              <span><span className="icon-calendar"></span> {tripData.startDate} to {tripData.endDate} ({tripData.days}D/{tripData.nights}N)</span>
              <span>•</span>
              <span><span className="icon-users"></span> {tripData.numberOfClients} Guests from {tripData.countryOfClient}</span>
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
