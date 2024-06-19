import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import Axios from 'axios';
import video from '../../../Assets/video.mp4';
import logo from '../../../Assets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

const RegisterServerIP = () => {
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateIp = (ip) => {
    const ipRegex = /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)$/;
    return ipRegex.test(ip);
  };

  const fetchUserEmail = async (username) => {
    const response = await Axios.get(`${import.meta.env.VITE_API}/api/users?username=${username}`);
    return response.data.email;
  };

  const checkServerHealth = async (ip) => {
    const response = await Axios.get(`${ip}/api/healthcheck`);
    return response.status === 200;
  };

  const checkUserConfig = async (username) => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_API}/api/config?username=${username}`);
      return response.status === 200 && response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      } else {
        throw new Error('Error al verificar la configuración. Inténtalo de nuevo.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateIp(ip)) {
      setLoading(true);
      setError('');
      try {
        const serverHealth = await checkServerHealth(ip);
        if (!serverHealth) {
          setError('Error al verificar la URL. Inténtalo de nuevo.');
          return;
        }

        localStorage.setItem('serverIP', ip); // Guardar la IP del servidor en el almacenamiento local

        // Obtener el username desde el localStorage
        const username = localStorage.getItem('username');
        const email = await fetchUserEmail(username);
        localStorage.setItem('email', email);

        const configExists = await checkUserConfig(username);
        if (configExists) {
          navigate('/dashboard'); // Redirigir al dashboard si la configuración ya existe
        } else {
          navigate('/config'); // Redirigir a la pantalla de configuración si no existe
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Dirección URL inválida. Inténtalo de nuevo.');
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
              <label htmlFor="ipInput">{error && <p className="showMessage">{error}</p>}</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="ipInput"
                  placeholder="Ingresar URL de servidor"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#fff" /> : (
                <>
                  <span>Continuar</span>
                  <AiOutlineSwapRight className="icon" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterServerIP;
