import express from 'express';
import { filteringRoutes } from './filtering/filtering-routes.js';
import { productRouter } from './product/product-routes.js';

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
app.use ('/api/filtering', filteringRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
