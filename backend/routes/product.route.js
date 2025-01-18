import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.route('/')
  .get(getProducts)
  .post(createProduct);

productRouter.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

export default productRouter;