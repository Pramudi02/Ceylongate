import React from 'react';
import './InvoiceDetailsView.css';

const InvoiceDetailsView = ({ invoice, onClose, onEdit, onDownload }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const latestVersion = invoice.versionHistory?.[invoice.versionHistory.length - 1]?.snapshot || invoice;

  return (
    <div className="invoice-details-modal" onClick={onClose}>
      <div className="invoice-details-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="invoice-details-header">
          <div>
            <h2>Invoice Details</h2>
            {invoice.status === 'Final' && (
              <div className="invoice-version-info">
                <span className="invoice-latest-badge">FINALIZED</span>
              </div>
            )}
          </div>
          <button className="invoice-btn-close-details" onClick={onClose} aria-label="Close">
            <span className="invoice-close-icon">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="invoice-details-body">
          <div className="invoice-document-view">
            {/* Document Title */}
            <div className="invoice-document-title">
              <h1>INVOICE</h1>
              <div className="invoice-subtitle">{latestVersion.id || invoice.id}</div>
            </div>

            {/* Document Content */}
            <div className="invoice-document-content">
              {/* Agent Info Section */}
              <div className="invoice-agent-section">
                <div className="invoice-agent-header">BILLING FROM</div>
                <div className="invoice-agent-details">
                  <strong>{latestVersion.agent?.name || 'N/A'}</strong>
                  <div>{latestVersion.agent?.address || ''}</div>
                  <div>Email: {latestVersion.agent?.email || ''}</div>
                  <div>Tel: {latestVersion.agent?.telephone || ''}</div>
                </div>
              </div>

              {/* Client Info Section */}
              <div className="invoice-client-section">
                <div className="invoice-client-header">BILLING TO</div>
                <div className="invoice-client-details">
                  <strong>{latestVersion.reimbursement?.clientName || 'N/A'}</strong>
                  <div>Country: {latestVersion.invoiceDetails?.clientCountry || ''}</div>
                  <div>Travel: {latestVersion.reimbursement?.travelFrom || ''} to {latestVersion.reimbursement?.travelTo || ''}</div>
                </div>
              </div>

              {/* Invoice Info Grid */}
              <div className="invoice-info-grid">
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Invoice No.</div>
                  <div className="invoice-info-value">{latestVersion.invoiceDetails?.invoiceNo || invoice.id}</div>
                </div>
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Invoice Date</div>
                  <div className="invoice-info-value">{latestVersion.invoiceDetails?.invoiceDate || invoice.created}</div>
                </div>
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Tour No.</div>
                  <div className="invoice-info-value">{latestVersion.invoiceDetails?.tourNo || 'N/A'}</div>
                </div>
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Currency</div>
                  <div className="invoice-info-value">{latestVersion.invoiceDetails?.invoiceCurrency || 'USD'}</div>
                </div>
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Country</div>
                  <div className="invoice-info-value">{latestVersion.invoiceDetails?.country || 'N/A'}</div>
                </div>
                <div className="invoice-info-item">
                  <div className="invoice-info-label">Status</div>
                  <div className="invoice-info-value">
                    <span className={`invoice-status-badge-view ${invoice.status === 'Final' ? 'status-final' : invoice.status === 'Draft' ? 'status-draft' : 'status-cancelled'}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reimbursement Text */}
              {latestVersion.reimbursement?.reimbursementText && (
                <div className="invoice-reimbursement-section">
                  <div className="invoice-section-title">Description</div>
                  <p>{latestVersion.reimbursement.reimbursementText}</p>
                </div>
              )}

              {/* Invoice Items Table */}
              <div className="invoice-table-wrapper">
                <table className="invoice-details-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Country</th>
                      <th>Unit</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(latestVersion.rows || []).map((row, idx) => (
                      <tr key={row.id || idx}>
                        <td className="invoice-desc-cell">{row.description}</td>
                        <td className="invoice-country-cell">{row.country}</td>
                        <td className="invoice-unit-cell">{row.unit}</td>
                        <td className="invoice-rate-cell">{row.rate}</td>
                        <td className="invoice-amount-cell">{((Number(row.unit) || 0) * (Number(row.rate) || 0)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="invoice-totals-section">
                <div className="invoice-totals-grid">
                  <div className="invoice-total-item">
                    <span className="invoice-total-label">Subtotal</span>
                    <span className="invoice-total-value">{latestVersion.invoiceDetails?.invoiceCurrency || 'USD'} {(latestVersion.totals?.total || 0).toFixed(2)}</span>
                  </div>
                  {latestVersion.totals?.tourLeaderDiscount > 0 && (
                    <div className="invoice-total-item">
                      <span className="invoice-total-label">Tour Leader Discount</span>
                      <span className="invoice-total-value">- {latestVersion.invoiceDetails?.invoiceCurrency || 'USD'} {(latestVersion.totals?.tourLeaderDiscount || 0).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="invoice-total-item invoice-grand-total">
                    <span className="invoice-total-label">Grand Total</span>
                    <span className="invoice-total-value">{latestVersion.invoiceDetails?.invoiceCurrency || 'USD'} {(latestVersion.totals?.totalWithDiscount || latestVersion.totals?.total || 0).toFixed(2)}</span>
                  </div>
                  {latestVersion.totals?.amountPaid > 0 && (
                    <div className="invoice-total-item">
                      <span className="invoice-total-label">Amount Paid</span>
                      <span className="invoice-total-value">{latestVersion.invoiceDetails?.invoiceCurrency || 'USD'} {(latestVersion.totals?.amountPaid || 0).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="invoice-total-item invoice-balance">
                    <span className="invoice-total-label">Balance Due</span>
                    <span className="invoice-total-value">{latestVersion.invoiceDetails?.invoiceCurrency || 'USD'} {(latestVersion.totals?.balance || latestVersion.totals?.totalWithDiscount || latestVersion.totals?.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              {latestVersion.payment?.paymentText && (
                <div className="invoice-payment-section">
                  <div className="invoice-section-title">Payment Terms</div>
                  <p>{latestVersion.payment.paymentText}</p>
                  <div className="invoice-payment-mode">
                    <strong>Payment Mode:</strong> {latestVersion.payment.paymentMode || 'N/A'}
                  </div>
                </div>
              )}

              {/* Footer Info */}
              <div className="invoice-footer-section">
                <div className="invoice-footer-grid">
                  <div className="invoice-footer-item">
                    <span className="invoice-footer-label">Prepared By:</span>
                    <span className="invoice-footer-value">{latestVersion.prepared || 'N/A'}</span>
                  </div>
                  <div className="invoice-footer-item">
                    <span className="invoice-footer-label">Checked By:</span>
                    <span className="invoice-footer-value">{latestVersion.checked || 'N/A'}</span>
                  </div>
                  {latestVersion.tripRef && (
                    <div className="invoice-footer-item">
                      <span className="invoice-footer-label">Trip Reference:</span>
                      <span className="invoice-footer-value">{latestVersion.tripRef}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Version History if available */}
              {invoice.versionHistory && invoice.versionHistory.length > 1 && (
                <div className="invoice-version-history-section">
                  <div className="invoice-section-title">Version History</div>
                  <div className="invoice-version-list">
                    {invoice.versionHistory.map((version, idx) => (
                      <div key={version.version} className="invoice-version-item-view">
                        <span className="invoice-version-number">v{version.version}</span>
                        <span className="invoice-version-date">{version.date}</span>
                        <span className="invoice-version-changes">{version.changes}</span>
                        <span className="invoice-version-amount">{version.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="invoice-details-actions">
         
          {onDownload && (
            <button className="invoice-btn-action-modal invoice-btn-download-modal" onClick={() => onDownload(invoice)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download PDF
            </button>
          )}
          {onEdit && invoice.status === 'Draft' && (
            <button className="invoice-btn-action-modal invoice-btn-edit-modal" onClick={() => onEdit(invoice)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit
            </button>
          )}
          <button className="invoice-btn-action-modal invoice-btn-close-alt" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsView;
