import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './activity.css';
import { BsArrowRightShort } from 'react-icons/bs';
import user from '../../../../Assets/logo.png';
import { ClipLoader } from 'react-spinners';

const Activity = () => {
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const serverIP = localStorage.getItem('serverIP');

  // Mock data for alerts
  /*
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
    },
    {
      sensorId: "esp32cam721689",
      alertType: "HUM",
      value: "70.33"
    },
    {
      sensorId: "esp32cam721689",
      alertType: "HUM",
      value: "70.52"
    },
    {
      sensorId: "esp32cam721689",
      alertType: "HUM",
      value: "70.31"
    },
    {
      sensorId: "esp32cam721689",
      alertType: "HUM",
      value: "70.88"
    },
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.33"
    },
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.33"
    },
    {
      sensorId: "esp32cam738785",
      alertType: "HUM",
      value: "70.30"
    }
  ];
 */
  useEffect(() => {
    const pollAlerts = async () => {
      try {
        // Use mock data for testing
        //const response = { data: mockAlerts };
        const response = await Axios.get(`${serverIP}/api/alerts`);
        if (response.data.length > 0) {
          setAlerts(response.data);
        } else {
          setAlerts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Ocurrió un error al buscar las alertas:', error);
        setLoading(false);
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
        {loading ? (
          <div className="loaderContainer">
            <ClipLoader size={50} color="#007bff" />
          </div>
        ) : (
          alerts.length > 0 && alerts.slice(0, 3).map((alert, index) => (
            <div key={index} className="singleCustomer flex">
              <img src={user} alt="Customer Image" />
              <div className="customerDetails">
                <span className="sensorId">{alert.sensorId}</span>
                <span className="name">{alert.alertType === 'TEMP' ? 'Temperatura' : 'Humedad'}</span>
                <small>
                  {alert.alertType === 'TEMP'
                    ? `Disminuyó la temperatura por encima de ${alert.value}°`
                    : `Aumentó la humedad por encima de ${alert.value}%`}
                </small>
              </div>
              <div className="duration">
                Hace un momento
              </div>
            </div>
          ))
        )}
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
                    <span className="sensorId">{alert.sensorId}</span>
                    <span className="name">{alert.alertType === 'TEMP' ? 'Temperatura' : 'Humedad'}</span>
                    <small>
                      {alert.alertType === 'TEMP'
                        ? `Disminuyó la temperatura por encima de ${alert.value}°`
                        : `Aumentó la humedad por encima de ${alert.value}%`}
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
