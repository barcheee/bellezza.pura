import crypto from 'node:crypto';
import { getDB } from '../config/conection.js';
import { Product } from '../product/product-entity.js';

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export class Order {
  constructor(
    public items: OrderItem[],
    public total: number,
    public date: Date = new Date(),
    public _id: string = crypto.randomUUID()
  ) {}
}

export function getOrderCollection() {
  const db = getDB();
  return db.collection<Order>('orders');
}
