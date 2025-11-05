import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'user-types': 'User Types',
      'agencies': 'Agencies',
      'students': 'Students',
      'notice': 'Notice Board',
      'fees-management': 'Fees Management',
      'setting': 'Settings',
      'profile': 'Profile',
      'help': 'Help & Support',
      'logout': 'Logout'
    };
    return titles[path] || 'Dashboard';
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={handleMenuClick}
          title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;