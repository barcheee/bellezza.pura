
import { getOrderCollection } from './order-entity.js';
import { Order } from './order-entity.js';

export class OrderRepository {
  private collection = getOrderCollection();

  async create(order: Order): Promise<void> {
    const collection = getOrderCollection();
    await collection.insertOne(order);
  }

  async getAll(): Promise<Order[]> {
    return this.collection.find().toArray();
  }
}
