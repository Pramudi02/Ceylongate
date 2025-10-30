import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CustomerDetails.page.css';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const customer = {
    id: customerId,
    name: 'John Smith',
    email: 'john@email.com',
    phone: '+94 771234567',
    address: '123 Main Street, Colombo, Sri Lanka',
    memberSince: '2023-01-15',
    totalTrips: 5,
    totalSpent: '$15,400',
    feedbacksGiven: 4
  };

  const tripHistory = [
    { id: 1, name: 'Maldives Paradise', date: '2025-09-15', status: 'Completed', amount: '$3,200' },
    { id: 2, name: 'Sigiriya Adventure', date: '2025-07-10', status: 'Completed', amount: '$2,800' },
    { id: 3, name: 'Ella Mountain Trek', date: '2025-05-22', status: 'Completed', amount: '$2,600' },
    { id: 4, name: 'Galle Fort Tour', date: '2025-03-18', status: 'Completed', amount: '$1,900' },
    { id: 5, name: 'Kandy Cultural Tour', date: '2024-12-05', status: 'Completed', amount: '$4,900' }
  ];

  return (
    <div className="customer-details-page">
      {/* Header */}
      <button className="btn-back" onClick={() => navigate('/customers')}>
        ← Back to Customers
      </button>

      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{customer.name}</h1>
            <p className="profile-member">Member since {customer.memberSince}</p>
          </div>
          <button className="btn-primary">✏️ Edit Profile</button>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">📧 Email</span>
            <a href={`mailto:${customer.email}`} className="contact-value">
              {customer.email}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">📱 Phone</span>
            <span className="contact-value">{customer.phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">📍 Address</span>
            <span className="contact-value">{customer.address}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🧳</div>
          <div className="stat-content">
            <span className="stat-label">Total Trips</span>
            <span className="stat-value">{customer.totalTrips}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">{customer.totalSpent}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <span className="stat-label">Feedbacks Given</span>
            <span className="stat-value">{customer.feedbacksGiven}</span>
          </div>
        </div>
      </div>

      {/* Trip History */}
      <div className="card">
        <h3 className="section-title">Trip History</h3>
        <div className="trip-history-table">
          <table>
            <thead>
              <tr>
                <th>Trip Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map(trip => (
                <tr key={trip.id}>
                  <td>
                    <strong>{trip.name}</strong>
                  </td>
                  <td>{trip.date}</td>
                  <td>
                    <span className="badge status-completed">{trip.status}</span>
                  </td>
                  <td className="amount-cell">{trip.amount}</td>
                  <td>
                    <button
                      className="btn-view-trip"
                      onClick={() => navigate(`/trips/${trip.id}`)}
                    >
                      View Trip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
