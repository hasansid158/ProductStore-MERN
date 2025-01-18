import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`)
});