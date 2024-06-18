import React from 'react'
import '../../App.css'
import './BodySection/body.css'
import RegisterServer from './ScreenServerIP/RegisterServerIP.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const ScreenServerView = () => {
  return (
  
      
          <Routes>
          
            <Route path="/" element={<RegisterServer />} />
        
          </Routes>
         
  
  );
};

export default ScreenServerView
