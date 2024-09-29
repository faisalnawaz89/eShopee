import React from 'react'
import './RelatedProduct.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const RelatedProduct = () => {
  return (
    <div className='realted-product'>
        <div className='container'>
            <h2>Related Products</h2>
            <div className="related-product-item">
                {data_product.map((item,i)=>{
                    return <Item key={i} 
                        productId={item.id}
                        productImage={item.image}
                        productName={item.name}
                        productNewPrice={item.new_price}
                        productOldPrice={item.old_price}
                    />
                })}
            </div>
        </div>
    </div>
  )
}

export default RelatedProduct
