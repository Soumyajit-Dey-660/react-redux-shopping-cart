const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortId = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Product = mongoose.model('products', {
    _id: {type: String, default: shortId.generate },
    title: String,
    description: String,
    price: Number,
    image: String,
    availableSizes: [String]
})

app.get('/api/products', async (req, res) => {
    try {
        const productsData = await Product.find({});
        res.status(200).send({
            error: false,
            message: 'Success',
            data: productsData
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            error: true,
            message: error.message,
            data: []
        })
    }
})

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product)
        if (product === null) {
            res.status(200).send({
                error: false,
                message: `No data found with id ${req.params.id}`,
                data: {}
            })
        } else{
            res.status(200).send({
                error: false,
                message: 'Success',
                data: product
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            error: true,
            message: error.message,
            data: []
        })
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        console.log('saved product ', savedProduct);
        res.status(200).send({
            error: false,
            message: 'Success',
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
})

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        console.log('Delete product ', deleteProduct);
        res.status(200).send({
            error: false,
            message: 'Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: true,
            message: error.message,
        })
    }
})

const Order = mongoose.model('order', new mongoose.Schema({
    _id: { type: String, default: shortId.generate},
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }]
    }, {
        timestamps: true
    }
));

app.post('/api/orders', async (req, res) => {
    try {
        const { name, email, address, total, cartItems } = req.body;
        console.log('email ',email);
        if (!name || !email || !address || !total || !cartItems) {
            res.status(201).send({error: true, message: 'Please fill in all required fields'})
        }
        const order = await Order(req.body).save();
        res.status(200).send({ error: false, message: 'Order saved to database successfully', order: order })
    } catch(error) {
        res.status(500).send({error: true, message: 'Some unexpected error occured'})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>  console.log('Server started at port 5000'));