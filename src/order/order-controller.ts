import { Request, Response } from 'express';
import { OrderMongoRepository } from './order-mongodb-repository.js';
import { OrderItem,Order } from './order-entity.js';

const orderRepository = new OrderMongoRepository();

export class OrderController {

 async create(req: Request, res: Response) {
    try {
      const { items} = req.body;
      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Items are required" });
      }
      const processedItems: OrderItem[] = items.map((item: any) => ({
        product: item.product,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      }));

      const total = processedItems.reduce((acc, item) => acc + item.subtotal, 0);
      const order = new Order(
        processedItems, 
        total
      );
      const result = await orderRepository.create(order);
      return res.status(201).json(result);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderRepository.getAll();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
  }
    async remove(req: Request, res: Response) {
      const success = await orderRepository.delete(req.params.id);
      success ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'No se pudo eliminar'});
  }
}
