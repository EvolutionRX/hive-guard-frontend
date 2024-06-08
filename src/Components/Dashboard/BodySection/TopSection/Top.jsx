import React from 'react'
import './top.css'
import { BiSearchAlt } from 'react-icons/bi'
import { TbMessageCircle } from 'react-icons/tb'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { BsArrowRightShort, BsQuestionCircle } from 'react-icons/bs'
import img2 from '../../../../Assets/bee-temporal.png'
import video from '../../../../Assets/video.mp4'

const Top = () => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Bienvenido a Hive Guard.</h1>
          <p>¡Hola, un gusto verte otra vez!</p>
        </div>

        

        <div className="adminDiv flex">
          
          <MdOutlineNotificationsNone className="icon" />
          
        </div>

      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Control de colmenas</h1>
        <p>Gestiona la información de tus abejas, temperatura, humedad y conteo.</p>

          <div className="buttons flex">
            <button className="btn">Hacer algo</button>
            
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>Abejas detectadas</h1>

              <div className="flex">
                <span>
                  Hoy <br /> <small>4 abejas</small>
                </span>
                <span>
                  Este mes <br /> <small>175 abejas</small>
                </span>
              </div>

              <span className="flex link">
                Ir a mis estadisticas <BsArrowRightShort className="icon" />
              </span>
            </div>

            <div className="imgDiv">
              <img src={img2} alt="Image Name" />
            </div>
            {/* We Shall use this card later */}
            <div className="sideBarCard">
              <BsQuestionCircle className="icon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>

                <h3>Centro de ayuda</h3>
                <p>Si tiene algún problema con Hive Guard, por favor contactese con nosotros para resolver sus preguntas.</p>
                <button className="btn">Ir al centro de ayuda</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Top