import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Login from './pages/auth/Login/Login.page';
import Dashboard from './pages/dashboard/Dashboard/Dashboard.page';
import TripsList from './pages/trips/TripsList/TripsList.page';
import TripDetails from './pages/trips/TripDetails/TripDetails.page';
import ServiceVoucher from './pages/trips/TripDetails/ServiceVoucher.page';
import AgentsList from './pages/agents/AgentsList/AgentsList.page';
import AgentDetails from './pages/agents/AgentDetails/AgentDetails.page';
import GuidesList from './pages/guides/GuidesList/GuidesList.page';
import GuideDetails from './pages/guides/GuideDetails/GuideDetails.page';
import UsersManagement from './pages/users/UsersManagement/UsersManagement.page';
import Reports from './pages/reports/Reports.page';
import NotFound from './pages/not-found/NotFound/NotFound.page';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Trips */}
          <Route path="/trips" element={<TripsList />} />
          <Route path="/trips/:tripId" element={<TripDetails />} />
          <Route path="/trips/:tripId/service-voucher" element={<ServiceVoucher />} />
          
          {/* Agents & Guides */}
          <Route path="/agents" element={<AgentsList />} />
          <Route path="/agents/:agentId" element={<AgentDetails />} />
          <Route path="/guides" element={<GuidesList />} />
          <Route path="/guides/:guideId" element={<GuideDetails />} />
          
          {/* Users */}
          <Route path="/users" element={<UsersManagement />} />
          
          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
