const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });
  await newProduct.save();
  res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, price },
    { new: true }
  );
  res.json(updatedProduct);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).send();
};
