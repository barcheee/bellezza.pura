import { Router } from 'express';
import { ProductController } from './product-controller.js';


export class ProductRouter {
    public readonly router = Router();
    constructor(){
    const controller = new ProductController();

    this.router.post('/create', controller.create);
    this.router.get('/getAll', controller.getAll);
    this.router.get('/:id', controller.getOne);
    this.router.put('/:id', controller.modify);
    this.router.delete('/:id', controller.remove);
    }
}

