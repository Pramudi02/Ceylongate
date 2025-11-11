import React, { useState } from 'react';

// small inline SVG icons to avoid emoji usage
const IconCurrency = ({className}) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconEdit = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconView = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDownload = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCancel = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChevronDown = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChevronRight = ({className}) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
import './TripInvoices.tab.css';
import CreateInvoiceModal from './CreateInvoice/CreateInvoice.modal';
import InvoiceDetailsView from './InvoiceDetailsView';

const TripInvoices = ({ tripData }) => {
  const [expandedInvoices, setExpandedInvoices] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'view'
  const [showDetailsView, setShowDetailsView] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState(null);

  // Sample invoices in the full structure used by the CreateInvoice modal
  const initialInvoices = [
    (() => {
      const base = {
        id: 'INV-1002',
        status: 'Draft',
        created: '2025-10-22',
        finalized: '-',
        agent: { name: 'Green Holidays', address: 'Rue de Provence 12, Paris', email: 'sales@greenholidays.com', telephone: '+33 1 23 45 67' },
        invoiceDetails: { invoiceNo: 'INV-1002', invoiceDate: '2025-10-22', country: 'Sri Lanka', clientCountry: 'France', tourNo: 'GH-2025-08', invoiceCurrency: 'EUR' },
        reimbursement: { reimbursementText: 'Being cost of group round tour in Sri Lanka', clientName: 'Marie Curie', travelFrom: '2025-12-01', travelTo: '2025-12-10' },
        rows: [
          { id: 'r1', country: 'Sri Lanka', description: 'Per person sharing DBL/TWIN room in HB basis - Sri Lanka', unit: 8, rate: 400 },
        ],
        totals: { total: 8*400, tourLeaderDiscount: 0, totalWithDiscount: (8*400), amountPaid: 0, balance: (8*400) },
        payment: { paymentMode: 'Advance', paymentText: '40% advance payment on confirmation, balance 45 days prior to travel.', bankId: 'acc-2' },
        prepared: 'Admin User',
        checked: 'Gayana Soisa',
        tripRef: 'TRIP-002'
      };

      const history = [ { version: 1, date: '2025-10-22', amount: `$${base.totals.total.toFixed(2)}`, changes: 'Draft invoice created', snapshot: JSON.parse(JSON.stringify(base)) } ];
      return { ...base, versions: 1, total: `$${base.totals.total.toFixed(2)}`, versionHistory: history };
    })(),
    (() => {
      const base = {
        id: 'INV-1001',
        status: 'Final',
        created: '2025-10-15',
        finalized: '2025-10-20',
        agent: { name: 'Fuada Tour', address: 'Via del Forte Tiburtino, 160-00159, Roma', email: 'info@fuadatour.com', telephone: '06/40501946' },
        invoiceDetails: { invoiceNo: 'INV-1001', invoiceDate: '2025-10-15', country: 'Both', clientCountry: 'Italy', tourNo: 'CGT 2025-11', invoiceCurrency: 'USD' },
        reimbursement: { reimbursementText: 'Being cost of group round tour in Sri Lanka and Maldives', clientName: 'John Doe', travelFrom: '2025-11-01', travelTo: '2025-11-12' },
        rows: [
          { id: 'r1', country: 'Sri Lanka', description: 'Per person sharing DBL/TWIN room in HB basis - Sri Lanka', unit: 10, rate: 500 },
          { id: 'r2', country: 'Sri Lanka', description: 'Per person SGL room in HB basis - Sri Lanka', unit: 2, rate: 700 },
          { id: 'r3', country: 'Maldives', description: 'Water villa supplement - Maldives', unit: 2, rate: 300 },
        ],
        totals: { total: 10*500 + 2*700 + 2*300, tourLeaderDiscount: 0, totalWithDiscount: (10*500 + 2*700 + 2*300), amountPaid: 0, balance: (10*500 + 2*700 + 2*300) },
        payment: { paymentMode: 'Full', paymentText: 'Full payment prior to 14 days of arrival date - Sri Lanka/Maldives.', bankId: 'acc-1' },
        prepared: 'Gayana Soisa',
        checked: 'Nayomika Fernando',
        tripRef: 'TRIP-001'
      };

      // create a versionHistory with a few snapshots showing edits
      const history = [
        { version: 1, date: '2025-10-15', amount: `$${(base.totals.total).toFixed(2)}`, changes: 'Initial invoice created', snapshot: JSON.parse(JSON.stringify(base)) },
      ];

      // Simulate two more edits (additions)
      const edit1 = JSON.parse(JSON.stringify(base));
      edit1.rows.push({ id: 'r4', country: 'Sri Lanka', description: 'Airport transfer', unit: 1, rate: 300 });
      edit1.totals.total += 300; edit1.totals.totalWithDiscount += 300; edit1.totals.balance += 300;
      history.push({ version: 2, date: '2025-10-18', amount: `$${edit1.totals.total.toFixed(2)}`, changes: 'Added airport transfer to SL', snapshot: edit1 });

      const edit2 = JSON.parse(JSON.stringify(edit1));
      edit2.rows.push({ id: 'r5', country: 'Maldives', description: 'Extra snorkeling trip', unit: 1, rate: 200 });
      edit2.totals.total += 200; edit2.totals.totalWithDiscount += 200; edit2.totals.balance += 200;
      history.push({ version: 3, date: '2025-10-20', amount: `$${edit2.totals.total.toFixed(2)}`, changes: 'Added Maldives activity', snapshot: edit2 });

      return { ...edit2, versions: history.length, total: `$${edit2.totals.total.toFixed(2)}`, versionHistory: history };
    })()
  ];

  const [invoices, setInvoices] = useState(initialInvoices);

  const toggleVersions = (invoiceId) => {
    setExpandedInvoices(prev => ({
      ...prev,
      [invoiceId]: !prev[invoiceId]
    }));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Final': return 'trip-invoices-status-final';
      case 'Draft': return 'trip-invoices-status-draft';
      case 'Cancelled': return 'trip-invoices-status-cancelled';
      default: return '';
    }
  };

  const finalizeInvoice = (invoiceId) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? ({ ...inv, status: 'Final', finalized: new Date().toISOString().slice(0,10) }) : inv));
  };

  const cancelInvoice = (invoiceId) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? ({ ...inv, status: 'Cancelled' }) : inv));
  };

  const downloadInvoiceSnapshot = (invoice, versionIndex) => {
    try {
      const history = invoice.versionHistory || [];
      const idx = (typeof versionIndex === 'number') ? versionIndex : history.length - 1;
      const version = history[idx] || {};
      const snapshot = version.snapshot || invoice;

      // build a minimal printable HTML
      const rowsHtml = (snapshot.rows || []).map(r => `
        <tr>
          <td style="padding:6px;border:1px solid #ddd">${(r.description || '')}</td>
          <td style="padding:6px;border:1px solid #ddd;text-align:center">${r.unit || ''}</td>
          <td style="padding:6px;border:1px solid #ddd;text-align:right">${r.rate || ''}</td>
          <td style="padding:6px;border:1px solid #ddd;text-align:right">${((Number(r.unit||0)*Number(r.rate||0))||0).toFixed(2)}</td>
        </tr>
      `).join('');

      const html = `
        <html>
          <head>
            <title>Invoice ${snapshot.id || invoice.id}</title>
          </head>
          <body>
            <h2>Invoice ${snapshot.id || invoice.id}</h2>
            <div>${snapshot.invoiceDetails?.invoiceDate || snapshot.created || ''}</div>
            <div>Client: ${snapshot.reimbursement?.clientName || ''}</div>
            <div>Travel Countries: ${snapshot.invoiceDetails?.country || snapshot.country || ''}</div>
            <hr />
            <table style="border-collapse:collapse;width:100%">
              <thead>
                <tr>
                  <th style="padding:6px;border:1px solid #ddd;text-align:left">Description</th>
                  <th style="padding:6px;border:1px solid #ddd">Unit</th>
                  <th style="padding:6px;border:1px solid #ddd">Rate</th>
                  <th style="padding:6px;border:1px solid #ddd">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
            <div style="margin-top:12px;font-weight:600">Total: ${snapshot.totals ? (snapshot.totals.totalWithDiscount !== undefined ? snapshot.totals.totalWithDiscount : snapshot.totals.total) : invoice.total}</div>
            <div style="margin-top:40px;font-size:12px;color:#666">Generated from Ceylongate App</div>
          </body>
        </html>
      `;

      const w = window.open('', '_blank');
      if (!w) return alert('Popup blocked - allow popups to download/print PDF');
      w.document.write(html);
      w.document.close();
      w.focus();
      // give browser a moment then trigger print
      setTimeout(() => { w.print(); }, 300);
    } catch (err) {
      console.error('Download invoice error', err);
      alert('Unable to prepare invoice for download');
    }
  };

  return (
    <div className="trip-invoices-view">
      <div className="trip-invoices-header">
  <h3 className="section-title">Invoices</h3>
  <button className="trip-invoices-create-btn" onClick={() => { setEditingInvoice(null); setShowCreateModal(true); }}>+ Create Invoice</button>
      </div>

        <div className="trip-invoices-list">
        {invoices.map(invoice => (
          <div key={invoice.id} className="trip-invoices-card">
            <div className="trip-invoices-card-main">
              <div className="trip-invoices-card-info">
                <h4 className="trip-invoices-card-id"><IconCurrency /> {invoice.id}</h4>
                <span className={`trip-invoices-status-badge ${getStatusClass(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>

              <div className="trip-invoices-details-section">
                <div className="trip-invoices-details-grid">
                  <div className="trip-invoices-detail-item">
                    <span className="trip-invoices-detail-label">Total Amount</span>
                    <span className="trip-invoices-detail-value trip-invoices-amount">{invoice.total}</span>
                  </div>
                  <div className="trip-invoices-detail-item">
                    <span className="trip-invoices-detail-label">Created</span>
                    <span className="trip-invoices-detail-value">{invoice.created}</span>
                  </div>
                  <div className="trip-invoices-detail-item">
                    <span className="trip-invoices-detail-label">Finalized</span>
                    <span className="trip-invoices-detail-value">{invoice.finalized}</span>
                  </div>
                  <div className="trip-invoices-detail-item">
                    <span className="trip-invoices-detail-label">Versions</span>
                    <span className="trip-invoices-detail-value">{invoice.versions}</span>
                  </div>
                </div>
              </div>

              <div className="trip-invoices-actions-section">
                <div className="trip-invoices-actions-grid">
                  {/* Order: Edit > View > Finalize > Download > Cancel > Versions */}
                  {invoice.status === 'Draft' && (
                    <button className="trip-invoices-btn-action trip-invoices-btn-edit" onClick={() => { setEditingInvoice(invoice); setModalMode('edit'); setShowCreateModal(true); }}><IconEdit /> Edit</button>
                  )}

                  <button className="trip-invoices-btn-action trip-invoices-btn-view" onClick={() => { 
                    setViewingInvoice(invoice); 
                    setShowDetailsView(true); 
                  }}><IconView /> View</button>

                  {invoice.status === 'Draft' && (
                    <button className="trip-invoices-btn-action trip-invoices-btn-finalize" onClick={() => finalizeInvoice(invoice.id)}><IconCheck /> Finalize</button>
                  )}

                  <button className="trip-invoices-btn-action trip-invoices-btn-download" onClick={() => downloadInvoiceSnapshot(invoice)}><IconDownload /> Download</button>

                  {invoice.status !== 'Cancelled' && (
                    <button className="trip-invoices-btn-action trip-invoices-btn-cancel" onClick={() => cancelInvoice(invoice.id)}><IconCancel /> Cancel</button>
                  )}

                  <button 
                    className="trip-invoices-btn-action trip-invoices-btn-versions"
                    onClick={() => toggleVersions(invoice.id)}
                  >
                    {expandedInvoices[invoice.id] ? <IconChevronDown /> : <IconChevronRight />} Versions
                  </button>
                </div>
              </div>
            </div>

            {expandedInvoices[invoice.id] && (
              <div className="trip-invoices-version-history">
                <h5 className="trip-invoices-version-title">Version History</h5>
                <div className="trip-invoices-versions-list">
                  {invoice.versionHistory.map((version, idx) => (
                    <div key={version.version} className="trip-invoices-version-item">
                      <span className="trip-invoices-version-badge">v{version.version}</span>
                      <div className="trip-invoices-version-details">
                        <p className="trip-invoices-version-date">{version.date} • {version.amount}</p>
                        <p className="trip-invoices-version-changes">{version.changes}</p>
                      </div>
                      <div className="trip-invoices-version-actions">
                        <button className="trip-invoices-btn-view-version" onClick={() => {
                          // open the details view for this specific version snapshot
                          const versionSnapshot = { ...invoice, ...version.snapshot };
                          setViewingInvoice(versionSnapshot);
                          setShowDetailsView(true);
                        }}><IconView /></button>
                        <button className="trip-invoices-btn-download-version" onClick={() => downloadInvoiceSnapshot(invoice, idx)}><IconDownload /></button>
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
        <div className="trip-invoices-empty-state">
          <span className="trip-invoices-empty-icon"><IconCurrency /></span>
          <h3>No Invoices Yet</h3>
          <p>Create your first invoice for this trip</p>
          <button className="trip-invoices-empty-create-btn" onClick={() => { setEditingInvoice(null); setShowCreateModal(true); }}>Create Invoice</button>
        </div>
      )}

      {showCreateModal && (
        <CreateInvoiceModal
          tripData={tripData}
          initialInvoice={editingInvoice}
          viewOnly={modalMode === 'view'}
          onClose={() => { setShowCreateModal(false); setEditingInvoice(null); setModalMode('create'); }}
          onCreate={(newInvoice) => {
            setInvoices(prev => {
              // if invoice exists replace, otherwise add
              const exists = prev.some(inv => inv.id === newInvoice.id);
              if (exists) return prev.map(inv => inv.id === newInvoice.id ? newInvoice : inv);
              return [newInvoice, ...prev];
            });
            setShowCreateModal(false);
            setEditingInvoice(null);
            setModalMode('create');
          }}
        />
      )}

      {showDetailsView && viewingInvoice && (
        <InvoiceDetailsView
          invoice={viewingInvoice}
          onClose={() => {
            setShowDetailsView(false);
            setViewingInvoice(null);
          }}
          onEdit={(invoice) => {
            setShowDetailsView(false);
            setEditingInvoice(invoice);
            setModalMode('edit');
            setShowCreateModal(true);
          }}
          onDownload={downloadInvoiceSnapshot}
        />
      )}
      
    </div>
  );
};

export default TripInvoices;
