import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false,
  },
}, {
  timestamps: true //adds fields - createdAt and updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;