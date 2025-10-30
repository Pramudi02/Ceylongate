import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersManagement.page.css';

const UsersManagement = () => {
  const navigate = useNavigate();

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@ceylongate.com', role: 'Admin', status: 'Active', lastLogin: '2025-10-25' },
    { id: 2, name: 'Kamal Silva', email: 'kamal@ceylongate.com', role: 'Manager', status: 'Active', lastLogin: '2025-10-24' },
    { id: 3, name: 'Nimal Perera', email: 'nimal@ceylongate.com', role: 'Staff', status: 'Active', lastLogin: '2025-10-23' },
    { id: 4, name: 'Sunil Fernando', email: 'sunil@ceylongate.com', role: 'Staff', status: 'Active', lastLogin: '2025-10-22' },
    { id: 5, name: 'Sarah Johnson', email: 'sarah@ceylongate.com', role: 'Manager', status: 'Inactive', lastLogin: '2025-09-15' }
  ];

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Admin':
        return <span className="role-badge role-admin">👑 Admin</span>;
      case 'Manager':
        return <span className="role-badge role-manager">⭐ Manager</span>;
      case 'Staff':
        return <span className="role-badge role-staff">👤 Staff</span>;
      default:
        return role;
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? <span className="badge status-completed">✅ Active</span>
      : <span className="badge status-cancelled">⏸️ Inactive</span>;
  };

  return (
    <div className="users-management-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div>
            <h1 className="page-title">Users Management</h1>
            <p className="page-subtitle">Manage system users and roles</p>
          </div>
        </div>
        <button className="btn-primary">➕ Add New User</button>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="admin-notice">
          ⚠️ Admin Access Only - Handle user accounts with care
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <strong>{user.name}</strong>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="user-email">
                      {user.email}
                    </a>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn btn-edit" title="Edit Role">
                        ✏️
                      </button>
                      <button 
                        className="action-btn btn-toggle"
                        title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {user.status === 'Active' ? '⏸️' : '▶️'}
                      </button>
                      <button className="action-btn btn-delete" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
