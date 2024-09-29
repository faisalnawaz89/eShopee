import React, { useEffect, useState } from 'react'
import './PopularItem.css'
import Item from '../Item/Item'
import { useSearchParams } from 'react-router-dom'

const PopularItem = () => {
  const [popularCategory, setPopularCategory] = useState([])

  useEffect(()=>{
     fetch('http://localhost:5000/popularcategory')
    .then((response)=> response.json())
    .then((data)=> setPopularCategory(data))
    .catch((error)=> console.log(error))
  },[])

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
