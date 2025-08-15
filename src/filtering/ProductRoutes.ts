import { Router } from 'express';
import { ProductController } from '../filtering/product.controller.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);

export default router;