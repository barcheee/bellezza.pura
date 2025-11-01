import express from 'express';
import { connectDB } from './config/conection.js';

const app = express();

async function startServer() {
  // Primero conectar
  await connectDB();

  // Luego importar los routers (porque estos usan entidades que dependen de DB)
  const { FilteringRouter } = await import('./filtering/filtering-routes.js');
  const { ProductRouter } = await import('./product/product-routes.js');
  const { CartRouter } = await import('./cart/cart-routes.js');
  const { OrderRouter } = await import('./order/order-routes.js');

  app.use(express.json());

  const productRouter = new ProductRouter();
  const cartRouter = new CartRouter();
  const filteringRouter = new FilteringRouter();
  const orderRouter = new OrderRouter();

  app.use('/api/products', productRouter.router);
  app.use('/api/cart', cartRouter.router);
  app.use('/api/filtering', filteringRouter.router);
  app.use('/api/orders', orderRouter.router);

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
  });
}

startServer();
