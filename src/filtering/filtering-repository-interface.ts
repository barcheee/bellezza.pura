import { Collection, ObjectId } from 'mongodb';
import { IProduct } from './filtering-model.js';
import { getDb } from './filtering-mongodb-repository.js';

export class ProductRepository {
  private collection!: Collection<IProduct>;

  constructor() {
    this.collection = getDb().collection<IProduct>('products');
  }

  async getAll(): Promise<IProduct[]> {
    return this.collection.find({}).toArray();
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}

export { IProduct };
