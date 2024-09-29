import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDetail from '../Components/ProductDetail/ProductDetail'
import Description from '../Components/DescriptionBox/Description'
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct'

const Product = () => {

  const{all_product} = useContext(ShopContext)
  const {productId} = useParams();      
  const product = all_product.find((e)=> e.id === Number(productId))
  return (
  <div class="container">
    <div className='product-detail'>
        <Breadcrums product={product} />
        <ProductDetail product={product} />
        <Description />
        <RelatedProduct/>
    </div>
  </div>
  )
}

 
export default Product

