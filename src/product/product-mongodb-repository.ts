import { ProductRepository } from './product-repository-interface.js';
import { Product } from './product-entity.js';
import { Collection} from 'mongodb';
import { getProductCollection } from './product-entity.js';

export class ProductMongoRepository implements ProductRepository {
  private products: Collection<Product>;

  constructor() {
    
    this.products = getProductCollection();
  }

  async create(product: Product): Promise<Product> {
    await this.products.insertOne({ ...product });
    return product;
  }

  async getAll(): Promise<Product[]> {
    return await this.products.find().toArray();
  }

  async getOne(id: string): Promise<Product | null> {
    return await this.products.findOne({ _id: id });
  }

  async update(id: string, data: Partial<Product>): Promise<boolean> {
    const result = await this.products.updateOne({ _id: id}, { $set: data });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.products.deleteOne({ _id: id });
    return result.deletedCount > 0;
}
}
