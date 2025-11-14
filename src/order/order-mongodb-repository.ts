
import { getOrderCollection } from './order-entity.js';
import { Order } from './order-entity.js';
import { Collection} from 'mongodb';
import { OrderRepository} from './order-repository-interface.js';

export class OrderMongoRepository implements OrderRepository {

  private orders: Collection<Order>;

  constructor() {
    this.orders = getOrderCollection();
  }

  async create(order: Order): Promise<Order> {
    await this.orders.insertOne({ ...order });
    return order;

  }

  async getAll(): Promise<Order[]> {
    return await this.orders.find().toArray();
  }
  async getOne(id: string): Promise<Order | null> {
    return await this.orders.findOne({ _id: id });
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.orders.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}


