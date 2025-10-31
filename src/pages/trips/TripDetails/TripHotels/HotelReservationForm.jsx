import React, { useState, useEffect } from 'react';
import './HotelReservationForm.css';

const HotelReservationForm = ({ trip, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    // Hotel Info
    hotelName: '',
    hotelAddress: '',
    
    // Document Info
    requisitionNo: '',
    tourNo: '',
    
    // Guest Info
    guestName: '',
    noPax: '',
    
    // Stay Info
    checkInDate: '',
    checkOutDate: '',
    noOfNights: 0,
    
    // Basis & Wing
    basis: 'HB',
    wingType: 'Standard',
    
    // Room Allocation
    rooms: {
      SGL: 0,
      DBL: 0,
      Twin: 0,
      TPL: 0,
      Family: 0,
      Guide: 0
    },
    
    // Payment & Confirm
    paymentTerm: 'Payment by Ceylon Gate Travels without extras',
    confirmBy: 'Admin User', // TODO: Replace with actual logged-in user from auth context
    rateApplicable: 0
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [hotelSearchTerm, setHotelSearchTerm] = useState('');
  
  const isEditMode = initialData !== null;

  // Hotel list (can be fetched from API)
  const hotelList = [
    {
      name: 'Granbell Hotel',
      address: '282/5 Kollupitiya Road, Marine Drive, Colombo 3, Sri Lanka'
    },
    {
      name: 'Cinnamon Grand',
      address: '77 Galle Road, Colombo 3, Sri Lanka'
    },
    {
      name: 'Hilton Colombo',
      address: '2 Sir Chittampalam A Gardiner Mawatha, Colombo 2, Sri Lanka'
    }
  ];

  const basisOptions = ['HB', 'RO', 'BB', 'FB'];
  const wingOptions = ['Standard', 'Superior'];

  // Filter hotels based on search
  const filteredHotels = hotelList.filter(hotel => 
    hotel.name.toLowerCase().includes(hotelSearchTerm.toLowerCase()) ||
    hotel.address.toLowerCase().includes(hotelSearchTerm.toLowerCase())
  );

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      // When editing, populate all fields from the reservation being edited
      setFormData({
        hotelName: initialData.name || initialData.hotelName || '',
        hotelAddress: initialData.address || initialData.hotelAddress || '',
        requisitionNo: initialData.requisitionNo || '',
        tourNo: initialData.tourNo || '',
        guestName: initialData.guestName || '',
        noPax: initialData.noPax || '',
        checkInDate: initialData.checkIn || initialData.checkInDate || '',
        checkOutDate: initialData.checkOut || initialData.checkOutDate || '',
        noOfNights: initialData.nights || initialData.noOfNights || 0,
        basis: initialData.basis || 'HB',
        wingType: initialData.wing || initialData.wingType || 'Standard',
        rooms: initialData.rooms || {
          SGL: 0,
          DBL: 0,
          Twin: 0,
          TPL: 0,
          Family: 0,
          Guide: 0
        },
        paymentTerm: initialData.paymentTerm || 'Payment by Ceylon Gate Travels without extras',
        confirmBy: initialData.confirmBy || 'Admin User',
        rateApplicable: initialData.rate || initialData.rateApplicable || 0
      });
    } else {
      // Generate requisition number for new reservation
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const requisitionNo = `CGT ${year}-${month}-D`;
      
      setFormData(prev => ({
        ...prev,
        requisitionNo,
        tourNo: trip?.tripNo || trip?.id || 'N/A',
        guestName: trip?.passengers?.[0]?.name || '',
        noPax: `${trip?.passengers?.length || 0} Adults`
      }));
    }
  }, [initialData, trip]);

  // Calculate nights when dates change
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setFormData(prev => ({
        ...prev,
        noOfNights: diffDays
      }));
      
      // Calculate rate based on rooms and nights
      calculateRate(diffDays);
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.rooms, formData.basis]);

  const calculateRate = (nights) => {
    // Base rates per room type per night (example rates)
    const baseRates = {
      SGL: 100,
      DBL: 150,
      Twin: 150,
      TPL: 200,
      Family: 250,
      Guide: 80
    };

    // Basis multipliers
    const basisMultiplier = {
      RO: 1.0,
      BB: 1.2,
      HB: 1.4,
      FB: 1.6
    };

    let totalRate = 0;
    Object.keys(formData.rooms).forEach(roomType => {
      const count = formData.rooms[roomType];
      totalRate += count * baseRates[roomType] * nights * basisMultiplier[formData.basis];
    });

    setFormData(prev => ({
      ...prev,
      rateApplicable: totalRate.toFixed(2)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHotelSelect = (e) => {
    const hotelName = e.target.value;
    const hotel = hotelList.find(h => h.name === hotelName);
    if (hotel) {
      setFormData(prev => ({
        ...prev,
        hotelName: hotel.name,
        hotelAddress: hotel.address
      }));
      setSelectedHotel(hotel);
    }
  };

  const handleAddNewHotel = () => {
    const newHotel = {
      name: formData.hotelName,
      address: formData.hotelAddress
    };
    setSelectedHotel(newHotel);
    setShowAddHotel(false);
  };

  const handleRoomChange = (roomType, value) => {
    const numValue = Math.max(0, Math.min(10, parseInt(value) || 0));
    setFormData(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: numValue
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    window.print();
  };

  const getRoomBreakdownText = () => {
    return Object.entries(formData.rooms)
      .map(([type, count]) => `${type}:${count}`)
      .join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  if (showPreview) {
    return (
      <div className="hotel-reservation-modal">
        <div className="reservation-preview-container">
          <div className="preview-header">
            <h2>Hotel Reservation Order Preview</h2>
            <button className="btn-close-preview" onClick={() => setShowPreview(false)}>
              <span className="close-icon"></span>
            </button>
          </div>

          <div className="reservation-document" id="reservation-document">
            <div className="document-header">
              <h1>HOTEL RESERVATION ORDER</h1>
            </div>

            <div className="document-body">
              <div className="hotel-info-block">
                <strong>To:</strong> {formData.hotelName}, {formData.hotelAddress}
              </div>

              <div className="reservation-details">
                <div className="detail-row">
                  <span className="detail-label">Requisition No:</span>
                  <span className="detail-value">{formData.requisitionNo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tour No:</span>
                  <span className="detail-value">{formData.tourNo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guest Name:</span>
                  <span className="detail-value">{formData.guestName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">No. Pax:</span>
                  <span className="detail-value">{formData.noPax}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(formData.checkInDate)}</span>
                </div>
              </div>

              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Nights</th>
                    <th>Basis</th>
                    <th>Wing</th>
                    <th>Room Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatDate(formData.checkInDate)}</td>
                    <td>{formatDate(formData.checkOutDate)}</td>
                    <td>{formData.noOfNights}</td>
                    <td>{formData.basis}</td>
                    <td>{formData.wingType}</td>
                    <td>{getRoomBreakdownText()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="reservation-footer">
                <div className="footer-row">
                  <span className="footer-label">Payment Term:</span>
                  <span className="footer-value">{formData.paymentTerm}</span>
                </div>
                <div className="footer-row">
                  <span className="footer-label">Confirm By:</span>
                  <span className="footer-value">{formData.confirmBy}</span>
                </div>
                <div className="footer-row">
                  <span className="footer-label">Rate Applicable:</span>
                  <span className="footer-value">${formData.rateApplicable}</span>
                </div>
              </div>

              <div className="signature-section">
                <div className="signature-box">
                  <div className="signature-line"></div>
                  <p>Authorized Signature</p>
                </div>
                <div className="signature-box">
                  <div className="signature-line"></div>
                  <p>Hotel Confirmation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="preview-actions">
            <button className="btn-preview-action btn-save" onClick={handleSave}>
              <span className="icon"></span> Save Document
            </button>
            <button className="btn-preview-action btn-download" onClick={handleDownloadPDF}>
              <span className="icon"></span> Download PDF
            </button>
            <button className="btn-preview-action btn-cancel" onClick={() => setShowPreview(false)}>
              <span className="icon"></span> Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Hotel Reservation' : 'Create Hotel Reservation Order'}</h2>
          <button className="btn-close" onClick={onClose}>
            <span className="close-icon">✕</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-grid">
            {/* Left Column: Trip & Guest Details */}
            <div className="form-column">
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon"></span> Hotel Information
                </h3>
                
                <div className="form-group">
                  <label>Hotel Name</label>
                  <select 
                    value={formData.hotelName}
                    onChange={handleHotelSelect}
                    required
                  >
                    <option value="">Select Hotel</option>
                    {hotelList.map(hotel => (
                      <option key={hotel.name} value={hotel.name}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Hotel Address</label>
                  <textarea
                    name="hotelAddress"
                    value={formData.hotelAddress}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon"></span> Document Information
                </h3>
                
                <div className="form-group">
                  <label>Requisition No</label>
                  <input
                    type="text"
                    name="requisitionNo"
                    value={formData.requisitionNo}
                    readOnly
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Tour No</label>
                  <input
                    type="text"
                    name="tourNo"
                    value={formData.tourNo}
                    readOnly
                    className="readonly-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Guest Information</h3>
                
                <div className="form-group">
                  <label>Guest Name</label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    placeholder="e.g. FIORELLA PESENTI x2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>No. Pax</label>
                  <input
                    type="text"
                    name="noPax"
                    value={formData.noPax}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 Adults"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Stay & Rooms */}
            <div className="form-column">
              <div className="form-section">
                <h3 className="section-title">Stay Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Check-out Date</label>
                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>No. of Nights</label>
                  <input
                    type="text"
                    value={formData.noOfNights}
                    readOnly
                    className="readonly-input calculated-field"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Basis & Wing</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Basis</label>
                    <select
                      name="basis"
                      value={formData.basis}
                      onChange={handleInputChange}
                      required
                    >
                      {basisOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Wing Type</label>
                    <select
                      name="wingType"
                      value={formData.wingType}
                      onChange={handleInputChange}
                      required
                    >
                      {wingOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Room Allocation</h3>
                
                <div className="room-allocation-grid">
                  {Object.keys(formData.rooms).map(roomType => (
                    <div key={roomType} className="room-input-row">
                      <label>{roomType}</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.rooms[roomType]}
                        onChange={(e) => handleRoomChange(roomType, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Payment & Rate</h3>
                
                <div className="form-group">
                  <label>Rate Applicable</label>
                  <div className="duration-display">
                    <span className="duration-badge">${formData.rateApplicable}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirmed By</label>
                  <input
                    type="text"
                    value={formData.confirmBy}
                    readOnly
                    className="readonly-input"
                    style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                  <small style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Auto-populated from logged-in user
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <span className="icon-check"></span>
              Generate Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelReservationForm;
