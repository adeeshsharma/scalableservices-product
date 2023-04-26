const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const connect = require('./mongodb.js');

connect();

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
});

const app = express();
app.use(bodyParser.json());

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
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

app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err.message);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
