import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DriverPage from "./pages/DriverPage";
import ManagerPage from "./pages/ManagerPage";
import DriverStats from "./pages/DriverStats";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/stats" element={<DriverStats />} />
      </Routes>
    </Router>
  );
}

export default App;
