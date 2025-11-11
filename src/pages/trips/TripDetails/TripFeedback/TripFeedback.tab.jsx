import React, { useState } from 'react';
import './TripFeedback.tab.css';

const TripFeedback = ({ tripData }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [feedbackFiles, setFeedbackFiles] = useState([
    {
      id: 1,
      customerName: 'Marco Rossi',
      fileName: 'Feedback_Marco_Rossi.pdf',
      uploadDate: '2025-10-18',
      fileSize: '1.2 MB',
      uploadedBy: 'Admin User'
    },
    {
      id: 2,
      customerName: 'Sofia Romano',
      fileName: 'Feedback_Sofia_Romano.pdf',
      uploadDate: '2025-10-17',
      fileSize: '890 KB',
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: 3,
      customerName: 'Giovanni Bianchi',
      fileName: 'Feedback_Giovanni_Bianchi.pdf',
      uploadDate: '2025-10-16',
      fileSize: '1.5 MB',
      uploadedBy: 'Tour Guide Team'
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    customerName: '',
    file: null,
    uploadedBy: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadForm({ ...uploadForm, file });
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.customerName || !uploadForm.file || !uploadForm.uploadedBy) {
      alert('Please fill in all required fields');
      return;
    }

    const newFeedback = {
      id: feedbackFiles.length + 1,
      customerName: uploadForm.customerName,
      fileName: uploadForm.file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: (uploadForm.file.size / (1024 * 1024)).toFixed(2) + ' MB',
      uploadedBy: uploadForm.uploadedBy
    };

    setFeedbackFiles([newFeedback, ...feedbackFiles]);
    setUploadForm({ customerName: '', file: null, uploadedBy: '' });
    setShowUploadForm(false);
    alert('Feedback uploaded successfully!');
  };

  const handleDownloadPDF = (feedback) => {
    // In real implementation, this would download the PDF
    alert(`Downloading ${feedback.fileName}...`);
    console.log('Download PDF:', feedback);
  };

  const handleDeleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbackFiles(feedbackFiles.filter(f => f.id !== id));
    }
  };

  return (
    <div className="trip-feedback">
      <div className="feedback-header">
        <h3 className="section-title">Customer Feedback Forms</h3>
        <button className="btn-upload-feedback" onClick={() => setShowUploadForm(true)}>
          Upload New Feedback
        </button>
      </div>

      {/* Feedback Files List */}
      <div className="feedback-files-list">
        {feedbackFiles.map(feedback => (
          <div key={feedback.id} className="feedback-file-card">
            <div className="file-icon">
              <span className="icon-pdf"></span>
            </div>
            
            <div className="file-info">
              <h4 className="file-customer-name">{feedback.customerName}</h4>
              <p className="file-name">{feedback.fileName}</p>
              <div className="file-meta">
                <span>{feedback.uploadDate}</span>
                <span>•</span>
                <span>{feedback.fileSize}</span>
                <span>•</span>
                <span>Uploaded by: {feedback.uploadedBy}</span>
              </div>
            </div>

            <div className="file-actions">
              <button 
                className="btn-action btn-download" 
                onClick={() => handleDownloadPDF(feedback)}
                title="Download PDF"
              >
                Download
              </button>
              <button 
                className="btn-action btn-delete-feedback" 
                onClick={() => handleDeleteFeedback(feedback.id)}
                title="Delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {feedbackFiles.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon"></span>
          <h3>No Feedback Forms Yet</h3>
          <p>Upload customer feedback PDFs to keep track of their responses</p>
          <button className="btn-primary" onClick={() => setShowUploadForm(true)}>
            Upload First Feedback
          </button>
        </div>
      )}

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="modal-overlay" onClick={() => setShowUploadForm(false)}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload Customer Feedback</h2>
              <button className="btn-close" onClick={() => setShowUploadForm(false)}>
                <span className="close-icon">✕</span>
              </button>
            </div>

            <form onSubmit={handleUpload} className="upload-form">
              <div className="form-group">
                <label htmlFor="customerName">Customer Name *</label>
                <input
                  type="text"
                  id="customerName"
                  value={uploadForm.customerName}
                  onChange={(e) => setUploadForm({ ...uploadForm, customerName: e.target.value })}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="uploadedBy">Uploaded By *</label>
                <input
                  type="text"
                  id="uploadedBy"
                  value={uploadForm.uploadedBy}
                  onChange={(e) => setUploadForm({ ...uploadForm, uploadedBy: e.target.value })}
                  placeholder="Enter your name or team name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="feedbackFile">Feedback PDF File *</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="feedbackFile"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  {uploadForm.file && (
                    <div className="file-selected">
                      <span className="icon-pdf-selected"></span>
                      <span className="file-selected-name">{uploadForm.file.name}</span>
                      <span className="file-selected-size">
                        ({(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>
                <p className="file-help-text">Only PDF files are accepted. Maximum size: 10MB</p>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Upload Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripFeedback;
