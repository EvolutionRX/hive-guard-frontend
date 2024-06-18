import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${import.meta.env.VITE_API}/register`, {
        Email: email,
        UserName: userName,
        Password: password
      });
      navigateTo('/');
      setEmail('');
      setUserName('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Prioriza la salud de tus abejas.</h2>
            <p>En Hive Guard, simplificamos la gestión de tus colmenas. Impulsa el rendimiento de tus abejas con nuestra tecnología.</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">¿Tienes una cuenta?</span>
            <Link to={'/'}>
              <button className="btn">Iniciar sesión</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>¡Bienvenido!</h3>
          </div>
          <form action="" className="form grid" onSubmit={createUser}>
            <div className="inputDiv">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input type="email" id="email" placeholder="Ingresar correo"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input type="text" id="username" placeholder="Ingresar usuario"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)} />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input type="password" id="password" placeholder="Ingresar contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn flex" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#fff" /> : (
                <>
                  <span>Registrar</span>
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

export default Register;
