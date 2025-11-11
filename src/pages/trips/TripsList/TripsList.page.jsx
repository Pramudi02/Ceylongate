import React, { useState } from 'react';
import { sampleTrips } from '../../../data/trips.sample';
import { useNavigate } from 'react-router-dom';
import './TripsList.page.css';
import CreateTripForm from './CreateTripForm';

const TripsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All Months');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [trips, setTrips] = useState(sampleTrips);

  const handleCreateTrip = (newTrip) => {
    setTrips(prev => [...prev, newTrip]);
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.tourNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destinations.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.countryOfClient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    
    // Month and Year filtering
    const tripDate = new Date(trip.startDate);
    const tripMonth = tripDate.getMonth() + 1; // 0-based, so add 1
    const tripYear = tripDate.getFullYear();
    
    const matchesMonth = monthFilter === 'All Months' || parseInt(monthFilter) === tripMonth;
    const matchesYear = yearFilter === 'All Years' || parseInt(yearFilter) === tripYear;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  // Sort by status priority (Upcoming -> Ongoing -> Completed -> Cancelled),
  // then by startDate ascending within each group so upcoming trips are shown first and ordered by date.
  const statusOrder = { 'Upcoming': 0, 'Ongoing': 1, 'Completed': 2, 'Cancelled': 3 };
  const sortedTrips = filteredTrips.slice().sort((a, b) => {
    const sa = statusOrder[a.status] ?? 99;
    const sb = statusOrder[b.status] ?? 99;
    if (sa !== sb) return sa - sb;
    return new Date(a.startDate) - new Date(b.startDate);
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'Ongoing': return 'trip-status-ongoing';
      case 'Completed': return 'trip-status-completed';
      case 'Upcoming': return 'trip-status-planned';
      case 'Cancelled': return 'trip-status-cancelled';
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
        <button className="btn-primary" onClick={() => setShowCreateForm(true)}>
          <span className="icon-plus">+</span> Create New Trip
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

        <div className="filter-group date-filter-group">
          <label className="filter-label">Period:</label>
          <select
            className="filter-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option>All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            className="filter-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option>All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>

      {/* Trips Table */}
      <div className="card table-container">
        <table className="trips-table">
          <thead>
            <tr>
              <th>Tour No</th>
              <th>Trip Name</th>
              <th>Country</th>
              <th>Tour Guide</th>
              <th>Travel Period</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrips.map(trip => (
              <tr key={trip.id}>
                <td>
                  <div className="tour-no-cell">
                    <strong>{trip.tourNo}</strong>
                  </div>
                </td>
                <td>
                  <div className="trip-name-cell">
                    <strong>{trip.name}</strong>
                  </div>
                </td>
                <td>
                  <span className="country-badge">{trip.countryOfClient}</span>
                </td>
                <td>
                  <div className="guide-cell">
                    <span className="guide-name">{trip.guide.name}</span>
                    <span className="guide-license">{trip.guide.license}</span>
                  </div>
                </td>
                <td>
                  <div className="period-cell">
                    <span className="date-start">{trip.startDate}</span>
                    <span className="date-end">{trip.endDate}</span>
                    <span className="days-badge">{trip.days}D/{trip.nights}N</span>
                  </div>
                </td>
                <td>
                  <span className="guests-badge">{trip.numberOfClients}</span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(trip.status)}`}>
                    {trip.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-view-more"
                    onClick={() => navigate(`/trips/${trip.id}`, { state: { trip } })}
                  >
                    <span className="icon-eye"></span>
                    View More
                  </button>
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

        <div className="table-footer">
          <div className="footer-info">
            <span className="icon-list"></span>
            <span className="footer-text">
              Displaying <strong>{filteredTrips.length}</strong> of <strong>{trips.length}</strong> total trips
            </span>
          </div>
        </div>
      </div>

      {/* Create Trip Form Modal */}
      {showCreateForm && (
        <CreateTripForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateTrip}
        />
      )}
    </div>
  );
};

export default TripsList;
