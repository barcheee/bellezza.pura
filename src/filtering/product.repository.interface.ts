import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../filtering/product.mongo.repository.js';
import { IProduct } from './product_model.js';

export class ProductRepository {
  private collection!: Collection<IProduct>;

  constructor() {
    this.collection = getDb().collection<IProduct>('products');
  }

  async findAll(): Promise<IProduct[]> {
    return this.collection.find({}).toArray();
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}

export { IProduct };
