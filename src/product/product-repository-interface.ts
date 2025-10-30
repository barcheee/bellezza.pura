import { Product } from './product-entity.js';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getOne(id: string): Promise<Product | null>;
  update(id: string, data: Partial<Product>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
