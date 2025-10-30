import { Router } from 'express';
import { ProductController } from './product-controller.js';

export const productRouter = Router();
const controller = new ProductController();

productRouter.post('/create', controller.create);
productRouter.get('/getAll', controller.getAll);
productRouter.get('/:id', controller.getOne);
productRouter.put('/:id', controller.modify);
productRouter.delete('/:id', controller.remove);



