import React, { useEffect, useMemo, useState } from 'react';
import '../../../TripsList/CreateTripForm.css';
import './CreateInvoice.modal.css';

const currencySymbols = { USD: '$', EUR: '€', LKR: 'Rs' };

const sampleBankAccounts = [
  {
    id: 'acc-1',
    accountName: 'CEYLON GATE TRAVELS (PVT) LTD',
    bankName: 'Commercial Bank Of Ceylon PLC',
    accountNumber: '5000179671',
    accountType: 'Foreign Currency Account USD',
    bankCode: '7056',
    branchCode: '74',
    branchName: 'Kochchikade',
    swift: 'CCEYLKLX',
    bankAddress: 'No 96-A, Chilaw Road, Kochchikade.'
  }
  ,{
    id: 'acc-2',
    accountName: 'CEYLON GATE TRAVELS - Savings',
    bankName: 'Hatton National Bank PLC',
    accountNumber: '1234567890',
    accountType: 'Savings Account LKR',
    bankCode: '7012',
    branchCode: '12',
    branchName: 'Colombo',
    swift: 'HNBKLK',
    bankAddress: 'No 479, Galle Road, Colombo'
  }
];

const sampleEmployees = [
  'Gayana Soisa',
  'Nayomika Fernando',
  'Admin User'
];

const defaultRowsForCountry = (country, currency) => {
  const suffix = country ? ` - ${country}` : '';
  return [
    { id: Date.now() + '-r1', description: `Per person sharing DBL/TWIN room in HB basis${suffix}`, unit: 1, rate: 0 },
    { id: Date.now() + '-r2', description: `Per person SGL room in HB basis${suffix}`, unit: 0, rate: 0 },
    { id: Date.now() + '-r3', description: `Entrance Fees to 1 pax - Tour Leader${suffix}`, unit: 1, rate: 0 },
    { id: Date.now() + '-r4', description: `HB to FB Supplement Per Person (${currencySymbols[currency] || ''}12 x 6 Days)${suffix}`, unit: 1, rate: 12 },
    { id: Date.now() + '-r5', description: `HB to FB Supplement Per Person (${currencySymbols[currency] || ''}18 x 2 Days)${suffix}`, unit: 1, rate: 18 }
  ];
};

const genInvoiceNo = () => {
  const year = new Date().getFullYear();
  const randNum = Math.floor(Math.random() * 90) + 10; // 10-99
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `CGTLK ${year}-${randNum}-${letter}`;
};

const CreateInvoiceModal = ({ tripData, onClose, onCreate }) => {
  const [agentName, setAgentName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const [invoiceNo] = useState(genInvoiceNo());
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [country, setCountry] = useState('Sri Lanka');
  const [clientCountry, setClientCountry] = useState('Italy');
  const [tourNo, setTourNo] = useState('');
  const [invoiceCurrency, setInvoiceCurrency] = useState('USD');

  const [clientName, setClientName] = useState('');
  const [travelFrom, setTravelFrom] = useState('');
  const [travelTo, setTravelTo] = useState('');

  const [rowsByCountry, setRowsByCountry] = useState(() => ({
    'Sri Lanka': defaultRowsForCountry('Sri Lanka', 'USD'),
    'Maldives': defaultRowsForCountry('Maldives', 'USD')
  }));
  const [activeTab, setActiveTab] = useState('Sri Lanka');

  const [tourLeaderDiscount, setTourLeaderDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const [paymentMode, setPaymentMode] = useState('Advance');
  const [selectedBank, setSelectedBank] = useState(sampleBankAccounts[0].id);

  const defaultPaymentTextFor = (mode) => (
    mode === 'Advance'
      ? '40% advance payment on confirmation, balance 45 days prior to travel.'
      : 'Full payment prior to 14 days of arrival date - Sri Lanka/Maldives.'
  );

  const [paymentText, setPaymentText] = useState(defaultPaymentTextFor(paymentMode));
  const [paymentTextEdited, setPaymentTextEdited] = useState(false);

  const [preparedBy, setPreparedBy] = useState(() => localStorage.getItem('currentUser') || sampleEmployees[0]);
  const [checkedBy, setCheckedBy] = useState(sampleEmployees[1]);

  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    // ensure rowsByCountry reflect currency changes or initial country selection
    setRowsByCountry(prev => ({
      'Sri Lanka': prev['Sri Lanka'] && prev['Sri Lanka'].length ? prev['Sri Lanka'] : defaultRowsForCountry('Sri Lanka', invoiceCurrency),
      'Maldives': prev['Maldives'] && prev['Maldives'].length ? prev['Maldives'] : defaultRowsForCountry('Maldives', invoiceCurrency)
    }));
    // set active tab depending on selected country
    if (country === 'Both') setActiveTab('Sri Lanka');
    else setActiveTab(country);
  }, [country, invoiceCurrency]);

  // Auto-fill Agent Details, Tour No, Client Country and Client Name from tripData when available
  useEffect(() => {
    if (!tripData) return;
    // Agent information might be under tripData.agent or direct fields
    setAgentName(prev => prev || tripData.agent?.name || tripData.agentName || '');
    setAddress(prev => prev || tripData.agent?.address || tripData.agentAddress || '');
    setEmail(prev => prev || tripData.agent?.email || tripData.agentEmail || '');
    setTelephone(prev => prev || tripData.agent?.telephone || tripData.agentTelephone || tripData.agent?.phone || '');

    // Tour number and client info
    setTourNo(prev => prev || tripData.tourNo || tripData.tour_number || tripData.tour || '');
    setClientCountry(prev => prev || tripData.clientCountry || tripData.client?.country || tripData.clientCountry || prev);
    setClientName(prev => prev || tripData.clientName || tripData.client?.name || tripData.clientName || prev);
  }, [tripData]);

  // update paymentText when paymentMode changes unless user has edited it
  useEffect(() => {
    if (!paymentTextEdited) {
      setPaymentText(defaultPaymentTextFor(paymentMode));
    }
  }, [paymentMode]);

  const currencySymbol = currencySymbols[invoiceCurrency] || '';

  const updateRow = (countryKey, id, field, value) => {
    setRowsByCountry(prev => ({
      ...prev,
      [countryKey]: prev[countryKey].map(r => r.id === id ? { ...r, [field]: field === 'description' ? value : Number(value) } : r)
    }));
  };

  const addRow = (countryKey) => {
    setRowsByCountry(prev => ({
      ...prev,
      [countryKey]: [...(prev[countryKey] || []), { id: Date.now() + '-r' + ((prev[countryKey] || []).length), description: '', unit: 1, rate: 0 }]
    }));
  };

  const removeRow = (countryKey, id) => {
    setRowsByCountry(prev => ({
      ...prev,
      [countryKey]: prev[countryKey].filter(r => r.id !== id)
    }));
  };

  const total = useMemo(() => {
    if (country === 'Both') {
      return Object.values(rowsByCountry).reduce((sum, arr) => sum + arr.reduce((s, r) => s + (Number(r.unit || 0) * Number(r.rate || 0)), 0), 0);
    }
    const arr = rowsByCountry[country] || [];
    return arr.reduce((s, r) => s + (Number(r.unit || 0) * Number(r.rate || 0)), 0);
  }, [rowsByCountry, country]);
  const totalWithDiscount = total - Number(tourLeaderDiscount || 0);
  const balance = totalWithDiscount - Number(amountPaid || 0);

  // paymentText is stateful and editable; default is based on payment mode

  const reimbursementText = () => {
    if (country === 'Sri Lanka') return 'Being cost of group round tour in Sri Lanka';
    if (country === 'Maldives') return 'Being cost of group round tour in Maldives';
    if (country === 'Both') return 'Being cost of group round tour in Sri Lanka and Maldives';
    return '';
  };

  const reimbursementTextFor = (cKey) => {
    if (cKey === 'Sri Lanka') return 'Being cost of group round tour in Sri Lanka';
    if (cKey === 'Maldives') return 'Being cost of group round tour in Maldives';
    return '';
  };

  const generateInvoiceObject = () => {
    const flattenedRows = country === 'Both'
      ? [...(rowsByCountry['Sri Lanka'] || []), ...(rowsByCountry['Maldives'] || [])]
      : (rowsByCountry[country] || []);

    return ({
    id: invoiceNo,
    status: 'Draft',
    total: `${currencySymbol}${total.toFixed(2)}`,
    created: invoiceDate,
    finalized: '-',
    versions: 1,
    versionHistory: [{ version: 1, date: invoiceDate, amount: `${currencySymbol}${total.toFixed(2)}`, changes: 'Invoice created' }],
    agent: { name: agentName, address, email, telephone },
    invoiceDetails: { invoiceNo, invoiceDate, country, clientCountry, tourNo, invoiceCurrency },
    reimbursement: { reimbursementText: reimbursementText(), clientName, travelFrom, travelTo },
    rows: flattenedRows,
    totals: { total, tourLeaderDiscount: Number(tourLeaderDiscount || 0), totalWithDiscount, amountPaid: Number(amountPaid || 0), balance },
    payment: { paymentMode, paymentText, bankId: selectedBank },
    prepared: preparedBy,
    checked: checkedBy,
    tripRef: tripData?.id || null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inv = generateInvoiceObject();
    onCreate && onCreate(inv);
  };

  const handleGeneratePDF = () => {
    setPreviewOpen(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Invoice</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <section className="form-section">
              <h3 className="section-title">Agent Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Agent Name</label>
                  <input value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="Fuada Tour" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="info@fuadatour.com" />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Via del Forte Tiburtino, 160-00159, Roma" />
                </div>
                <div className="form-group">
                  <label>Telephone</label>
                  <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="06/40501946" />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Invoice Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Invoice No</label>
                  <input value={invoiceNo} readOnly />
                </div>
                <div className="form-group">
                  <label>Invoice Date</label>
                  <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Client Country</label>
                  <select value={clientCountry} onChange={e => setClientCountry(e.target.value)}>
                    <option>Italy</option>
                    <option>Netherlands</option>
                    <option>England</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Spain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tour No</label>
                  <input value={tourNo} onChange={e => setTourNo(e.target.value)} placeholder="CGT 2024-34" />
                </div>
                <div className="form-group">
                  <label>Invoice Currency</label>
                  <select value={invoiceCurrency} onChange={e => setInvoiceCurrency(e.target.value)}>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>LKR</option>
                  </select>
                </div>
              </div>
            </section>

            <section className={`form-section ${paymentMode ? 'full-width' : ''}`}>
              <h3 className="section-title">Reimbursement & Tour Details</h3>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Reimbursement For</label>
                  <div className="country-checkboxes">
                    <label className="chk"><input type="checkbox" checked={country === 'Sri Lanka' || country === 'Both'} onChange={() => {
                      const currently = country === 'Both' ? new Set(['Sri Lanka','Maldives']) : new Set([country]);
                      if (currently.has('Sri Lanka')) {
                        if (currently.size === 1) return;
                        currently.delete('Sri Lanka');
                      } else {
                        currently.add('Sri Lanka');
                      }
                      const next = currently.size === 2 ? 'Both' : Array.from(currently)[0];
                      setCountry(next);
                    }} /> Sri Lanka</label>

                    <label className="chk"><input type="checkbox" checked={country === 'Maldives' || country === 'Both'} onChange={() => {
                      const currently = country === 'Both' ? new Set(['Sri Lanka','Maldives']) : new Set([country]);
                      if (currently.has('Maldives')) {
                        if (currently.size === 1) return;
                        currently.delete('Maldives');
                      } else {
                        currently.add('Maldives');
                      }
                      const next = currently.size === 2 ? 'Both' : Array.from(currently)[0];
                      setCountry(next);
                    }} /> Maldives</label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Client Name</label>
                  <input value={clientName} onChange={e => setClientName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Travel Period From</label>
                  <input type="date" value={travelFrom} onChange={e => setTravelFrom(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Travel Period To</label>
                  <input type="date" value={travelTo} onChange={e => setTravelTo(e.target.value)} />
                </div>
              </div>
            </section>

            <section className={`form-section ${paymentMode ? 'full-width' : ''}`}>
              <h3 className="section-title">Description & Amount</h3>
              <div className="desc-table">
              <div className="ci-tabs">
                <div className="tab-buttons">
                  {['Sri Lanka', 'Maldives'].map(cKey => {
                    const selected = (country === 'Both') ? true : (country === cKey);
                    const disabled = !selected;
                    return (
                      <button
                        key={cKey}
                        type="button"
                        className={`tab-btn ${activeTab === cKey ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                        onClick={() => {
                          if (disabled) return; // don't switch to unselected country
                          setActiveTab(cKey);
                        }}
                      >
                        {cKey}
                      </button>
                    );
                  })}
                </div>
              </div>

                {/* show reimbursement static text inside the Description & Amount area */}
                <div className="full">
                  {country === 'Both' ? (
                    <div className="static-text">{reimbursementTextFor(activeTab)}</div>
                  ) : (
                    <div className="static-text">{reimbursementText()}</div>
                  )}
                </div>

                <div className="desc-header">
                <div>Description</div>
                <div>Unit</div>
                <div>Rate ({currencySymbol})</div>
                <div>Amount ({currencySymbol})</div>
                <div></div>
              </div>
              {(rowsByCountry[activeTab] || []).map(r => (
                <div key={r.id} className="desc-row">
                  <textarea className="desc-desc" value={r.description} onChange={e => updateRow(activeTab, r.id, 'description', e.target.value)} />
                  <input className="desc-unit" type="number" value={r.unit} onChange={e => updateRow(activeTab, r.id, 'unit', e.target.value)} />
                  <input className="desc-rate" type="number" value={r.rate} onChange={e => updateRow(activeTab, r.id, 'rate', e.target.value)} />
                  <div className="desc-amount">{(Number(r.unit || 0) * Number(r.rate || 0)).toFixed(2)}</div>
                  <div className="desc-actions"><button type="button" className="btn-danger" onClick={() => removeRow(activeTab, r.id)}>Remove</button></div>
                </div>
              ))}
              <div className="desc-controls">
                <button type="button" className="btn-primary" onClick={() => addRow(activeTab)}>+ Add Row</button>
              </div>

              <div className="desc-footer">
                <div>Total:</div>
                <div>{currencySymbol}{total.toFixed(2)}</div>
              </div>
              <div className="desc-footer">
                <div>Tour Leader Discount:</div>
                <div><input type="number" value={tourLeaderDiscount} onChange={e => setTourLeaderDiscount(Number(e.target.value))} /></div>
              </div>
              <div className="desc-footer">
                <div>Total with Discount:</div>
                <div>{currencySymbol}{totalWithDiscount.toFixed(2)}</div>
              </div>
              <div className="desc-footer">
                <div>Amount Paid:</div>
                <div><input type="number" value={amountPaid} onChange={e => setAmountPaid(Number(e.target.value))} /></div>
              </div>
              <div className="desc-footer">
                <div>Balance:</div>
                <div>{currencySymbol}{balance.toFixed(2)}</div>
              </div>
            </div>
          </section>

            <section className="form-section">
              <h3 className="section-title">Payment Conditions</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Mode</label>
                  <select value={paymentMode} onChange={e => setPaymentMode(e.target.value === 'Advance' ? 'Advance' : 'Full')}>
                    <option value="Advance">Advance Payment</option>
                    <option value="Full">Full Payment</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Payment Text (editable)</label>
                  <textarea value={paymentText} onChange={e => { setPaymentText(e.target.value); setPaymentTextEdited(true); }} />
                </div>
                <div className="form-group full-width static-text">Additional bank charge of 3.25% of the total amount will be applied for online & card payments.</div>
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Bank Details</h3>
              <div className="bank-list">
                {sampleBankAccounts.map(acc => (
                  <label key={acc.id} className="bank-option">
                    <input type="radio" name="bank" checked={selectedBank === acc.id} onChange={() => setSelectedBank(acc.id)} />
                    <div>
                      <strong>{acc.accountName}</strong>
                      <div>{acc.bankName} • {acc.accountNumber}</div>
                      <div className="muted">{acc.accountType} • SWIFT: {acc.swift}</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Prepared & Checked By</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Prepared By</label>
                  <select value={preparedBy} onChange={e => setPreparedBy(e.target.value)}>
                    {sampleEmployees.map(emp => (<option key={emp}>{emp}</option>))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Checked By</label>
                  <select value={checkedBy} onChange={e => setCheckedBy(e.target.value)}>
                    {sampleEmployees.map(emp => (<option key={emp}>{emp}</option>))}
                  </select>
                </div>
              </div>
            </section>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setPreviewOpen(prev => !prev)}>{previewOpen ? 'Hide Preview' : 'Preview'}</button>
            <div style={{display:'flex',gap:12}}>
              <button type="button" className="btn-add-new" onClick={handleGeneratePDF}>Generate PDF</button>
              <button type="submit" className="btn-submit">Save Invoice</button>
            </div>
          </div>
        </form>

        {previewOpen && (
          <div className="ci-preview">
            <h3>Invoice Preview</h3>
            <div className="preview-block">
              <div><strong>{invoiceNo}</strong></div>
              <div>{invoiceDate} • {invoiceCurrency}</div>
              <div>To: {agentName}</div>
              <div>{address}</div>
              <div>Client Country: {clientCountry}</div>
              <div>Travel Countries: {country}</div>
              <hr />
              <div className="preview-rows">
                {country === 'Both' ? (
                  Object.entries(rowsByCountry).map(([cKey, arr]) => (
                    <div key={cKey} className="preview-section">
                      <h4>{cKey}</h4>
                      {arr.map(r => (
                        <div key={r.id} className="preview-row">
                          <div className="preview-desc">{r.description}</div>
                          <div className="preview-amt">{currencySymbol}{(Number(r.unit || 0) * Number(r.rate || 0)).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  (rowsByCountry[country] || []).map(r => (
                    <div key={r.id} className="preview-row">
                      <div className="preview-desc">{r.description}</div>
                      <div className="preview-amt">{currencySymbol}{(Number(r.unit || 0) * Number(r.rate || 0)).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="preview-total">Total: {currencySymbol}{total.toFixed(2)}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateInvoiceModal;
