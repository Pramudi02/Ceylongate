import React from 'react';
import './TripFeedback.tab.css';

const TripFeedback = ({ tripData }) => {
  const feedbacks = [
    {
      id: 1,
      customerName: 'John Smith',
      rating: 5,
      comment: 'Absolutely amazing experience! The guide was knowledgeable and the itinerary was perfect.',
      date: '2025-10-18',
      verified: true
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      rating: 4,
      comment: 'Great trip overall, but would have liked more free time to explore on our own.',
      date: '2025-10-17',
      verified: true
    },
    {
      id: 3,
      customerName: 'Michael Brown',
      rating: 5,
      comment: 'Best vacation ever! Highly recommend CEYLONGATE for anyone planning a trip to Maldives.',
      date: '2025-10-16',
      verified: false
    }
  ];

  const averageRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        {i < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    feedbacks.forEach(f => distribution[f.rating - 1]++);
    return distribution.reverse();
  };

  const ratingDist = getRatingDistribution();

  return (
    <div className="trip-feedback">
      <div className="feedback-header">
        <h3 className="section-title">Customer Feedback</h3>
        <button className="btn-secondary">📥 Export Feedback</button>
      </div>

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="average-rating">
          <div className="rating-number">{averageRating}</div>
          <div className="rating-stars">{renderStars(Math.round(parseFloat(averageRating)))}</div>
          <div className="rating-count">{feedbacks.length} reviews</div>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={star} className="rating-row">
              <span className="rating-label">{star} ⭐</span>
              <div className="rating-bar">
                <div
                  className="rating-bar-fill"
                  style={{ width: `${(ratingDist[index] / feedbacks.length) * 100}%` }}
                />
              </div>
              <span className="rating-percent">{ratingDist[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="feedbacks-list">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-header-row">
              <div className="customer-info">
                <div className="customer-avatar">
                  {feedback.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="customer-name">
                    {feedback.customerName}
                    {feedback.verified && <span className="verified-badge">✓ Verified</span>}
                  </h4>
                  <p className="feedback-date">{feedback.date}</p>
                </div>
              </div>
              <div className="feedback-rating">{renderStars(feedback.rating)}</div>
            </div>

            <p className="feedback-comment">{feedback.comment}</p>
          </div>
        ))}
      </div>

      {feedbacks.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">⭐</span>
          <h3>No Feedback Yet</h3>
          <p>Customer reviews will appear here after the trip is completed</p>
        </div>
      )}
    </div>
  );
};

export default TripFeedback;
