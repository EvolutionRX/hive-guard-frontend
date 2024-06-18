import React from 'react'
import '../../App.css'
import './BodySection/body.css'
import RegisterConfig from './ScreenConfig/RegisterConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const ScreenServerView = () => {
  return (
  
      
          <Routes>
          
            <Route path="/" element={<RegisterConfig />} />
        
          </Routes>
         
  
  );
};

export default ScreenServerView
