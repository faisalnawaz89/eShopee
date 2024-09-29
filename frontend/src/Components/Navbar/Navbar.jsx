import React, { useContext } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () =>{

    const {getTotalCartItem} = useContext(ShopContext)

    return(
        <>
            <div className="navbar">
                <div className="gridX3">
                    <div className="logoSrc">
                        <img src={logo} alt="Logo"/>
                        <p>Shopper</p>
                    </div>
                    <div className="menuItem">
                        <ul className="nav-menu">
                            <li><NavLink to="/">Shop</NavLink></li>
                            <li><NavLink to="/mens">Men</NavLink></li>
                            <li><NavLink to="/womens">Women</NavLink></li>
                            <li><NavLink to="/kids">Kids</NavLink></li>
                        </ul>
                    </div>
                    <div className="cartIcon">
                        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<button><Link to="/login">Login</Link></button>}
                        <Link to="/cart">
                            <img src={cart_icon} alt="cart icon"/>
                            <div className="cart-count-item">{getTotalCartItem()}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar