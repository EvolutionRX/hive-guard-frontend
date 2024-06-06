import React from 'react'
import './listing.css'
import { BsArrowRightShort } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import img from '../../../../Assets/colmena.png'

const Listing = () => {
  return (
    <div className="lisitingSection">
      <div className="heading flex">
        <h1>Mis colmenas</h1>
        <button className="btn flex">
          Mirar todas <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Master 1</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Master 2</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Master 3</h3>
        </div>

        
      </div>

    </div>
  )
}

export default Listing