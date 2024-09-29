import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Item from '../Item/Item'

const NewCollection = () => {

  const [newCollection, setNewCollection] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/newcollections')
    .then((response)=> response.json())
    .then((data)=> setNewCollection(data))
    .catch((error)=> console.log(error))
  },[])

  return (
    <div className='container'>
        <div className='new-collection'>
            <h1>New Collection</h1>
            <div className='collection'>
                {newCollection.map((newList)=>{
                    const{id, image, name, new_price, old_price} = newList
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
    </div>
  )
}

export default NewCollection
