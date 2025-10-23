import { Router } from "express";
import { ProductController } from './product.controller.js';

export const productRouter = Router();
const productController = new ProductController();

// Rutas del carrito
//productRouter.post('/cart/add', productController.addToCart.bind(productController));
//productRouter.post('/cart/remove', productController.removeFromCart.bind(productController));
productRouter.get('/cart/products', productController.getCartProducts.bind(productController));
productRouter.get('/cart/total', productController.getCartTotal.bind(productController));
productRouter.post('/cart/checkout', productController.checkoutCart.bind(productController));

function sanitizeProductInput(req: any, res: any, next: any) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

