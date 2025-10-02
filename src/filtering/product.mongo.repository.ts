import { MongoClient, ObjectId } from "mongodb";
import { IProduct } from "./product.repository.interface";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const mongoClient = new MongoClient(uri);

await mongoClient.connect();
const db = mongoClient.db(process.env.MONGODB_DB ?? "belleza2");
const products = db.collection<IProduct>("products");

export class ProductRepository {
    private readonly collection = products;

async findAll(): Promise<IProduct[]> {
    return await this.collection.find({}).toArray();
}

async findById(id: string): Promise<IProduct | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
    }
}

export function getDb() {
    return db;
}

const repository = new ProductRepository();

export async function findAll() {
    return await repository.findAll();
}

export async function findById(id: string) {
    return await repository.findById(id);
}