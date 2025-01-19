import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`)
});