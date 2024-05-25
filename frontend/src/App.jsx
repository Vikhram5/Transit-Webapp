import React from "react";
import Layout from "./components/Navbar/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BusCount from "./components/BusAnalysis/BusCount";
import MainpageLP from "./components/Loading Profile/MainpageLP";
import ODMatrix from "./components/OD Analysis/ODMatrix";
import Revenue from "./components/Revenue/Revenue";
import MainComponent from "./components/Passenger/MainComponent";
import Dashboard from "./DashBoard";

const App = () => {
  return (
    <>
    
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buscount" element={<BusCount />} />
            <Route path="/passcount" element={<MainComponent />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/loadingprofile" element={<MainpageLP />} />
            <Route path="/odmatrix" element={<ODMatrix />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
