import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../App.css';
import video from '../../../Assets/video.mp4';
import logo from '../../../Assets/logo.png';
import { FaThermometerHalf } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { ClipLoader } from 'react-spinners';

const RegisterConfig = () => {
  const [config, setConfig] = useState({
    TEMP_MIN_THRESHOLD: '',
    TEMP_MAX_THRESHOLD: '',
    HUM_THRESHOLD: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const serverIP = localStorage.getItem('serverIP');
  const username = localStorage.getItem('username'); // Obtener el nombre de usuario
  const emailRecipient = localStorage.getItem('email'); // Obtener el correo electrónico del destinatario

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configData = {
      ...config,
      username,
    };

    const serverConfigData = {
      TEMP_MIN_THRESHOLD: config.TEMP_MIN_THRESHOLD,
      TEMP_MAX_THRESHOLD: config.TEMP_MAX_THRESHOLD,
      HUM_THRESHOLD: config.HUM_THRESHOLD,
      EMAIL_USER: import.meta.env.VITE_EMAIL_USER,
      EMAIL_PASS: import.meta.env.VITE_EMAIL_PASS,
      EMAIL_RECIPIENT: emailRecipient
    };

    setLoading(true);
    setError('');

    try {
      // Crear la configuración en la base de datos del servidor
      await Axios.post(`${import.meta.env.VITE_API}/api/setConfig`, configData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Enviar la configuración a la URL del servidor para su aplicación
      await Axios.post(`https://${serverIP}:8000/api/config`, serverConfigData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Configuration saved and applied successfully!');
      navigate('/dashboard');
    } catch (error) {
      setError('Error saving configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Prioriza la salud de tus abejas.</h2>
            <p>En Hive Guard, simplificamos la gestión de tus colmenas. Impulsa el rendimiento de tus abejas con nuestra tecnología.</p>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Configuración Inicial</h3>
          </div>
          <form className="form grid" onSubmit={handleSubmit}>
            <div className="inputDiv">
              <div className="input flex">
                <FaThermometerHalf className="icon" />
                <input
                  type="number"
                  id="TEMP_MIN_THRESHOLD"
                  name="TEMP_MIN_THRESHOLD"
                  placeholder="Temperatura Mínima"
                  value={config.TEMP_MIN_THRESHOLD}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <FaThermometerHalf className="icon" />
                <input
                  type="number"
                  id="TEMP_MAX_THRESHOLD"
                  name="TEMP_MAX_THRESHOLD"
                  placeholder="Temperatura Máxima"
                  value={config.TEMP_MAX_THRESHOLD}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <WiHumidity className="icon" />
                <input
                  type="number"
                  id="HUM_THRESHOLD"
                  name="HUM_THRESHOLD"
                  placeholder="Humedad Máxima"
                  value={config.HUM_THRESHOLD}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#fff" /> : (
                <>
                  <span>Finalizar</span>
                </>
              )}
            </button>
          </form>
          {error && <p className="showMessage">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterConfig;
