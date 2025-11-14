import { Router } from 'express';
import { OrderController } from './order-controller.js';
import { RequestHandler } from 'express';


export class OrderRouter {
  public readonly router : Router;

  constructor() {
    this.router = Router();
    const controller = new OrderController();

    const create:RequestHandler = (req, res) => { void controller.create(req, res); };
    this.router.get('/all', (req, res) => controller.getAllOrders(req, res));
    this.router.post('/create', create);
    this.router.delete('/delete/:id', (req, res) => controller.remove(req, res));
  }
}
