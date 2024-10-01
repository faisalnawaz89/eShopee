import React, { useContext, useEffect, useState } from 'react'
import './PopularItem.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const PopularItem = () => {

  const {baseURL} = useContext(ShopContext)

  const [popularCategory, setPopularCategory] = useState([])

  useEffect(()=>{
     fetch(`${baseURL}popularcategory`)
    .then((response)=> response.json())
    .then((data)=> setPopularCategory(data))
    .catch((error)=> console.log(error))
  },[baseURL])

  return (
    <>
    <div className='container'>
        <h1>Popular in Women</h1>
        <div className='popular-item'>
        {popularCategory.map(ItemList => {
            const{id, image, name, new_price, old_price} = ItemList
            return <Item key={id} 
            productId={id}
            productImage={image}
            productName={name}
            productNewPrice={new_price}
            productOldPrice={old_price}
            />
        })}
        </div>
        </div>
    </>

  )
}

export default PopularItem
