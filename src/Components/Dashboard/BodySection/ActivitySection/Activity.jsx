import React from 'react'
import './activity.css'
import { BsArrowRightShort } from 'react-icons/bs'
import user from '../../../../Assets/logo.png'


const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Actividad reciente</h1>
        <button className="btn flex">
          Mirar todas
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        <div className="singleCustomer flex">
          <img src={user} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Temperatura</span>
            <small>Subió la temperatura por encima de 40°</small>
          </div>
          <div className="duration">
            Hace 2 minutos
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={user} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Humedad</span>
            <small>El último registro de humedad fue del 60%</small>
          </div>
          <div className="duration">
            Hace 5 minutos
          </div>
        </div>

       

       
      </div>
    </div>
  )
}

export default Activity