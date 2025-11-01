import { Request, Response } from 'express';
import { OrderRepository } from './order-repository.js';

const orderRepo = new OrderRepository();

export class OrderController {


  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderRepo.getAll();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
  }
}
