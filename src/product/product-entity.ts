import crypto from 'node:crypto'
import { getDB } from '../config/conection.js';

export class Product {
      constructor(
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public stock: number,
        public _id: string = crypto.randomUUID()
      ) {}
}

export function getProductCollection() {
  const db = getDB();
  return db.collection<Product>('products');
}
