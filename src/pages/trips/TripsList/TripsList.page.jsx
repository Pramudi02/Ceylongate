import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TripsList.page.css';

const TripsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All Months');
  const [yearFilter, setYearFilter] = useState('All Years');

  const trips = [
    { 
      id: 1, 
      tourNo: 'CGT-2025-001',
      name: 'Sri Lanka Heritage Tour', 
      countryOfClient: 'Italy',
      agent: { name: 'Rome Travel Agency', contact: '+39 06 1234567' },
      guide: { name: 'Kamal Silva', contact: '+94 77 123 4567', license: 'TG-2023-001' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-11-15', 
      endDate: '2025-11-22',
      days: 8,
      nights: 7,
      numberOfClients: 15,
      destinations: ['Colombo', 'Kandy', 'Sigiriya', 'Ella'],
      tourType: 'Cultural',
      assignedEmployee: 'Admin User',
      notes: 'VIP group, special dietary requirements',
      status: 'Upcoming'
    },
    { 
      id: 2, 
      tourNo: 'CGT-2025-002',
      name: 'Romantic Honeymoon Getaway', 
      countryOfClient: 'France',
      agent: { name: 'Paris Luxury Tours', contact: '+33 1 4567890' },
      guide: { name: 'Nimal Perera', contact: '+94 77 234 5678', license: 'TG-2023-012' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-10-28', 
      endDate: '2025-11-05',
      days: 9,
      nights: 8,
      numberOfClients: 2,
      destinations: ['Bentota', 'Ella', 'Nuwara Eliya', 'Galle'],
      tourType: 'Honeymoon',
      assignedEmployee: 'Kamal Silva',
      notes: 'Anniversary celebration, candlelight dinner arrangements',
      status: 'Ongoing'
    },
    { 
      id: 3, 
      tourNo: 'CGT-2025-003',
      name: 'Wildlife Safari Adventure', 
      countryOfClient: 'Germany',
      agent: { name: 'Berlin Adventure Tours', contact: '+49 30 987654' },
      guide: { name: 'Sunil Fernando', contact: '+94 77 345 6789', license: 'TG-2023-025' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-09-10', 
      endDate: '2025-09-17',
      days: 8,
      nights: 7,
      numberOfClients: 8,
      destinations: ['Yala', 'Udawalawe', 'Minneriya', 'Wilpattu'],
      tourType: 'Wildlife',
      assignedEmployee: 'Nimal Perera',
      notes: 'Photography focused group, early morning safaris requested',
      status: 'Completed'
    },
    { 
      id: 4, 
      tourNo: 'CGT-2025-004',
      name: 'Galle Fort Heritage Walk', 
      countryOfClient: 'United Kingdom',
      agent: { name: 'London Historic Tours', contact: '+44 20 7123456' },
      guide: { name: 'Kamal Silva', contact: '+94 77 123 4567', license: 'TG-2023-001' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-11-05', 
      endDate: '2025-11-08',
      days: 4,
      nights: 3,
      numberOfClients: 20,
      destinations: ['Galle', 'Unawatuna', 'Mirissa'],
      tourType: 'Cultural',
      assignedEmployee: 'Admin User',
      notes: 'Group tour, museum visits included',
      status: 'Upcoming'
    },
    { 
      id: 5, 
      tourNo: 'CGT-2025-005',
      name: 'Temple & Tea Country Explorer', 
      countryOfClient: 'Australia',
      agent: { name: 'Sydney Asia Tours', contact: '+61 2 9876543' },
      guide: { name: 'Nimal Perera', contact: '+94 77 234 5678', license: 'TG-2023-012' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-10-20', 
      endDate: '2025-10-27',
      days: 8,
      nights: 7,
      numberOfClients: 10,
      destinations: ['Kandy', 'Nuwara Eliya', 'Dambulla', 'Polonnaruwa'],
      tourType: 'Cultural',
      assignedEmployee: 'Sunil Fernando',
      notes: 'Tea plantation tour and temple visits',
      status: 'Ongoing'
    },
    { 
      id: 6, 
      tourNo: 'CGT-2025-006',
      name: 'Adventure Trekking Expedition', 
      countryOfClient: 'United States',
      agent: { name: 'New York Adventure Co', contact: '+1 212 5551234' },
      guide: { name: 'Sunil Fernando', contact: '+94 77 345 6789', license: 'TG-2023-025' },
      tripCountry: 'Sri Lanka',
      startDate: '2025-09-01', 
      endDate: '2025-09-10',
      days: 10,
      nights: 9,
      numberOfClients: 16,
      destinations: ['Ella', 'Horton Plains', 'Adams Peak', 'Knuckles Range'],
      tourType: 'Adventure',
      assignedEmployee: 'Admin User',
      notes: 'Hiking group, camping equipment provided',
      status: 'Completed'
    }
  ];

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

        <div className="results-count">
          Showing {filteredTrips.length} of {trips.length} trips
        </div>
      </div>

      {/* Trips Table */}
      <div className="card table-container">
        <table className="trips-table">
          <thead>
            <tr>
              <th>Tour No</th>
              <th>Trip Name</th>
              <th>Client Country</th>
              <th>Destinations</th>
              <th>Tour Guide</th>
              <th>Travel Period</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map(trip => (
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
                  <div className="destinations-cell">
                    <span className="icon-location"></span>
                    {trip.destinations.slice(0, 2).join(', ')}
                    {trip.destinations.length > 2 && <span className="more-badge">+{trip.destinations.length - 2}</span>}
                  </div>
                </td>
                <td>
                  <div className="guide-cell">
                    <span className="guide-name">{trip.guide.name}</span>
                    <span className="guide-license">{trip.guide.license}</span>
                  </div>
                </td>
                <td>
                  <div className="period-cell">
                    <span className="dates">{trip.startDate} → {trip.endDate}</span>
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
                    onClick={() => navigate(`/trips/${trip.id}`)}
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
      </div>
    </div>
  );
};

export default TripsList;
