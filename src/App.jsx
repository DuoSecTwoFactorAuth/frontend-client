import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPageI from "./pages/RegisterPageI.jsx";
import RegisterPageII from "./pages/RegisterPageII.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="registration-basic-details" element={<RegisterPageI />} />
          <Route path="registration-full-details" element={<RegisterPageII />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-settings" element={<Settings />} />
        </Route>
    </Routes>
  )
}

export default App;
