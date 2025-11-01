import { Router } from 'express';
import { OrderController } from './order-controller.js';

export class OrderRouter {
    public readonly router = Router();
    constructor(){
        const controller = new OrderController();
        this.router.get('/', (req, res) => controller.getAllOrders(req, res));
    }
}
