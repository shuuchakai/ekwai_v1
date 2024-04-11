import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';

import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail';

import DashboardRequest from './pages/Dashboard/DashboardRequest/DashboardRequest';
import DashboardSolicitudes from './pages/Dashboard/DashboardRequestGet/DashboardRequestGet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/dashboard" element={<DashboardRequest />} />
        <Route path="/dashboard/solicitudes" element={<DashboardSolicitudes />} />
      </Routes>
    </Router>
  )
}

export default App
