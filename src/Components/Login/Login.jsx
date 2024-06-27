import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

const Login = () => {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginStatus('');
        try {
            const response = await Axios.post(`${import.meta.env.VITE_API}/login`, {
                LoginUserName: loginUserName,
                LoginPassword: loginPassword
            });
            if (response.data.message || loginUserName === '' || loginPassword === '') {
                setLoginStatus('Las credenciales ingresadas no existen.');
                setStatusHolder('showMessage');
                setTimeout(() => {
                    setStatusHolder('message');
                }, 2000);
            } else {
                localStorage.setItem('username', loginUserName);
                navigateTo('/ingresarServidor');
            }
        } catch (error) {
            setLoginStatus('Error durante el inicio de sesión. Inténtalo de nuevo.');
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 2000);
        }
    }, [loginStatus]);

    const onSubmit = () => {
        setLoginUserName('');
        setLoginPassword('');
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
                    <div className="footerDiv flex">
                        <span className="text">¿No tienes una cuenta?</span>
                        <Link to={'/register'}>
                            <button className="btn flex" >Registrarse</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>¡Bienvenido!</h3>
                    </div>
                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <div className="inputDiv">
                            <label htmlFor="username">Usuario</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Ingresar usuario"
                                    value={loginUserName}
                                    onChange={(event) => setLoginUserName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Ingresar contraseña"
                                    value={loginPassword}
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn flex" onClick={loginUser} disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#fff" /> : (
                                <>
                                    <span>Inicio de sesión</span>
                                    <AiOutlineSwapRight className="icon" />
                                </>
                            )}
                        </button>
                        {/* <span className="forgotPassword">
                            ¿Olvidaste tu contraseña? <a href="#">Haz clic aquí</a>
                        </span> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
