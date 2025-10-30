import React, { useState } from 'react';
import './TripInvoices.tab.css';

const TripInvoices = ({ tripData }) => {
  const [expandedInvoices, setExpandedInvoices] = useState({});

  const invoices = [
    {
      id: 'INV-1001',
      status: 'Final',
      total: '$12,500',
      created: '2025-10-15',
      finalized: '2025-10-20',
      versions: 3,
      versionHistory: [
        { version: 1, date: '2025-10-15', amount: '$11,800', changes: 'Initial invoice created' },
        { version: 2, date: '2025-10-18', amount: '$12,200', changes: 'Added extra hotel night' },
        { version: 3, date: '2025-10-20', amount: '$12,500', changes: 'Added airport transfer' }
      ]
    },
    {
      id: 'INV-1002',
      status: 'Draft',
      total: '$8,900',
      created: '2025-10-22',
      finalized: '-',
      versions: 1,
      versionHistory: [
        { version: 1, date: '2025-10-22', amount: '$8,900', changes: 'Draft invoice created' }
      ]
    }
  ];

  const toggleVersions = (invoiceId) => {
    setExpandedInvoices(prev => ({
      ...prev,
      [invoiceId]: !prev[invoiceId]
    }));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Final': return 'status-completed';
      case 'Draft': return 'status-planned';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="trip-invoices">
      <div className="invoices-header">
        <h3 className="section-title">Invoices</h3>
        <button className="btn-primary">➕ Create Invoice</button>
      </div>

      <div className="invoices-list">
        {invoices.map(invoice => (
          <div key={invoice.id} className="invoice-card">
            <div className="invoice-main">
              <div className="invoice-info">
                <h4 className="invoice-id">💰 {invoice.id}</h4>
                <span className={`badge ${getStatusClass(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>

              <div className="invoice-details">
                <div className="detail-item">
                  <span className="detail-label">Total Amount</span>
                  <span className="detail-value amount">{invoice.total}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created</span>
                  <span className="detail-value">{invoice.created}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Finalized</span>
                  <span className="detail-value">{invoice.finalized}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Versions</span>
                  <span className="detail-value">{invoice.versions}</span>
                </div>
              </div>

              <div className="invoice-actions">
                {invoice.status === 'Draft' && (
                  <>
                    <button className="btn-action btn-edit">✏️ Edit</button>
                    <button className="btn-action btn-finalize">✅ Finalize</button>
                  </>
                )}
                {invoice.status === 'Final' && (
                  <button className="btn-action btn-download">📥 Download PDF</button>
                )}
                <button 
                  className="btn-action btn-versions"
                  onClick={() => toggleVersions(invoice.id)}
                >
                  {expandedInvoices[invoice.id] ? '▼' : '▶'} Versions
                </button>
              </div>
            </div>

            {expandedInvoices[invoice.id] && (
              <div className="version-history">
                <h5 className="version-title">Version History</h5>
                <div className="versions-list">
                  {invoice.versionHistory.map(version => (
                    <div key={version.version} className="version-item">
                      <span className="version-badge">v{version.version}</span>
                      <div className="version-details">
                        <p className="version-date">{version.date} • {version.amount}</p>
                        <p className="version-changes">{version.changes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {invoices.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">💰</span>
          <h3>No Invoices Yet</h3>
          <p>Create your first invoice for this trip</p>
          <button className="btn-primary">Create Invoice</button>
        </div>
      )}
    </div>
  );
};

export default TripInvoices;
