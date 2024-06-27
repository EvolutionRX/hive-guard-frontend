import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../ActivitySection/activity.css';
import { BsArrowRightShort } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import img from '../../../../Assets/colmena.png';
import { ClipLoader } from 'react-spinners';
import user from '../../../../Assets/logo.png';

const Listing = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHive, setSelectedHive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllHivesModal, setShowAllHivesModal] = useState(false);
  const serverIP = localStorage.getItem('serverIP');

  // Mock data for hives
  /*
  const mockHives = [
    [
      "esp32cam139959",
      {
        "id": "esp32cam139959",
        "wsPort": "8002",
        "appPort": "9002",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #139959",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam139959",
            "alertType": "HUM",
            "value": "69.62"
          },
          {
            "sensorId": "esp32cam139959",
            "alertType": "HUM",
            "value": "69.55"
          },
          {
            "sensorId": "esp32cam139959",
            "alertType": "HUM",
            "value": "69.53"
          }
        ]
      }
    ],
    [
      "esp32cam753359",
      {
        "id": "esp32cam753359",
        "wsPort": "8001",
        "appPort": "9001",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #753359",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.76"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.84"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.79"
          }
        ]
      }
    ],
    [
      "esp32cam809012",
      {
        "id": "esp32cam809012",
        "wsPort": "8001",
        "appPort": "9001",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #753359",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.76"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.84"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.79"
          }
        ]
      }
    ],
    [
      "esp32cam776442",
      {
        "id": "esp32cam776442",
        "wsPort": "8001",
        "appPort": "9001",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #753359",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.76"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.84"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.79"
          }
        ]
      }
    ],
    [
      "esp32cam678321",
      {
        "id": "esp32cam678321",
        "wsPort": "8001",
        "appPort": "9001",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #753359",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.76"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.84"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.79"
          }
        ]
      }
    ],
    [
      "esp32cam434112",
      {
        "id": "esp32cam434112",
        "wsPort": "8001",
        "appPort": "9001",
        "saveSensorData": true,
        "detectObjects": true,
        "class": "cam-instance",
        "display": "Cam #753359",
        "ip": "192.168.1.56",
        "commands": [
          {
            "id": "ON_BOARD_LED",
            "name": "Camera flashlight",
            "class": "led-light",
            "state": 0
          }
        ],
        "alerts": [
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.76"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.84"
          },
          {
            "sensorId": "esp32cam753359",
            "alertType": "HUM",
            "value": "69.79"
          }
        ]
      }
    ]
  ];
  */

  useEffect(() => {
    const pollHives = async () => {
      try {
        const response = await Axios.get(`${serverIP}/api/hives`);
        //const response = { data: mockHives };
        setHives(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hives:', error);
        setLoading(false);
      }
    };

    const interval = setInterval(pollHives, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [serverIP]);

  const openModal = (hive) => {
    setSelectedHive(hive);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedHive(null);
    setShowModal(false);
  };

  const openAllHivesModal = () => setShowAllHivesModal(true);
  const closeAllHivesModal = () => setShowAllHivesModal(false);

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Mis colmenas</h1>
        <button className="btn flex" onClick={openAllHivesModal}>
          Mirar todas <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer flex">
        {loading ? (
          <div className="loaderContainer">
            <ClipLoader size={50} color="#007bff" />
          </div>
        ) : (
          hives.length > 0 && hives.slice(0, 2).map(([key, hive], index) => (
            <div key={index} className="singleItem" onClick={() => openModal(hive)}>
              <div>{hive.display}</div>
              <img src={img} alt={hive.display} />
            </div>
          ))
        )}
      </div>

      {showAllHivesModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={closeAllHivesModal}>×</button>
            <h2>Todas las Colmenas</h2>
            <div className="secContainer grid2">
              {hives.map(([key, hive], index) => (
                <div key={index} className="singleItem">
                  <div>{hive.id}</div>
                  <img src={img} alt={hive.id} />
                  <button className="btn flex" onClick={() => openModal(hive)}>
                    Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && selectedHive && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeButton" onClick={closeModal}>×</button>
            <h2>Información de la Colmena</h2>
            <div className="hiveDetails">
              <p><strong>Sensor:</strong> {selectedHive.id}</p>
              <p><strong>IP:</strong> {selectedHive.ip}</p>
              <h3>Alertas</h3>
              <div className="secContainer grid">
                {selectedHive.alerts.map((alert, index) => (
                  <div key={index} className="singleCustomer flex">
                    <img src={user} alt="Customer Image" />
                    <div className="customerDetails">
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
        </div>
      )}
    </div>
  );
};

export default Listing;
