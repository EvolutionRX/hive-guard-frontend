import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateIp(ip)) {
      setLoading(true);
      setError('');
      try {
          const response = await Axios.get(`https://${ip}:8000/api/healthcheck`);
          if (response.status === 200) {
            localStorage.setItem('serverIP', ip); // Guardar la IP del servidor en el almacenamiento local

            // Obtener el email del usuario
            const username = localStorage.getItem('username');
            const userResponse = await Axios.get(`${import.meta.env.VITE_API}/api/users?username=${username}`);
            const userEmail = userResponse.data.email;
            localStorage.setItem('email', userEmail);

            const configResponse = await Axios.get(`${import.meta.env.VITE_API}/api/config?username=${username}`);
            if (configResponse.status === 200 && configResponse.data) {
              navigate('/dashboard'); // Redirigir al dashboard si la configuración ya existe
            } else {
              navigate('/config'); // Redirigir a la pantalla de configuración si no existe
            }
          } else {
            setError('Error al verificar la URL. Inténtalo de nuevo.');
          }    
      } catch (error) {
        setError('Error al verificar la URL. Inténtalo de nuevo.');
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
