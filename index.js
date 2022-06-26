const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const path = require('path');

//model schema
const Product = require('./models/product');

//my database connection
mongoose.connect('mongodb://localhost:27017/myalx', {useNewUrlParser: true})
.then(() => {
    console.log("CONNECTION OPEN!")
})
.catch(err => {
    console.log("OH NO ERROR!!!")
    console.log(err)
})



// my views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

// my routes

// Routes for getting all products

app.get('/products', async(req, res) => {
const products = await Product.find({})
    res.render('products/index', { products });
})

// A route for adding new products

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

// Route for posting the product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
    
})

// Route for getting with product special ID

app.get('/products/:id', async(req, res) => {
const {id} = req.params;
const product = await Product.findById(id)
res.render('products/show', {product});
})



//my server
app.listen(3000, () => {
    console.log("Server running on port 3000");
})