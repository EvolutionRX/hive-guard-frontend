import React from 'react'
import '../../App.css'
import Sidebar from '../Dashboard/SideBarSection/Sidebar'
import Body from '../Dashboard/BodySection/Body'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Dashboard = () => {
  

  return (
  
      <div className="dashboard flex">
        <div className="dashboardContainer flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Body />} />
          </Routes>
        </div>
      </div>
  
  );
};

export default Dashboard
