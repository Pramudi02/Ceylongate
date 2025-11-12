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
    <div className="travel-dashboard-page">
      {/* Animated Background */}
      <div className="travel-dashboard-bg">
        <div className="travel-bg-orb travel-bg-orb-1"></div>
        <div className="travel-bg-orb travel-bg-orb-2"></div>
        <div className="travel-bg-orb travel-bg-orb-3"></div>
      </div>

      {/* Main Content */}
      <div className="travel-dashboard-content">
        {/* Welcome Section */}
        <div className="travel-welcome-section">
          <div className="travel-welcome-text">
            <h2 className="travel-welcome-title">Welcome back, Ravindu!</h2>
            <p className="travel-welcome-subtitle">Here's what's happening with your travel business today</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="travel-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`travel-stat-card travel-stat-${stat.color}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`travel-stat-icon travel-icon-${stat.icon}`}></div>
              <div className="travel-stat-content">
                <p className="travel-stat-title">{stat.title}</p>
                <h3 className="travel-stat-value">{stat.value}</h3>
                <span className={`travel-stat-trend ${stat.trendUp ? 'travel-trend-up' : 'travel-trend-down'}`}>
                  {stat.trendUp ? '↑' : '↓'} {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="travel-section">
          <div className="travel-quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`travel-quick-action-btn travel-action-${action.color}`}
                onClick={action.action}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`travel-action-icon travel-icon-${action.icon}`}></span>
                <span className="travel-action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="travel-dashboard-grid">
          {/* Recent Activity */}
          <div className="travel-card">
            <h3 className="travel-card-title">Recent Activity</h3>
            <div className="travel-activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="travel-activity-item">
                  <span className={`travel-activity-icon travel-icon-${activity.icon}`}></span>
                  <div className="travel-activity-content">
                    <p className="travel-activity-message">{activity.message}</p>
                    <span className="travel-activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="travel-card">
            <h3 className="travel-card-title">Upcoming Trips</h3>
            <div className="travel-trips-list">
              {upcomingTrips.map(trip => (
                <div key={trip.id} className="travel-trip-item">
                  <div className="travel-trip-info">
                    <h4 className="travel-trip-name">{trip.name}</h4>
                    <p className="travel-trip-details">
                      <span><span className="travel-icon-calendar"></span> {trip.date}</span>
                      <span><span className="travel-icon-users"></span> {trip.guests} guests</span>
                    </p>
                    <p className="travel-trip-guide">Guide: {trip.guide}</p>
                  </div>
                  <button
                    className="travel-btn-view"
                    onClick={() => navigate(`/trips/${trip.id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
            <button className="travel-btn-primary travel-btn-full" onClick={() => navigate('/trips')}>
              View All Trips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
