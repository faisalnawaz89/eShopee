import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>
            <li><NavLink to="/addproduct">ADD PRODUCT</NavLink></li>
            <li><NavLink to="/listproduct">PRODUCT LIST</NavLink></li>
        </ul>
    </div>
  )
}

export default Sidebar