import { Order} from './order-entity.js';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>;
  getOne(id: string): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
}
