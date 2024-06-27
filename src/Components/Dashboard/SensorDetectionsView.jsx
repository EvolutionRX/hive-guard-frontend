import React from 'react'
import '../../App.css'
import Sidebar from './SideBarSection/Sidebar'
import './BodySection/body.css'
import Charts from './GraphSection/SensorDetectionsChart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const SensorDetectionsView = () => {
  return (
  
      <div className="dashboard flex">
        <div className="dashboardContainer flex">
          <Sidebar />
          <div className='mainContent'>
          <Routes>
          
            <Route path="/" element={<Charts  />} />
        
          </Routes>
          </div>
        </div>
      </div>
  
  );
};

export default SensorDetectionsView
