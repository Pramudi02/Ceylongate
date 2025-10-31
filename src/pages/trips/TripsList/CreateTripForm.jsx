import React, { useState, useEffect, useRef } from 'react';
import './CreateTripForm.css';

const CreateTripForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tourNo: '',
    name: '',
    countryOfClient: '',
    agentName: '',
    agentContact: '',
    guideName: '',
    guideContact: '',
    guideLicense: '',
    startDate: '',
    endDate: '',
    numberOfClients: '',
    tourType: 'Cultural',
    status: 'Upcoming',
    notes: ''
  });

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [currentDestination, setCurrentDestination] = useState('');
  
  // Agent and Guide selection states
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [showAddGuide, setShowAddGuide] = useState(false);
  const [agentSearchTerm, setAgentSearchTerm] = useState('');
  const [guideSearchTerm, setGuideSearchTerm] = useState('');
  
  // Rich text editor ref
  const notesEditorRef = useRef(null);

  // Available destinations in Sri Lanka
  const availableDestinations = [
    'Colombo', 'Kandy', 'Sigiriya', 'Ella', 'Galle', 'Nuwara Eliya',
    'Bentota', 'Mirissa', 'Unawatuna', 'Yala', 'Udawalawe', 'Minneriya',
    'Wilpattu', 'Dambulla', 'Polonnaruwa', 'Anuradhapura', 'Trincomalee',
    'Arugam Bay', 'Jaffna', 'Negombo', 'Hikkaduwa', 'Horton Plains',
    'Adams Peak', 'Knuckles Range'
  ];

  // Sample database of agents (this would come from your actual database)
  const availableAgents = [
    { id: 1, name: 'Rome Travel Agency', contact: '+39 06 1234567', country: 'Italy' },
    { id: 2, name: 'Paris Luxury Tours', contact: '+33 1 4567890', country: 'France' },
    { id: 3, name: 'Berlin Adventure Tours', contact: '+49 30 987654', country: 'Germany' },
    { id: 4, name: 'London Historic Tours', contact: '+44 20 7123456', country: 'United Kingdom' },
    { id: 5, name: 'Sydney Asia Tours', contact: '+61 2 9876543', country: 'Australia' },
    { id: 6, name: 'New York Adventure Co', contact: '+1 212 5551234', country: 'United States' },
    { id: 7, name: 'Tokyo Travel Partners', contact: '+81 3 1234567', country: 'Japan' },
    { id: 8, name: 'Dubai Luxury Travels', contact: '+971 4 1234567', country: 'UAE' }
  ];

  // Sample database of tour guides (this would come from your actual database)
  const availableGuides = [
    { id: 1, name: 'Kamal Silva', contact: '+94 77 123 4567', license: 'TG-2023-001' },
    { id: 2, name: 'Nimal Perera', contact: '+94 77 234 5678', license: 'TG-2023-012' },
    { id: 3, name: 'Sunil Fernando', contact: '+94 77 345 6789', license: 'TG-2023-025' },
    { id: 4, name: 'Chaminda Rathnayake', contact: '+94 77 456 7890', license: 'TG-2023-038' },
    { id: 5, name: 'Pradeep Jayawardena', contact: '+94 77 567 8901', license: 'TG-2023-041' },
    { id: 6, name: 'Rohitha Dissanayake', contact: '+94 77 678 9012', license: 'TG-2023-055' }
  ];

  // Filter agents based on search
  const filteredAgents = availableAgents.filter(agent => 
    agent.name.toLowerCase().includes(agentSearchTerm.toLowerCase()) ||
    agent.contact.includes(agentSearchTerm) ||
    agent.country.toLowerCase().includes(agentSearchTerm.toLowerCase())
  );

  // Filter guides based on search
  const filteredGuides = availableGuides.filter(guide => 
    guide.name.toLowerCase().includes(guideSearchTerm.toLowerCase()) ||
    guide.contact.includes(guideSearchTerm) ||
    guide.license.toLowerCase().includes(guideSearchTerm.toLowerCase())
  );

  // Auto-calculate days and nights when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Days = difference + 1 (inclusive), Nights = difference
      setFormData(prev => ({
        ...prev,
        days: diffDays + 1,
        nights: diffDays
      }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addDestination = () => {
    if (currentDestination && !selectedDestinations.includes(currentDestination)) {
      setSelectedDestinations(prev => [...prev, currentDestination]);
      setCurrentDestination('');
    }
  };

  const removeDestination = (destination) => {
    setSelectedDestinations(prev => prev.filter(d => d !== destination));
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setFormData(prev => ({
      ...prev,
      agentName: agent.name,
      agentContact: agent.contact
    }));
    setAgentSearchTerm('');
  };

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
    setFormData(prev => ({
      ...prev,
      guideName: guide.name,
      guideContact: guide.contact,
      guideLicense: guide.license
    }));
    setGuideSearchTerm('');
  };

  const handleAddNewAgent = () => {
    // Here you would typically save the new agent to the database
    const newAgent = {
      id: Date.now(),
      name: formData.agentName,
      contact: formData.agentContact,
      country: formData.countryOfClient
    };
    setSelectedAgent(newAgent);
    setShowAddAgent(false);
  };

  const handleAddNewGuide = () => {
    // Here you would typically save the new guide to the database
    const newGuide = {
      id: Date.now(),
      name: formData.guideName,
      contact: formData.guideContact,
      license: formData.guideLicense
    };
    setSelectedGuide(newGuide);
    setShowAddGuide(false);
  };

  // Set initial content for notes editor
  useEffect(() => {
    if (notesEditorRef.current && notesEditorRef.current.innerHTML === '') {
      notesEditorRef.current.innerHTML = formData.notes || '';
    }
  }, []);

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    notesEditorRef.current?.focus();
  };

  const handleNotesInput = () => {
    const content = notesEditorRef.current?.innerHTML || '';
    setFormData(prev => ({
      ...prev,
      notes: content
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform form data to match trip structure
    const tripData = {
      id: Date.now(),
      tourNo: formData.tourNo,
      name: formData.name,
      countryOfClient: formData.countryOfClient,
      agent: {
        name: formData.agentName || 'N/A',
        contact: formData.agentContact || 'N/A'
      },
      guide: {
        name: formData.guideName || 'N/A',
        contact: formData.guideContact || 'N/A',
        license: formData.guideLicense || 'N/A'
      },
      tripCountry: 'Sri Lanka',
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: formData.days || 0,
      nights: formData.nights || 0,
      numberOfClients: parseInt(formData.numberOfClients) || 0,
      destinations: selectedDestinations,
      tourType: formData.tourType,
      assignedEmployee: 'Admin User',
      notes: formData.notes,
      status: formData.status
    };

    onSubmit(tripData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Trip</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              
              <div className="form-group">
                <label>Tour Number *</label>
                <input
                  type="text"
                  name="tourNo"
                  value={formData.tourNo}
                  onChange={handleChange}
                  placeholder="e.g., CGT-2025-007"
                  required
                />
              </div>

              <div className="form-group">
                <label>Trip Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Sri Lanka Heritage Tour"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tour Type *</label>
                <select
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  required
                >
                  <option value="Cultural">Cultural</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Wildlife">Wildlife</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Leisure">Leisure</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Client & Agent Information */}
            <div className="form-section">
              <h3 className="section-title">Client & Agent Details</h3>
              
              <div className="form-group">
                <label>Client Country</label>
                <input
                  type="text"
                  name="countryOfClient"
                  value={formData.countryOfClient}
                  onChange={handleChange}
                  placeholder="e.g., Italy"
                />
              </div>

              <div className="form-group">
                <label>Number of Clients</label>
                <input
                  type="number"
                  name="numberOfClients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  placeholder="e.g., 15"
                  min="1"
                />
              </div>

              {/* Agent Selector */}
              <div className="form-group">
                <label>Select Agent</label>
                {!selectedAgent && !showAddAgent ? (
                  <div className="selector-container">
                    <input
                      type="text"
                      value={agentSearchTerm}
                      onChange={(e) => setAgentSearchTerm(e.target.value)}
                      placeholder="Search by name, contact, or country..."
                      className="search-selector-input"
                    />
                    {agentSearchTerm && (
                      <div className="selector-dropdown">
                        {filteredAgents.length > 0 ? (
                          <>
                            {filteredAgents.map(agent => (
                              <div
                                key={agent.id}
                                className="selector-item"
                                onClick={() => handleAgentSelect(agent)}
                              >
                                <div className="selector-item-name">{agent.name}</div>
                                <div className="selector-item-details">
                                  {agent.contact} • {agent.country}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="selector-no-results">
                            <p>No agent found</p>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn-add-new-inline"
                      onClick={() => setShowAddAgent(true)}
                    >
                      + Add New Agent
                    </button>
                  </div>
                ) : !selectedAgent && showAddAgent ? (
                  <div className="add-new-form">
                    <h4>Add New Agent</h4>
                    <div className="info-message">
                      <span className="info-icon">ℹ</span>
                      <p>You can add more detailed information about this agent later on the Agents page.</p>
                    </div>
                    <div className="form-group">
                      <label>Agent Name</label>
                      <input
                        type="text"
                        name="agentName"
                        value={formData.agentName}
                        onChange={handleChange}
                        placeholder="Enter agent name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Agent Contact</label>
                      <input
                        type="text"
                        name="agentContact"
                        value={formData.agentContact}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div className="add-new-actions">
                      <button type="button" className="btn-cancel-add" onClick={() => setShowAddAgent(false)}>
                        Cancel
                      </button>
                      <button type="button" className="btn-save-add" onClick={handleAddNewAgent}>
                        Save Agent
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="selected-item-card">
                    <div className="selected-item-info">
                      <div className="selected-item-name">{selectedAgent.name}</div>
                      <div className="selected-item-details">
                        {selectedAgent.contact} • {selectedAgent.country || formData.countryOfClient}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-change"
                      onClick={() => {
                        setSelectedAgent(null);
                        setFormData(prev => ({ ...prev, agentName: '', agentContact: '' }));
                      }}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tour Guide Information */}
            <div className="form-section">
              <h3 className="section-title">Tour Guide Details</h3>
              
              {/* Guide Selector */}
              <div className="form-group">
                <label>Select Tour Guide</label>
                {!selectedGuide && !showAddGuide ? (
                  <div className="selector-container">
                    <input
                      type="text"
                      value={guideSearchTerm}
                      onChange={(e) => setGuideSearchTerm(e.target.value)}
                      placeholder="Search by name, contact, or license..."
                      className="search-selector-input"
                    />
                    {guideSearchTerm && (
                      <div className="selector-dropdown">
                        {filteredGuides.length > 0 ? (
                          <>
                            {filteredGuides.map(guide => (
                              <div
                                key={guide.id}
                                className="selector-item"
                                onClick={() => handleGuideSelect(guide)}
                              >
                                <div className="selector-item-name">{guide.name}</div>
                                <div className="selector-item-details">
                                  {guide.contact} • {guide.license}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="selector-no-results">
                            <p>No guide found</p>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn-add-new-inline"
                      onClick={() => setShowAddGuide(true)}
                    >
                      + Add New Guide
                    </button>
                  </div>
                ) : !selectedGuide && showAddGuide ? (
                  <div className="add-new-form">
                    <h4>Add New Tour Guide</h4>
                    <div className="info-message">
                      <span className="info-icon">ℹ</span>
                      <p>You can add more detailed information about this guide later on the Tour Guides page.</p>
                    </div>
                    <div className="form-group">
                      <label>Guide Name</label>
                      <input
                        type="text"
                        name="guideName"
                        value={formData.guideName}
                        onChange={handleChange}
                        placeholder="Enter guide name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Guide Contact</label>
                      <input
                        type="text"
                        name="guideContact"
                        value={formData.guideContact}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div className="form-group">
                      <label>Guide License</label>
                      <input
                        type="text"
                        name="guideLicense"
                        value={formData.guideLicense}
                        onChange={handleChange}
                        placeholder="Enter license number"
                      />
                    </div>
                    <div className="add-new-actions">
                      <button type="button" className="btn-cancel-add" onClick={() => setShowAddGuide(false)}>
                        Cancel
                      </button>
                      <button type="button" className="btn-save-add" onClick={handleAddNewGuide}>
                        Save Guide
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="selected-item-card">
                    <div className="selected-item-info">
                      <div className="selected-item-name">{selectedGuide.name}</div>
                      <div className="selected-item-details">
                        {selectedGuide.contact} • {selectedGuide.license}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-change"
                      onClick={() => {
                        setSelectedGuide(null);
                        setFormData(prev => ({ ...prev, guideName: '', guideContact: '', guideLicense: '' }));
                      }}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Travel Details */}
            <div className="form-section">
              <h3 className="section-title">Travel Details</h3>
              
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.days && formData.nights && (
                <div className="form-group">
                  <label>Duration (Auto-calculated)</label>
                  <div className="duration-display">
                    <span className="duration-badge">{formData.days}D / {formData.nights}N</span>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Destinations</label>
                <div className="destinations-selector">
                  <div className="destination-input-row">
                    <select
                      value={currentDestination}
                      onChange={(e) => setCurrentDestination(e.target.value)}
                      className="destination-select"
                    >
                      <option value="">Select a destination</option>
                      {availableDestinations
                        .filter(dest => !selectedDestinations.includes(dest))
                        .map(dest => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))
                      }
                    </select>
                    <button
                      type="button"
                      onClick={addDestination}
                      className="btn-add-destination"
                      disabled={!currentDestination}
                    >
                      + Add
                    </button>
                  </div>
                  
                  {selectedDestinations.length > 0 && (
                    <div className="selected-destinations">
                      {selectedDestinations.map((dest, index) => (
                        <div key={dest} className="destination-tag">
                          <span className="destination-name">{dest}</span>
                          <button
                            type="button"
                            onClick={() => removeDestination(dest)}
                            className="btn-remove-destination"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Notes</label>
                <div className="rich-text-editor">
                  <div className="editor-toolbar">
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('bold')}
                      title="Bold"
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('italic')}
                      title="Italic"
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('underline')}
                      title="Underline"
                    >
                      <u>U</u>
                    </button>
                    <div className="toolbar-divider"></div>
                    <div className="color-picker-wrapper">
                      <input
                        type="color"
                        id="textColorPicker"
                        className="color-picker-input"
                        onChange={(e) => applyFormatting('foreColor', e.target.value)}
                        title="Text Color"
                      />
                      <label htmlFor="textColorPicker" className="toolbar-btn color-btn" title="Text Color">
                        A
                      </label>
                    </div>
                    <div className="toolbar-divider"></div>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('insertUnorderedList')}
                      title="Bullet List"
                    >
                      ☰
                    </button>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('insertOrderedList')}
                      title="Numbered List"
                    >
                      1.
                    </button>
                    <div className="toolbar-divider"></div>
                    <button
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('removeFormat')}
                      title="Clear Formatting"
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    ref={notesEditorRef}
                    className="editor-content"
                    contentEditable
                    onInput={handleNotesInput}
                    suppressContentEditableWarning={true}
                    data-placeholder="Add any special notes or requirements..."
                  />
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
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripForm;
