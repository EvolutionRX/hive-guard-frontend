import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './activity.css';
import { BsArrowRightShort } from 'react-icons/bs';
import user from '../../../../Assets/logo.png';

const Activity = () => {
  const [alerts, setAlerts] = useState([]);
  const serverIP = localStorage.getItem('serverIP');
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    const pollAlerts = async () => {
      try {
        const response = await Axios.get(`${serverIP}/api/alerts`);
        if (response.data.length > 0) {
          setAlerts(response.data);
        } else {
          setAlerts([]);
        }
      } catch (error) {
        console.error('Ocurrió un error al buscar las alertas:', error);
      }
    };

    const interval = setInterval(pollAlerts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [serverIP]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Actividad reciente</h1>
        <button className="btn flex" onClick={openModal}>
          Mirar todas
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
      {alerts.length > 0 && alerts.slice(0, 3).map((alert, index) => (
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

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={closeModal}>×</button>
            <h2>Alertas</h2>
            <div className="secContainer grid">
            {alerts.map((alert, index) => (
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
        </div>
      )}
    </div>
  );
};

export default Activity;