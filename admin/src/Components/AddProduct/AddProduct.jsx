import React, { useState } from 'react'
import upload from '../../Assets/upload.png'

const AddProduct = () => {
    const baseURL = 'https://eshopeebackend.onrender.com';
    const [image, setImage] = useState(false)
    const [msg, setMsg] = useState('')
    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const AddNewProduct = async () => {

        let responseData
        let product = productDetails
        let formData = new FormData()
        formData.append('product',image)
        await fetch(`${baseURL}/upload`,{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((resp)=>resp.json())
          .then((data)=>{responseData = data})
       
        if(responseData.success){
            product.image = responseData.image_url
                await fetch(`${baseURL}/addproduct`,{
                method:'POST',
                headers:{
                    Accept:'application/json', 'Content-Type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json())
              .then((data)=>{
                data.success?setMsg('Product successfully uploaded!'):setMsg('Failed to upload product data')
            })
        }
    }

  return (
    <div className='editPanel addproduct'>
        <h1>Add Product</h1>
        <div className="formWrapper">
            <div className="forminput">
                <label htmlFor="productTitle">Tilte:</label>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Title...'/>
            </div>
            <div className="forminput grid-view">
                <span>
                    <label htmlFor="productPrice">Price:</label>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Price...'/>
                </span>
                <span>
                    <label htmlFor="productOfferPrice">Offer Price:</label>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Offer Price...'/>
                </span>
            </div>
            <div className="forminput">
                <label htmlFor="productCategory">Category:</label>
                <select value={productDetails.category} onChange={changeHandler} name="category">
                    <option value="" selected>- Select Category -</option>
                    <option value="Kid">Kid</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                </select>
            </div>
            <div className="forminput">
                <label htmlFor="productImage">
                    <img className="thumbnailImg" src={image?URL.createObjectURL(image):upload} alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="productImage" hidden />
            </div>
            <button onClick={()=>{AddNewProduct()}} className='submitBtn'>Add Product</button>
            {msg === ''?"":<h4 className='successMsg'>{msg}</h4>}
        </div>
    </div>
  )
}

export default AddProduct

