import React from 'react'
import './sidebar.css'
import logo from '../../../Assets/logo.png'
import { IoMdSpeedometer } from 'react-icons/io'
import { MdDeliveryDining, MdOutlineExplore, MdOutlinePermContactCalendar } from 'react-icons/md'
import { BsTrophy, BsCreditCard2Front, BsQuestionCircle } from 'react-icons/bs'
import { AiOutlinePieChart } from 'react-icons/ai'
import { BiTrendingUp, BiLogOutCircle } from 'react-icons/bi'
import {BrowserRouter,Link} from 'react-router-dom';

const toPage = page => () =>{
  setPage(page)
}

const Sidebar = () => {
  return (
    
    <div className='sideBar grid'>

      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>Hive Guard.</h2>
      </div>

      { <div className="menuDiv">
        <h3 className="divTitle">
          Menu principal
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <Link to="/dashboard" onClick={toPage('dashboard')} className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">
                Inicio
              </span>
            </Link>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlineExplore className="icon" />
              <span className="smallText">
                Explorar
              </span>
            </a>
          </li>

        </ul>
      </div> }


      <div className="settingsDiv">
        <h3 className="divTitle">
          Configuración
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <Link to="/graficos" onClick={toPage('graficos')} className="menuLink flex">
              <AiOutlinePieChart className="icon" />
              <span className="smallText">
                Gráficos
              </span>
            </Link>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BiTrendingUp className="icon" />
              <span className="smallText">
                Sensores
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlinePermContactCalendar className="icon" />
              <span className="smallText">
                Contacto
              </span>
            </a>
          </li>

        

          <li className="listItem">
            <a href="/" className="menuLink flex">
              <BiLogOutCircle className="icon" />
              <span className="smallText">
                Cerrar sesión
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Centro de ayuda</h3>
          <p>Si tienes algún problema en página, por favor contactese con nosotros.</p>
          <button className="btn">Ir al Centro de ayuda.</button>
        </div>
      </div>
    </div>
   
  )
}

export default Sidebar