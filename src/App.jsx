import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPageI from "./pages/RegisterPageI.jsx";
import RegisterPageII from "./pages/RegisterPageII.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="registration-basic-details" element={<RegisterPageI />} />
          <Route path="registration-full-details" element={<RegisterPageII />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
