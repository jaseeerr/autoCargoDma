import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Header';
import ViewProforma from './components/ViewProforma';
import ViewCommercial from './components/ViewCommercial';
import EditProformaV2 from './components/v2/EditProformaV2';
import ProformaV2 from './components/v2/ProformaV2';
import CommercialV2 from './components/v2/CommercialV2';
import EditCommercialV2 from './components/v2/EditCommercialV2';
import SignupPage from './components/Signup';
import LoginPage from './components/Login';

function AppContent() {
  const location = useLocation();
  // Hide the Navbar on /signup and /login routes
  const hideNavbar = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<CommercialV2 />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/proforma" element={<ProformaV2 />} />
        <Route path="/commercial" element={<CommercialV2 />} />
        <Route path="/viewProforma" element={<ViewProforma />} />
        <Route path="/editProforma/:id" element={<EditProformaV2 />} />
        <Route path="/viewCommercial" element={<ViewCommercial />} />
        <Route path="/editCommerical/:id" element={<EditCommercialV2 />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
