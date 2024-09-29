import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for(let index = 0; index < 300+1; index++){
        cart[index] = 0
    }
    return cart
}

//Functional component page and context API
const ShopContextProvider = ({children}) => {

    const [all_product, setAllProduct] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('http://localhost:5000/allproducts')
        .then((response)=> response.json())
        .then((data)=> setAllProduct(data))
        .catch((error)=> console.log(error))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/getcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((response)=> response.json())
              .then((data)=> setCartItems(data))
              .catch((error)=> console.log(error))
        }

    },[])
    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=> response.json())
            .then((data)=> console.log(data))
        }
    }

    const removeToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/removecart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=> response.json())
            .then((data)=> console.log(data))
            .catch((error)=> console.log(error))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.log(`Product with id ${item} not found.`);
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItem = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItem, getTotalCartAmount, all_product, cartItems, addToCart, removeToCart}
    return(
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider