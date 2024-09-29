const port = 5000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');


app.use(express.json())
app.use(cors())

// Database connetion with mongodb
mongoose.connect('mongodb+srv://isfaisalnawaz:faisal8919@cluster0.1854h.mongodb.net/eCommerce')

//API Creation
app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on ${port}`)
    }else{
        console.log(`Error: ${error}`)
    }
})

app.get('/',(req,res)=>{
    res.send(`Express App is Running!`)
})

//Image Stroge Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating Products
const Product = mongoose.model('Product',{
    id:{
        type: Number,
        requried: true   
    },
    name:{
        type: String,
        requried: true 
    },
    image:{
        type:String,
        requried:true
    },
    category:{
        type:String,
        requried:true
    },
    new_price:{
        type:Number,
        requried:true
    },
    old_price:{
        type:Number,
        requried:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    },
})

app.post('/addproduct', async (req,res) => {
    let products = await Product.find({})
    let id
    if(products.length>0){
        let lastProductArray = products.slice(-1)
        let lastProduct = lastProductArray[0]
        id = lastProduct.id + 1
    }else{
        id = 1
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product)
    await product.save()
    console.log('Saved')
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for getting all products
app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({})
    console.log('All Products fetched from Mongo DB')
    res.send(products)
})

//Schema for deleting product from mongoDb
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log('Removed')
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for Edit product
app.put('/editproduct/:id', async(req,res)=>{
    const productId = req.params.id
    const updateData = {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        available: req.body.available
    }
    const updateProduct = await Product.findOneAndUpdate(
        {id: productId}, updateData, {new: true}
    )
    if(updateProduct){
        console.log('Product updated', updateProduct)
        res.json({
            success:true,
            message: 'Product updated successfully',
            product: updateProduct
        })
    }else{
        res.status(404).json({
            success: false,
            message: 'Product not Found'
        })
    }
})

//API creation for new collections
app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({})
    let newCollection = products.slice(1).slice(-8)
    console.log('New Collection Fetched')
    res.send(newCollection)
})

//API creation for popular category in women
app.get('/popularcategory', async (req,res)=>{
    let products = await Product.find({category:'Women'})
    let popularCategory = products.slice(0,4)
    console.log("Popular Category Fetched")
    res.send(popularCategory)
})

//API for user creations
const Users = mongoose.model('User',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//Creating endpoint for registering the user
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({
            success:false,
            errors:"Existing user found with same email id"
        })
    }
    let cart = {}
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    await user.save()
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})

})

//Creating middleware to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }else{
        try {
            const data = jwt.verify(token,'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a  valid token"})
        }
    }
}

//Creating endpoint for store product cartdata
app.post('/addtocart', fetchUser, async (req,res)=>{
    console.log("stored", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("UserData Added")
})

//Creating endpoint to remove cartdata from userdata
app.post('/removecart', fetchUser, async (req,res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed cart item from user")
})

//Creating endpoint for store cart data to user data
app.post('/getcart', fetchUser, async (req,res)=> {
    console.log('Get cart data from user data')
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

//Creating endpoint for user login
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom') 
            res.json({success:true,token})
        }else{
            res.json({
                success:false,
                errors:'You have entered wrong password!'
            })
        }
    }else{
        res.json({
            success:false,
            errors:'Email ID: you have entered not found!'
        })
    }
})

//Completed Backend Work!
