import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {

const {getTotalCartAmount, all_product, cartItems, removeToCart} = useContext(ShopContext)
console.log(getTotalCartAmount())
  return (
    <div className='container'>
        <div className='cart-item'>
            <table id="customers">
                <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
            {all_product.map((e,i)=>{
                if(cartItems[e.id] > 0 ){
                   
                    return <tr key={i}>
                        <td><img src={e.image} className="product-image" alt="" /></td>
                        <td>{e.name}</td>
                        <td>₹{e.new_price}</td>
                        <td>
                            <button className='cartItem-quantity'>
                                {cartItems[e.id]}
                            </button>
                        </td>
                        <td>₹{e.new_price * cartItems[e.id]}</td>
                        <td><img src={remove_icon} onClick={()=>{removeToCart(e.id)}} alt="" /></td>
                    </tr>
                
                }
                return null
            })}
            </table> 
            <div className="billing-section">
                <div className="shopingBill">
                    <h3>Your Bill:</h3>
                    <h4 className='billTitle'><span>Subtotal:</span> <span>₹{getTotalCartAmount()}</span></h4>
                    <h4 className='billTitle'><span>Shipping:</span> <span>Free</span></h4>
                    <h2 className='billTitle'><span>Total Bill:</span> <span>₹{getTotalCartAmount()}</span></h2>
                </div>
                <div className="promotionalCode">
                    <p>If you have a promo code, enter here</p>
                    <form action="#">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems