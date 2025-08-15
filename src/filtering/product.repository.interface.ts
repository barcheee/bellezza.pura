import { Collection, ObjectId } from 'mongodb';
import { getDB } from '../filtering/product.mongo.repository';
import { IProduct } from './product_model.js';

export class ProductRepository {
  private collection!: Collection<IProduct>;

  constructor() {
    this.collection = getDB().collection<IProduct>('products');
  }

  async findAll(): Promise<IProduct[]> {
    return this.collection.find({}).toArray();
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(productData: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>): Promise<IProduct> {
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IProduct;
    
    const result = await this.collection.insertOne(newProduct);
    return { ...newProduct, _id: result.insertedId };
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}