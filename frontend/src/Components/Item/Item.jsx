import React, { useContext } from 'react'
import './item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Item = (props) => {
  const {loading} = useContext(ShopContext)

  if (loading) {
    console.log(loading)
    return <div className='spinner-container'><div className="spinner"></div></div> 

  }else{

    return (
      <div className='product-item'>
          <Link to={`/product/${props.productId}`}>
            <img src={props.productImage} alt=''/>
          </Link>
          <div className='product-name'>{props.productName}</div>
          <div className='product-price'>
              <span className='new-prce'>₹{props.productNewPrice}</span>
              <span className='old-price'>₹{props.productOldPrice}</span>
          </div>
      </div>
    )

  }

  
}

export default Item