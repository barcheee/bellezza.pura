import crypto from 'node:crypto'
import { getDB } from '../config/conection.js';
// agregue image con el signo de ? para que no sea obligatorio y tengamos que cambiar todo el codigo 
export class Product {
      constructor(
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public stock: number,
        public image?: string,
        public _id: string = crypto.randomUUID()
      ) {}
}

export function getProductCollection() {
  const db = getDB();
  return db.collection<Product>('products');
}
