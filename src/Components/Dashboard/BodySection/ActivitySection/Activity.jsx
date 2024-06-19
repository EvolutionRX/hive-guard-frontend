import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './activity.css';
import { BsArrowRightShort } from 'react-icons/bs';
import user from '../../../../Assets/logo.png';

const Activity = () => {
  const [alerts, setAlerts] = useState([]);
  const serverIP = localStorage.getItem('serverIP');
   // Mock data for alerts
   const mockAlerts = [
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.20"
    },
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.33"
    },
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.52"
    }
  ];

  useEffect(() => {
    const pollAlerts = async () => {
      try {
        //const response = await Axios.get(`${serverIP}/api/alerts`);
        const response = { data: mockAlerts };
        if (response.data.length > 0) {
          setAlerts(response.data);
        } else {
          setAlerts([]);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    const interval = setInterval(pollAlerts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [serverIP]);

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Actividad reciente</h1>
        <button className="btn flex">
          Mirar todas
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        {/* <div className="singleCustomer flex"> */}
        

        {alerts.length > 0 && alerts.map((alert, index) => (
          <div key={index} className="singleCustomer flex">
            <img src={user} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">{alert.alertType === 'TEMP' ? 'Temperatura' : 'Humedad'}</span>
              <small>
                {alert.alertType === 'TEMP'
                  ? `Subió la temperatura por encima de ${alert.value}°`
                  : `Subió la humedad por encima de ${alert.value}%`}
              </small>
            </div>
            <div className="duration">
              Hace un momento
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
