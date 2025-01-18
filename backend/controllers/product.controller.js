import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = (req, res) => {
  Product.find({})
    .then(data => {
      res.status(200).json({ success: true, data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false, message: 'Server error' });
    })
};

export const createProduct = (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'requiredFieldsMissing' });
  }

  const newProduct = new Product({
    name,
    price,
    image: image || ''
  });

  newProduct.save()
    .then(() => {
      res.status(201).json({ success: true, data: newProduct });
    })
    .catch(err => {
      console.log('Error in creating product', err.message);
      res.status(500).json({ success: false, message: 'serverErr' });
    });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: 'Invalid id' });
  }

  Product.findByIdAndUpdate(id, updateBody, { new: true })
    .then(updatedProduct => {
      res.status(200).json({ success: true, data: updatedProduct });
    })
    .catch(() => {
      res.status(500).json({ success: false, message: 'Server error' });
    });
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: 'Invalid id' });
  }

  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ success: true, message: 'Product deleted' });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Server error' });
    })
}