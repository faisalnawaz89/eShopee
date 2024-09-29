import React, { useContext } from 'react'
import './ProductDetail.css'
import rating_start from '../Assets/star_icon.png'
import ratting_star_fade from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDetail = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext)

  return (
   
        <div className='product-detials'>
            <div className="product-container">
                <div className="product-image-block">
                    <div className="product-image-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="product-main-image">
                        <img src={product.image} alt="" />
                    </div>
                </div>
                <div className="product-info-block">
                    <div className="product-name"><h2>{product.name}</h2></div>
                    <div className="product-rating">
                        <img src={rating_start} alt="" />
                        <img src={rating_start} alt="" />
                        <img src={rating_start} alt="" />
                        <img src={rating_start} alt="" />
                        <img src={ratting_star_fade} alt="" />
                        <span> 3069</span>
                    </div>
                    <div className="product-prices">
                        <div className="product-NewPrice"><h2><span>₹</span>{product.new_price}</h2></div>
                        <div className="product-OldPrice"><h3><span>₹</span>{product.old_price}</h3></div>
                    </div>
                    <div className="product-description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pulvinar posuere. Vivamus scelerisque non metus vitae varius. Integer elementum tincidunt massa.</p>
                    </div>
                    <div className="product-sizes">
                        <h3>Select Size:</h3>
                        <ul>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                            <li>XXL</li>
                        </ul>
                    </div>
                    <div className="addToCart">
                        <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
                    </div>
                    <div className="product-category">
                        <p><span>Category:</span> <code>Women</code> <code>T-Shirt</code> <code>Crop Top</code></p>
                    </div>
                    <div className="product-tag">
                        <p><span>Tags:</span> <code>Modern</code> <code>Latest</code> <code>Formal</code> <code>Casual</code> </p>
                    </div>
                </div>
            </div>
        </div>
    
  )
}

export default ProductDetail


