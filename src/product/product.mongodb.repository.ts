import { ProductRepository } from './product.repository.interface.js';
import { Product } from './product.entity.js';
import { Collection, ObjectId, MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/';//'mongodb://root:example@localhost:27017/';
const mongoClient = new MongoClient(uri);
const db = mongoClient.db(process.env.MONGO_DB);
const products = db.collection<Product>('products');

export class ProductMongoRepository implements ProductRepository {
  private collection!: Collection<Product>;

    constructor() {
        mongoClient.connect();
    }
  async create(product: Product): Promise<Product> {
    await this.collection.insertOne({ ...product });
    return product;
  }

  async getAll(): Promise<Product[]> {
    return await this.collection.find().toArray();
  }

  async getOne(id: string): Promise<Product | null> {
    return await this.collection.findOne({ _id: id });
  }

  async update(id: string, data: Partial<Product>): Promise<boolean> {
    const result = await this.collection.updateOne({ _id: id}, { $set: data });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
}
}
