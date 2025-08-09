import { Router } from 'express';
import { ProductController } from '../Controllers/product.controller';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);

export default router;