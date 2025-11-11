import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './ServiceVoucher.page.css';

const defaultData = {
  clientName: 'Guest Client',
  tourName: 'Sample Tour',
  tourNumber: 'T-000',
  startDate: '2025-08-25',
  endDate: '2025-08-27',
  hotelsConfirmed: 'Not Confirmed',
  arrivalDate: '2025-08-25T10:00',
  departureDate: '2025-08-27T12:00'
};

function daysBetween(a, b) {
  try {
    const d1 = new Date(a);
    const d2 = new Date(b);
    // round to nearest day
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  } catch (e) {
    return 0;
  }
}

const ServiceVoucher = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  // prefer tripData passed through state, otherwise fall back
  const tripState = location.state && location.state.tripData ? location.state.tripData : null;

  const initial = {
    clientName: tripState?.name || defaultData.clientName,
    tourName: tripState?.name || defaultData.tourName,
    tourNumber: tripState?.id ? `T-${tripState.id}` : defaultData.tourNumber,
    startDate: tripState?.startDate || defaultData.startDate,
    endDate: tripState?.endDate || defaultData.endDate,
    hotelsConfirmed: tripState?.hotels || defaultData.hotelsConfirmed,
    arrivalDate: tripState?.arrivalDate || defaultData.arrivalDate,
    departureDate: tripState?.departureDate || defaultData.departureDate
  };

  const [meta, setMeta] = useState(initial);

  const [hotelsOptions, setHotelsOptions] = useState([
    'Radisson Hotel',
    'Ceylon Grand',
    'Ocean View Resort'
  ]);

  const [roomsOptions, setRoomsOptions] = useState([
    'Standard Room',
    'Deluxe Room',
    'Suite'
  ]);

  const [rows, setRows] = useState([
    {
      id: 1,
      startDate: initial.startDate,
      endDate: initial.endDate,
      nights: daysBetween(initial.startDate, initial.endDate),
      hotelName: 'Radisson Hotel',
      roomType: 'Deluxe Room'
    }
  ]);

  useEffect(() => {
    // if tripState updates later, sync a bit
    if (tripState) {
      setMeta(prev => ({ ...prev, ...{
        clientName: tripState.name || prev.clientName,
        tourName: tripState.name || prev.tourName,
        tourNumber: tripState.id ? `T-${tripState.id}` : prev.tourNumber,
        startDate: tripState.startDate || prev.startDate,
        endDate: tripState.endDate || prev.endDate,
        hotelsConfirmed: tripState.hotels || prev.hotelsConfirmed,
        arrivalDate: tripState.arrivalDate || prev.arrivalDate,
        departureDate: tripState.departureDate || prev.departureDate
      }}));
    }
  }, [location.state]);

  const updateRow = (id, field, value) => {
    setRows(r => r.map(row => {
      if (row.id !== id) return row;
      const next = { ...row, [field]: value };
      if (field === 'startDate' || field === 'endDate') {
        next.nights = daysBetween(next.startDate, next.endDate);
      }
      return next;
    }));
  };

  const addHotelOption = (prefill) => {
    const name = prefill || window.prompt('Enter new hotel name');
    if (name && !hotelsOptions.includes(name)) {
      setHotelsOptions(h => [...h, name]);
      return name;
    }
    return null;
  };

  const removeHotelOption = (name) => {
    if (!name) return;
    if (!hotelsOptions.includes(name)) return;
    if (!window.confirm(`Remove hotel "${name}" from the dropdown? This will clear any rows using it.`)) return;
    setHotelsOptions(h => h.filter(x => x !== name));
    setRows(r => r.map(row => row.hotelName === name ? { ...row, hotelName: '' } : row));
  };

  const addRoomOption = (prefill) => {
    const name = prefill || window.prompt('Enter new room type');
    if (name && !roomsOptions.includes(name)) {
      setRoomsOptions(r => [...r, name]);
      return name;
    }
    return null;
  };

  const removeRoomOption = (name) => {
    if (!name) return;
    if (!roomsOptions.includes(name)) return;
    if (!window.confirm(`Remove room type "${name}" from the dropdown? This will clear any rows using it.`)) return;
    setRoomsOptions(r => r.filter(x => x !== name));
    setRows(r => r.map(row => row.roomType === name ? { ...row, roomType: '' } : row));
  };

  const addRow = () => {
    setRows(r => {
      const nextId = r.length ? Math.max(...r.map(x => x.id)) + 1 : 1;
      return [...r, {
        id: nextId,
        startDate: meta.startDate,
        endDate: meta.endDate,
        nights: daysBetween(meta.startDate, meta.endDate),
        hotelName: '',
        roomType: 'Standard Room'
      }];
    });
  };

  // Meal basis editable list
  const [mealOptions, setMealOptions] = useState([
    'FB Basis During the round Tour in sri lanka',
    'HB Basis During the Beach Stay'
  ]);
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0]);

  const addMealOption = (prefill) => {
    const name = prefill || window.prompt('Enter new meal basis text');
    if (name && !mealOptions.includes(name)) {
      setMealOptions(m => [...m, name]);
      setSelectedMeal(name);
      return name;
    }
    return null;
  };

  const removeMealOption = (name) => {
    if (!name) return;
    if (!mealOptions.includes(name)) return;
    if (!window.confirm(`Remove meal basis "${name}" from the dropdown?`)) return;
    setMealOptions(m => m.filter(x => x !== name));
    if (selectedMeal === name) setSelectedMeal(mealOptions[0] || '');
  };

  // Entrance fees - multi select
  const [entranceOptions, setEntranceOptions] = useState([
    'Sigiriya Rock',
    'Temple of the Tooth',
    'Galle Fort'
  ]);
  const [selectedEntrances, setSelectedEntrances] = useState([entranceOptions[0]]);

  const addEntranceOption = (prefill) => {
    const name = prefill || window.prompt('Enter new entrance/place name');
    if (name && !entranceOptions.includes(name)) {
      setEntranceOptions(e => [...e, name]);
      setSelectedEntrances(s => [...s, name]);
      return name;
    }
    return null;
  };

  const removeEntranceOption = (name) => {
    if (!name) return;
    if (!entranceOptions.includes(name)) return;
    if (!window.confirm(`Remove place "${name}" from the list?`)) return;
    setEntranceOptions(e => e.filter(x => x !== name));
    setSelectedEntrances(s => s.filter(x => x !== name));
  };

  // Transport and Guide types
  const [transportOptions, setTransportOptions] = useState([
    'Air conditioned car Durating the tour in sri lanka'
  ]);
  const [selectedTransport, setSelectedTransport] = useState(transportOptions[0]);

  const addTransportOption = (prefill) => {
    const name = prefill || window.prompt('Enter new transport mode');
    if (name && !transportOptions.includes(name)) {
      setTransportOptions(t => [...t, name]);
      setSelectedTransport(name);
      return name;
    }
    return null;
  };

  const removeTransportOption = (name) => {
    if (!name) return;
    if (!transportOptions.includes(name)) return;
    if (!window.confirm(`Remove transport mode "${name}" from the list?`)) return;
    setTransportOptions(t => t.filter(x => x !== name));
    if (selectedTransport === name) setSelectedTransport(transportOptions[0] || '');
  };

  const [guideOptions, setGuideOptions] = useState([
    'Italian Speaking Driver Guide'
  ]);
  const [selectedGuide, setSelectedGuide] = useState(guideOptions[0]);

  const addGuideOption = (prefill) => {
    const name = prefill || window.prompt('Enter new guide/driver type');
    if (name && !guideOptions.includes(name)) {
      setGuideOptions(g => [...g, name]);
      setSelectedGuide(name);
      return name;
    }
    return null;
  };

  const removeGuideOption = (name) => {
    if (!name) return;
    if (!guideOptions.includes(name)) return;
    if (!window.confirm(`Remove guide type "${name}" from the list?`)) return;
    setGuideOptions(g => g.filter(x => x !== name));
    if (selectedGuide === name) setSelectedGuide(guideOptions[0] || '');
  };

  // Emergency contacts (objects)
  const [contactsOptions, setContactsOptions] = useState([
    { name: 'Mr Suranga Porutota', phone: '+94 77 777 0577' },
    { name: 'Mr Anjula Fonseka', phone: '+94 77 770 8936' },
    { name: 'Mr Ravidu Porutota', phone: '+94 76 777 0577' },
    { name: 'Office General', phone: '+94 71 227 7770' }
  ]);
  const [selectedContacts, setSelectedContacts] = useState([...contactsOptions]);

  const addContactOption = () => {
    const name = window.prompt('Contact name (e.g. Mr John Doe)');
    if (!name) return null;
    const phone = window.prompt('Phone number (e.g. +94 77 123 4567)');
    if (!phone) return null;
    const item = { name, phone };
    setContactsOptions(c => [...c, item]);
    setSelectedContacts(s => [...s, item]);
    return item;
  };

  const removeContactOption = (item) => {
    if (!item) return;
    if (!window.confirm(`Remove contact ${item.name} (${item.phone}) from the list?`)) return;
    setContactsOptions(c => c.filter(x => !(x.name === item.name && x.phone === item.phone)));
    setSelectedContacts(s => s.filter(x => !(x.name === item.name && x.phone === item.phone)));
  };

  return (
    <div className="sv-page">
      <div className="sv-header">
        <button className="sv-btn sv-btn-ghost" onClick={() => navigate('/trips/2')}>← Back</button>
        <h2 className="sv-title">Service Voucher</h2>
      </div>

      <div className="sv-form-grid">
        <section className="sv-section">
          <h3 className="sv-section-title">Tour Information</h3>
          <div className="sv-info-grid">
            <div className="sv-info-item"><span className="sv-label">Client:</span> <span className="sv-value">{meta.clientName}</span></div>
            <div className="sv-info-item"><span className="sv-label">Tour Name:</span> <span className="sv-value">{meta.tourName}</span></div>
            <div className="sv-info-item"><span className="sv-label">Tour No:</span> <span className="sv-value">{meta.tourNumber}</span></div>
            <div className="sv-info-item"><span className="sv-label">Tour Dates:</span> <span className="sv-value">{meta.startDate} — {meta.endDate}</span></div>
            <div className="sv-info-item"><span className="sv-label">Hotels Confirmed:</span> <span className="sv-value">{meta.hotelsConfirmed}</span></div>
            <div className="sv-info-item"><span className="sv-label">Arrival:</span> <span className="sv-value">{meta.arrivalDate}</span></div>
            <div className="sv-info-item"><span className="sv-label">Departure:</span> <span className="sv-value">{meta.departureDate}</span></div>
          </div>
        </section>

        <section className="sv-section">
          <h3 className="sv-section-title">Accommodation</h3>
          <table className="sv-table">
            <thead>
              <tr>
                <th>Date Range</th>
                <th>Nights</th>
                <th>Hotel & Room</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>
                    <div className="sv-date-range">
                      <div className="sv-range-display">{row.startDate} - {row.endDate}</div>
                      <div className="sv-date-inputs">
                        <input className="sv-input" type="date" value={row.startDate} onChange={e => updateRow(row.id, 'startDate', e.target.value)} />
                        <span className="sv-sep">→</span>
                        <input className="sv-input" type="date" value={row.endDate} onChange={e => updateRow(row.id, 'endDate', e.target.value)} />
                        <button className="sv-calendar-btn" title="Edit dates">📅</button>
                      </div>
                    </div>
                  </td>
                  <td className="sv-nights">{row.nights > 0 ? `${row.nights}N` : '0N'}</td>
                  <td>
                    <div className="sv-hotel-room">
                      <div className="sv-select-row">
                        <select className="sv-input" value={row.hotelName} onChange={e => {
                          if (e.target.value === '__add__') {
                            const added = addHotelOption();
                            if (added) updateRow(row.id, 'hotelName', added);
                          } else {
                            updateRow(row.id, 'hotelName', e.target.value);
                          }
                        }}>
                          <option value="">-- Select hotel --</option>
                          {hotelsOptions.map(h => <option key={h} value={h}>{h}</option>)}
                          <option value="__add__">+ Add new...</option>
                        </select>
                        <div className="sv-select-actions">
                          <button
                            className="sv-btn sv-btn-secondary"
                            title="Add hotel"
                            onClick={() => {
                              const added = addHotelOption();
                              if (added) updateRow(row.id, 'hotelName', added);
                            }}
                          >＋</button>
                          <button
                            className="sv-btn sv-btn-danger"
                            title="Remove selected hotel"
                            onClick={() => removeHotelOption(row.hotelName)}
                          >🗑</button>
                        </div>
                      </div>

                      <div className="sv-select-row">
                        <select className="sv-input" value={row.roomType} onChange={e => {
                          if (e.target.value === '__add_room__') {
                            const added = addRoomOption();
                            if (added) updateRow(row.id, 'roomType', added);
                          } else {
                            updateRow(row.id, 'roomType', e.target.value);
                          }
                        }}>
                          <option value="">-- Select room --</option>
                          {roomsOptions.map(rm => <option key={rm} value={rm}>{rm}</option>)}
                          <option value="__add_room__">+ Add new...</option>
                        </select>
                        <div className="sv-select-actions">
                          <button
                            className="sv-btn sv-btn-secondary"
                            title="Add room type"
                            onClick={() => {
                              const added = addRoomOption();
                              if (added) updateRow(row.id, 'roomType', added);
                            }}
                          >＋</button>
                          <button
                            className="sv-btn sv-btn-danger"
                            title="Remove selected room type"
                            onClick={() => removeRoomOption(row.roomType)}
                          >🗑</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sv-table-actions">
            <button className="sv-btn sv-btn-add" onClick={addRow}>➕ Add row</button>
          </div>
        </section>
      
        {/* Additional details sections */}
        <section className="sv-section">
          <h3 className="sv-section-title">Meal Basis</h3>
          <div className="sv-row">
            <select className="sv-input" value={selectedMeal} onChange={e => setSelectedMeal(e.target.value)}>
              <option value="">-- Select meal basis --</option>
              {mealOptions.map(m => <option key={m} value={m}>{m}</option>)}
              <option value="__add_meal__">+ Add new...</option>
            </select>
            <div className="sv-select-actions">
              <button className="sv-btn sv-btn-secondary" onClick={() => addMealOption()}>＋</button>
              <button className="sv-btn sv-btn-danger" onClick={() => removeMealOption(selectedMeal)}>🗑</button>
            </div>
          </div>
        </section>

        <section className="sv-section">
          <h3 className="sv-section-title">Entrance fees</h3>
          <div className="sv-row entrance-list">
            <div className="sv-selected-chips">
              {selectedEntrances.map(e => (
                <span key={e} className="sv-chip">{e} <button className="sv-chip-remove" onClick={() => setSelectedEntrances(s => s.filter(x => x !== e))}>×</button></span>
              ))}
              <span className="sv-chip default">— pay by Ceylon Gate Travels</span>
            </div>

            <div className="sv-entrance-controls">
              <select className="sv-input" onChange={e => {
                if (!e.target.value) return;
                if (e.target.value === '__add_entrance__') { addEntranceOption(); return; }
                setSelectedEntrances(s => Array.from(new Set([...s, e.target.value])));
              }}>
                <option value="">-- Add place --</option>
                {entranceOptions.map(p => <option key={p} value={p}>{p}</option>)}
                <option value="__add_entrance__">+ Add new...</option>
              </select>
              <div className="sv-select-actions">
                <button className="sv-btn sv-btn-secondary" onClick={() => addEntranceOption()}>＋</button>
                <button className="sv-btn sv-btn-danger" onClick={() => {
                  const last = selectedEntrances[selectedEntrances.length - 1];
                  if (last) removeEntranceOption(last);
                }}>🗑</button>
              </div>
            </div>
          </div>
        </section>

        <section className="sv-section">
          <h3 className="sv-section-title">Mode of Transport</h3>
          <div className="sv-row">
            <select className="sv-input" value={selectedTransport} onChange={e => setSelectedTransport(e.target.value)}>
              <option value="">-- Select transport --</option>
              {transportOptions.map(t => <option key={t} value={t}>{t}</option>)}
              <option value="__add_transport__">+ Add new...</option>
            </select>
            <div className="sv-select-actions">
              <button className="sv-btn sv-btn-secondary" onClick={() => addTransportOption()}>＋</button>
              <button className="sv-btn sv-btn-danger" onClick={() => removeTransportOption(selectedTransport)}>🗑</button>
            </div>
          </div>
        </section>

        <section className="sv-section">
          <h3 className="sv-section-title">Driver / Guide type</h3>
          <div className="sv-row">
            <select className="sv-input" value={selectedGuide} onChange={e => setSelectedGuide(e.target.value)}>
              <option value="">-- Select guide type --</option>
              {guideOptions.map(g => <option key={g} value={g}>{g}</option>)}
              <option value="__add_guide__">+ Add new...</option>
            </select>
            <div className="sv-select-actions">
              <button className="sv-btn sv-btn-secondary" onClick={() => addGuideOption()}>＋</button>
              <button className="sv-btn sv-btn-danger" onClick={() => removeGuideOption(selectedGuide)}>🗑</button>
            </div>
          </div>
        </section>

        <section className="sv-section">
          <h3 className="sv-section-title">Emergency Contact</h3>
          <div className="sv-row contacts-list">
            <div className="sv-contacts-col">
              {selectedContacts.map((c, idx) => (
                <div key={`${c.name}-${c.phone}-${idx}`} className="sv-contact-item">
                  <div className="sv-contact-text">{c.phone} ({c.name})</div>
                  <div className="sv-contact-actions">
                    <button className="sv-btn sv-btn-secondary" onClick={() => {
                      const editedName = window.prompt('Edit name', c.name);
                      if (!editedName) return;
                      const editedPhone = window.prompt('Edit phone', c.phone);
                      if (!editedPhone) return;
                      const newItem = { name: editedName, phone: editedPhone };
                      setContactsOptions(arr => arr.map(x => (x.name === c.name && x.phone === c.phone) ? newItem : x));
                      setSelectedContacts(arr => arr.map(x => (x.name === c.name && x.phone === c.phone) ? newItem : x));
                    }}>✎</button>
                    <button className="sv-btn sv-btn-danger" onClick={() => removeContactOption(c)}>🗑</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="sv-contacts-controls">
              <select className="sv-input" onChange={e => {
                if (!e.target.value) return;
                if (e.target.value === '__add_contact__') { addContactOption(); return; }
                const found = contactsOptions.find(x => `${x.name}__${x.phone}` === e.target.value);
                if (found) setSelectedContacts(s => Array.from(new Set([...s, found])));
              }}>
                <option value="">-- Add contact --</option>
                {contactsOptions.map(c => <option key={`${c.name}__${c.phone}`} value={`${c.name}__${c.phone}`}>{c.name} ({c.phone})</option>)}
                <option value="__add_contact__">+ Add new...</option>
              </select>
              <div className="sv-select-actions">
                <button className="sv-btn sv-btn-secondary" onClick={() => addContactOption()}>＋</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceVoucher;
