import React, { useState } from 'react';
import './Reports.page.css';

// SVG Icons
const IconInvoice = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconHotel = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h18M3 18h18M3 6h18M8 12v6M16 12v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDownload = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconView = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconFilter = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample invoices data
  const invoices = [
    { id: 'INV-1001', trip: 'CGT 2025-11', agent: 'Fuada Tour', client: 'John Doe', amount: 7000, status: 'Final', date: '2025-10-15', finalized: '2025-10-20' },
    { id: 'INV-1002', trip: 'GH-2025-08', agent: 'Green Holidays', client: 'Marie Curie', amount: 3200, status: 'Draft', date: '2025-10-22', finalized: '-' },
    { id: 'INV-1003', trip: 'CGT 2025-12', agent: 'Travel World', client: 'Sarah Johnson', amount: 5500, status: 'Final', date: '2025-10-18', finalized: '2025-10-23' },
    { id: 'INV-1004', trip: 'CGT 2025-13', agent: 'Blue Sky Tours', client: 'Michael Brown', amount: 4200, status: 'Draft', date: '2025-10-25', finalized: '-' },
    { id: 'INV-1005', trip: 'CGT 2025-14', agent: 'Horizon Travel', client: 'Emma Wilson', amount: 6800, status: 'Final', date: '2025-10-19', finalized: '2025-10-24' },
  ];

  // Sample hotel reservations data
  const hotelReservations = [
    { id: 'RES-001', hotel: 'Paradise Beach Resort', trip: 'CGT 2025-10', checkIn: '2025-11-15', checkOut: '2025-11-22', guests: 15, status: 'Confirmed', amount: 24500, confirmationNo: 'HB-2024-1001' },
    { id: 'RES-002', hotel: 'Sunset Villa Maldives', trip: 'CGT 2025-10', checkIn: '2025-11-15', checkOut: '2025-11-18', guests: 8, status: 'Pending', amount: 5400, confirmationNo: 'HB-2024-1002' },
    { id: 'RES-003', hotel: 'Royal Garden Hotel', trip: 'CGT 2025-11', checkIn: '2025-11-20', checkOut: '2025-11-25', guests: 12, status: 'Confirmed', amount: 18000, confirmationNo: 'HB-2024-1003' },
    { id: 'RES-004', hotel: 'Ocean Pearl Resort', trip: 'CGT 2025-12', checkIn: '2025-11-22', checkOut: '2025-11-28', guests: 20, status: 'Confirmed', amount: 32000, confirmationNo: 'HB-2024-1004' },
    { id: 'RES-005', hotel: 'Mountain View Lodge', trip: 'CGT 2025-13', checkIn: '2025-11-18', checkOut: '2025-11-21', guests: 6, status: 'Pending', amount: 4200, confirmationNo: 'HB-2024-1005' },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.trip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredReservations = hotelReservations.filter(reservation => {
    const matchesStatus = filterStatus === 'all' || reservation.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.trip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDownloadReport = () => {
    alert('Downloading report...');
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for ${id}`);
  };

  return (
    <div className="reports-page">
      {/* Animated Background */}
      <div className="reports-bg">
        <div className="reports-bg-orb reports-bg-orb-1"></div>
        <div className="reports-bg-orb reports-bg-orb-2"></div>
        <div className="reports-bg-orb reports-bg-orb-3"></div>
      </div>

      <div className="reports-content">
        {/* Header */}
        <div className="reports-header">
          <div className="reports-header-text">
            <h1 className="reports-title">Reports</h1>
            <p className="reports-subtitle">View and download invoices and hotel reservations</p>
          </div>
          <button className="reports-download-btn" onClick={handleDownloadReport}>
            <IconDownload className="btn-icon" />
            Export Report
          </button>
        </div>

        {/* Tabs */}
        <div className="reports-tabs">
          <button
            className={`reports-tab ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => { setActiveTab('invoices'); setFilterStatus('all'); setSearchTerm(''); }}
          >
            <IconInvoice className="tab-icon" />
            Invoices
            <span className="tab-count">{invoices.length}</span>
          </button>
          <button
            className={`reports-tab ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => { setActiveTab('hotels'); setFilterStatus('all'); setSearchTerm(''); }}
          >
            <IconHotel className="tab-icon" />
            Hotel Reservations
            <span className="tab-count">{hotelReservations.length}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="reports-filters">
          <div className="reports-search">
            <input
              type="text"
              placeholder={`Search ${activeTab === 'invoices' ? 'invoices' : 'reservations'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="reports-search-input"
            />
          </div>
          <div className="reports-filter-group">
            <IconFilter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="reports-filter-select"
            >
              <option value="all">All Status</option>
              {activeTab === 'invoices' ? (
                <>
                  <option value="final">Final</option>
                  <option value="draft">Draft</option>
                </>
              ) : (
                <>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="reports-table-container">
          {activeTab === 'invoices' ? (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Trip</th>
                  <th>Agent</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Finalized</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="reports-table-row">
                    <td className="reports-id">{invoice.id}</td>
                    <td>{invoice.trip}</td>
                    <td>{invoice.agent}</td>
                    <td>{invoice.client}</td>
                    <td className="reports-amount">${invoice.amount.toLocaleString()}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.finalized}</td>
                    <td>
                      <span className={`reports-status-badge ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="reports-action-btn"
                        onClick={() => handleViewDetails(invoice.id)}
                      >
                        <IconView className="action-icon" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Reservation No</th>
                  <th>Hotel</th>
                  <th>Trip</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guests</th>
                  <th>Amount</th>
                  <th>Confirmation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="reports-table-row">
                    <td className="reports-id">{reservation.id}</td>
                    <td>{reservation.hotel}</td>
                    <td>{reservation.trip}</td>
                    <td>{reservation.checkIn}</td>
                    <td>{reservation.checkOut}</td>
                    <td>{reservation.guests}</td>
                    <td className="reports-amount">${reservation.amount.toLocaleString()}</td>
                    <td>{reservation.confirmationNo}</td>
                    <td>
                      <span className={`reports-status-badge ${reservation.status.toLowerCase()}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="reports-action-btn"
                        onClick={() => handleViewDetails(reservation.id)}
                      >
                        <IconView className="action-icon" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Empty State */}
          {((activeTab === 'invoices' && filteredInvoices.length === 0) ||
            (activeTab === 'hotels' && filteredReservations.length === 0)) && (
            <div className="reports-empty-state">
              <p>No {activeTab === 'invoices' ? 'invoices' : 'reservations'} found</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="reports-summary">
          <div className="reports-summary-card">
            <h3>Total {activeTab === 'invoices' ? 'Invoices' : 'Reservations'}</h3>
            <p className="reports-summary-value">
              {activeTab === 'invoices' ? filteredInvoices.length : filteredReservations.length}
            </p>
          </div>
          <div className="reports-summary-card">
            <h3>Total Amount</h3>
            <p className="reports-summary-value">
              ${activeTab === 'invoices'
                ? filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()
                : filteredReservations.reduce((sum, res) => sum + res.amount, 0).toLocaleString()}
            </p>
          </div>
          <div className="reports-summary-card">
            <h3>{activeTab === 'invoices' ? 'Final' : 'Confirmed'}</h3>
            <p className="reports-summary-value">
              {activeTab === 'invoices'
                ? filteredInvoices.filter(inv => inv.status === 'Final').length
                : filteredReservations.filter(res => res.status === 'Confirmed').length}
            </p>
          </div>
          <div className="reports-summary-card">
            <h3>{activeTab === 'invoices' ? 'Draft' : 'Pending'}</h3>
            <p className="reports-summary-value">
              {activeTab === 'invoices'
                ? filteredInvoices.filter(inv => inv.status === 'Draft').length
                : filteredReservations.filter(res => res.status === 'Pending').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
