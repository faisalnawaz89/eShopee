import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {

  const {all_product} = useContext(ShopContext)


  return (
    <>
        <div className='shop-category'>
            <div className='category-banner'>{props.category.toUpperCase()}</div>
        </div>
        <div className='container'>
            <div className="shop-category">
                <div className="shopCategory-IndexSort">
                    <h4><span>Showing 1-12</span> out of 36 Products</h4>
                    <div className="shopCategory-sort">
                        Sort by <img src={dropdown_icon} alt="" />
                    </div>
                </div>
                <div className="shopCategory-products">
                    {all_product.map((item,i)=>{
                        if(props.category === item.category){
                            return <Item key={i} 
                            productId={item.id}
                            productImage={item.image}
                            productName={item.name}
                            productNewPrice={item.new_price}
                            productOldPrice={item.old_price}
                            />
                        }else{
                            return null
                        }
                    })}
                </div>
                <div className="loadmore">
                    <button>Explore more</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShopCategory
