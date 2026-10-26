import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPortal({ onBackToSite }) {
  const [token, setToken] = useState(() => localStorage.getItem('sunvolt_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sunvolt_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setAdminUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('sunvolt_admin_token');
    localStorage.removeItem('sunvolt_admin_user');
    setToken('');
    setAdminUser(null);
  };

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToSite={onBackToSite} />;
  }

  return (
    <AdminDashboard
      token={token}
      adminUser={adminUser}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
    />
  );
}
