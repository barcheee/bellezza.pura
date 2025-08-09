//cambiar a product.repository.interface.ts
import { Collection, ObjectId } from 'mongodb';
//import { getDB } from '../Database/database'; //repo mongo
import { IProduct } from '../filtering/product_model.js';

export class ProductRepository {
  private !collection: Collection<IProduct>;

  constructor() {
    // Al instanciar el repositorio, obtenemos la colección de 'products'
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