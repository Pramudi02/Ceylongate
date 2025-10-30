import React from 'react';
import './TripVouchers.tab.css';

const TripVouchers = ({ tripData }) => {
  const vouchers = [
    {
      id: 1,
      voucherNo: 'VCH-2025-001',
      customerName: 'John Smith',
      issuedDate: '2025-10-20',
      services: 'Airport Transfer, Hotel, Tour Guide'
    },
    {
      id: 2,
      voucherNo: 'VCH-2025-002',
      customerName: 'Sarah Johnson',
      issuedDate: '2025-10-20',
      services: 'Hotel Accommodation, Breakfast, Spa Services'
    },
    {
      id: 3,
      voucherNo: 'VCH-2025-003',
      customerName: 'Group Booking (15 pax)',
      issuedDate: '2025-10-21',
      services: 'Full Package - Transport, Hotel, Meals, Activities'
    }
  ];

  return (
    <div className="trip-vouchers">
      <div className="vouchers-header">
        <h3 className="section-title">Service Vouchers</h3>
        <button className="btn-primary">➕ Create Voucher</button>
      </div>

      <div className="vouchers-grid">
        {vouchers.map(voucher => (
          <div key={voucher.id} className="voucher-card">
            <div className="voucher-top">
              <span className="voucher-logo">🎫 CEYLONGATE</span>
              <span className="voucher-number">{voucher.voucherNo}</span>
            </div>

            <div className="voucher-content">
              <div className="voucher-field">
                <span className="field-label">Customer Name</span>
                <span className="field-value">{voucher.customerName}</span>
              </div>

              <div className="voucher-field">
                <span className="field-label">Issued Date</span>
                <span className="field-value">{voucher.issuedDate}</span>
              </div>

              <div className="voucher-field">
                <span className="field-label">Services Included</span>
                <span className="field-value">{voucher.services}</span>
              </div>
            </div>

            <div className="voucher-actions">
              <button className="btn-action">👁️ View</button>
              <button className="btn-action">📥 Download</button>
              <button className="btn-action">🖨️ Print</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripVouchers;
