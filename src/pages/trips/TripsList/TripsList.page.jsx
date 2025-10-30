import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TripsList.page.css';

const TripsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const trips = [
    { id: 1, name: 'Maldives Paradise', destination: 'Maldives', guide: 'Kamal Silva', startDate: '2025-11-15', endDate: '2025-11-22', guests: 15, status: 'Upcoming' },
    { id: 2, name: 'Sigiriya Adventure', destination: 'Sigiriya, Sri Lanka', guide: 'Nimal Perera', startDate: '2025-10-28', endDate: '2025-11-02', guests: 12, status: 'Ongoing' },
    { id: 3, name: 'Ella Mountain Trek', destination: 'Ella, Sri Lanka', guide: 'Sunil Fernando', startDate: '2025-09-10', endDate: '2025-09-15', guests: 8, status: 'Completed' },
    { id: 4, name: 'Galle Fort Tour', destination: 'Galle, Sri Lanka', guide: 'Kamal Silva', startDate: '2025-11-05', endDate: '2025-11-08', guests: 20, status: 'Upcoming' },
    { id: 5, name: 'Kandy Cultural Tour', destination: 'Kandy, Sri Lanka', guide: 'Nimal Perera', startDate: '2025-10-20', endDate: '2025-10-25', guests: 10, status: 'Ongoing' },
    { id: 6, name: 'Yala Safari Experience', destination: 'Yala, Sri Lanka', guide: 'Sunil Fernando', startDate: '2025-09-01', endDate: '2025-09-05', guests: 16, status: 'Completed' }
  ];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'Ongoing': return 'status-ongoing';
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-planned';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="trips-list-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div>
            <h1 className="page-title">Trips Management</h1>
            <p className="page-subtitle">View and manage all your trips</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => {}}>
          <span className="icon-plus"></span> Create New Trip
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon icon-search"></span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by trip name or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Upcoming</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="results-count">
          Showing {filteredTrips.length} of {trips.length} trips
        </div>
      </div>

      {/* Trips Table */}
      <div className="card table-container">
        <table className="trips-table">
          <thead>
            <tr>
              <th>Trip Name</th>
              <th>Destination</th>
              <th>Tour Guide</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map(trip => (
              <tr key={trip.id}>
                <td>
                  <div className="trip-name-cell">
                    <strong>{trip.name}</strong>
                    <span className="trip-id">#{trip.id.toString().padStart(4, '0')}</span>
                  </div>
                </td>
                <td>
                  <span className="destination"><span className="icon-location"></span> {trip.destination}</span>
                </td>
                <td>
                  <span className="guide"><span className="icon-user"></span> {trip.guide}</span>
                </td>
                <td>{trip.startDate}</td>
                <td>{trip.endDate}</td>
                <td>
                  <span className="guests-badge">{trip.guests} guests</span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(trip.status)}`}>
                    {trip.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn btn-view"
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      title="View Details"
                    >
                      <span className="icon-eye"></span>
                    </button>
                    <button
                      className="action-btn btn-edit"
                      onClick={() => {}}
                      title="Edit"
                    >
                      <span className="icon-edit"></span>
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => {}}
                      title="Delete"
                    >
                      <span className="icon-trash"></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTrips.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon icon-search"></span>
            <h3>No trips found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsList;
