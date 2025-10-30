import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Login from './pages/auth/Login/Login.page';
import Dashboard from './pages/dashboard/Dashboard/Dashboard.page';
import TripsList from './pages/trips/TripsList/TripsList.page';
import TripDetails from './pages/trips/TripDetails/TripDetails.page';
import CustomersList from './pages/customers/CustomersList/CustomersList.page';
import CustomerDetails from './pages/customers/CustomerDetails/CustomerDetails.page';
import UsersManagement from './pages/users/UsersManagement/UsersManagement.page';
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
          
          {/* Customers */}
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/:customerId" element={<CustomerDetails />} />
          
          {/* Users */}
          <Route path="/users" element={<UsersManagement />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
