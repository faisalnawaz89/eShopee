import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  const {loading} = useContext(ShopContext)

  if (loading) {
    return <div className="spinner"></div>
  }

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

export default Item