import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomersList.page.css';

const CustomersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+94 771234567', totalTrips: 5, lastTrip: '2025-09-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+94 771234568', totalTrips: 3, lastTrip: '2025-10-20' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '+94 771234569', totalTrips: 8, lastTrip: '2025-10-25' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '+94 771234570', totalTrips: 2, lastTrip: '2025-09-30' },
    { id: 5, name: 'David Wilson', email: 'david@email.com', phone: '+94 771234571', totalTrips: 6, lastTrip: '2025-10-18' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+94 771234572', totalTrips: 4, lastTrip: '2025-10-22' }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-list-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div>
            <h1 className="page-title">Customers Database</h1>
            <p className="page-subtitle">Manage your customer relationships</p>
          </div>
        </div>
        <button className="btn-primary">➕ Add New Customer</button>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="results-count">
          {filteredCustomers.length} customers found
        </div>
      </div>

      {/* Customers Grid */}
      <div className="customers-grid">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="customer-avatar">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="customer-info">
              <h3 className="customer-name">{customer.name}</h3>
              <a href={`mailto:${customer.email}`} className="customer-email">
                📧 {customer.email}
              </a>
              <p className="customer-phone">📱 {customer.phone}</p>
            </div>

            <div className="customer-stats">
              <div className="stat-item">
                <span className="stat-label">Total Trips</span>
                <span className="stat-value">{customer.totalTrips}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Trip</span>
                <span className="stat-value">{customer.lastTrip}</span>
              </div>
            </div>

            <div className="customer-actions">
              <button 
                className="btn-action btn-view"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                👁️ View
              </button>
              <button className="btn-action btn-edit">✏️ Edit</button>
              <button className="btn-action btn-delete">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">👥</span>
          <h3>No customers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
