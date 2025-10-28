import { ObjectId } from 'mongodb';

export interface IProduct {
  _id?: ObjectId;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}