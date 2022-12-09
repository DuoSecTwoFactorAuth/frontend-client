import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPageI from "./pages/RegisterPageI.jsx";
import RegisterPageII from "./pages/RegisterPageII.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Navbar from "./components/Navbar.jsx";
import QRCodePage from "./pages/QRCode.jsx";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="registration-basic-details" element={<RegisterPageI />} />
        <Route path="registration-full-details" element={<RegisterPageII />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="company" element={<Navbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="qr-code/:companyEmployeeHash" element={<QRCodePage />} />
      </Route>
    </Routes>
  );
}

export default App;
