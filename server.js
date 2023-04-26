const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const connect = require('./mongodb.js');
const swaggerInit = require('./swagger/swaggerInit.js');

connect();

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
});

const app = express();
app.use(bodyParser.json());

swaggerInit(app);

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/product/:idToGet', async (req, res) => {
  try {
    const id = req.params.idToGet;
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/product', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/product/:idToUpdate', async (req, res) => {
  try {
    const { idToUpdate } = req.params;
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      idToUpdate,
      { name, price },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/product/:idToDelete', async (req, res) => {
  try {
    const { idToDelete } = req.params;
    await Product.findByIdAndDelete(idToDelete);
    res.sendStatus(204);
  } catch (err) {
    console.log(err.message);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
