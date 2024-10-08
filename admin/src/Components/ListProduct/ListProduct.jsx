import React, { useEffect, useState } from 'react'

const ListProduct = () => {
    const baseURL = 'https://eshopeebackend.onrender.com';
    const [allProducts, setAllproducts] = useState([])
    const fetchInfo = async () => {
        await fetch(`${baseURL}/allproducts`)
        .then((resp)=>resp.json())
        .then((data)=>{setAllproducts(data)})
        .catch((error)=>{alert(error)})
    }

    useEffect(()=>{
        fetchInfo()
    },[])

    const removeProduct = async (id) => {
            await fetch(`${baseURL}/removeproduct`,{
            method: 'POST',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo()
    }
    
  return (
    <div className='editPanel listproduct'>
        <div className="cart-item">
            <table id="customers">
               
                <tr>    
                    <th>No.</th>
                    <th width="60">Product</th>
                    <th width="600">Title</th>
                    <th>Old Price</th>
                    <th>New Price</th>
                    <th>Category</th>
                    <th>Remove</th>
                </tr>
                {allProducts.map((product,index)=>{
                    return <>
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td><img src={product.image} alt={product.name} /></td>
                            <td>{product.name}</td>
                            <td>₹{product.old_price}</td>
                            <td>₹{product.new_price}</td>
                            <td>{product.category}</td>
                            <td style={{cursor:'pointer'}}onClick={()=>{removeProduct(product.id)}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash-2"
                                    >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                </svg>
                            </td>
                        </tr>
                    </>
                })
                }
            </table>
            {allProducts.length > 0 ? <h3 className='nop'>Total Product: {allProducts.length}</h3>: <h3 className='nop'>No Product Found!</h3>}
        </div>
    </div>
  )
}

export default ListProduct