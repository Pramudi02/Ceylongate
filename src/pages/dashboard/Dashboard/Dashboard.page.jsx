import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.page.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Total Trips',
      value: '156',
      icon: 'globe',
      color: 'primary',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Ongoing Trips',
      value: '23',
      icon: 'plane',
      color: 'info',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Completed This Month',
      value: '45',
      icon: 'check',
      color: 'success',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Total Customers',
      value: '892',
      icon: 'users',
      color: 'warning',
      trend: '+15%',
      trendUp: true
    }
  ];

  const quickActions = [
    { label: 'Create New Trip', icon: 'plus', action: () => navigate('/trips'), color: 'primary' },
    { label: 'Manage Customers', icon: 'users', action: () => navigate('/customers'), color: 'info' },
    { label: 'View Users', icon: 'user', action: () => navigate('/users'), color: 'success' },
    { label: 'Reports', icon: 'chart', action: () => {}, color: 'warning' }
  ];

  const recentActivities = [
    { id: 1, type: 'trip', message: 'New trip "Maldives Paradise" created', time: '2 hours ago', icon: 'luggage' },
    { id: 2, type: 'customer', message: 'Sarah Johnson registered as new customer', time: '4 hours ago', icon: 'user' },
    { id: 3, type: 'booking', message: 'Hotel booking confirmed for "Colombo City Tour"', time: '6 hours ago', icon: 'hotel' },
    { id: 4, type: 'payment', message: 'Invoice #INV-1243 payment received', time: '8 hours ago', icon: 'dollar' },
    { id: 5, type: 'feedback', message: 'New 5-star review from John Doe', time: '1 day ago', icon: 'star' }
  ];

  const upcomingTrips = [
    { id: 1, name: 'Sigiriya Adventure', date: '2025-10-28', guests: 15, guide: 'Kamal Silva' },
    { id: 2, name: 'Ella Mountain Trek', date: '2025-10-30', guests: 8, guide: 'Nimal Perera' },
    { id: 3, name: 'Galle Fort Tour', date: '2025-11-02', guests: 12, guide: 'Sunil Fernando' }
  ];

  return (
    <div className="dashboard-page">
     

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div>
            <h2 className="welcome-title">Welcome back, Ravindu!</h2>
            <p className="welcome-subtitle">Here's what's happening with your travel business today</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className={`stat-icon icon-${stat.icon}`}></div>
              <div className="stat-content">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                  {stat.trendUp ? '↑' : '↓'} {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="section">
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`quick-action-btn action-${action.color}`}
                onClick={action.action}
              >
                <span className={`action-icon icon-${action.icon}`}></span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-grid">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="card-title">Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className={`activity-icon icon-${activity.icon}`}></span>
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="card">
            <h3 className="card-title">Upcoming Trips</h3>
            <div className="trips-list">
              {upcomingTrips.map(trip => (
                <div key={trip.id} className="trip-item">
                  <div className="trip-info">
                    <h4 className="trip-name">{trip.name}</h4>
                    <p className="trip-details">
                      <span><span className="icon-calendar"></span> {trip.date}</span>
                      <span><span className="icon-users"></span> {trip.guests} guests</span>
                    </p>
                    <p className="trip-guide">Guide: {trip.guide}</p>
                  </div>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/trips/${trip.id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-primary btn-full" onClick={() => navigate('/trips')}>
              View All Trips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
