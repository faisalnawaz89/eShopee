import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrums = (props) => {

    const {product} = props;

  return (
    <div className='breadcrum'>
        <span>Home</span> 
        <img src={arrow_icon} alt="" /> 
        <span>Shop</span>
        <img src={arrow_icon} alt="" /> 
        <span>{product.category}</span>
        <img src={arrow_icon} alt="" />
        <span>{product.name}</span>
    </div>
  )
}

export default Breadcrums
