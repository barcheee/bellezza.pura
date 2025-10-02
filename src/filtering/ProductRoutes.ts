import { Router } from 'express';
import { ProductController } from '../filtering/product.controller.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);

export default router;