import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages that should NOT show the sidebar
  const noSidebarPages = ['/login', '/404'];
  const showSidebar = !noSidebarPages.includes(location.pathname);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
