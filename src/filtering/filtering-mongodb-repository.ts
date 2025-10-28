import { Filter, MongoClient, ObjectId } from "mongodb";
import { IProduct } from "./filtering-model.js";

const uri = process.env.MONGODB_URI || "mongodb://root:example@localhost:27017/?authSource=admin";
const mongoClient = new MongoClient(uri);

await mongoClient.connect();

let db = mongoClient.db(process.env.MONGODB_DB);
let products = db.collection<IProduct>('products');

export async function connectDb() {
    if (!products) {
        try {
            await mongoClient.connect();
            db = mongoClient.db(process.env.MONGODB_DB ?? "products");
            products = db.collection<IProduct>("products");
            console.log("Conexión a MongoDB inicializada exitosamente.");
        } catch (error) {
            console.error("Error al conectar a MongoDB:", error);
            throw error;
        }
    }
}

export class FilteringMongoRepository {
    public readonly collection = products;
    constructor() {
            mongoClient.connect();
    }

    async findAll(category?: string, description?: string): Promise<IProduct[]> {
        const filter: Filter<IProduct> = {};

        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }

        if (description) {
            filter.description = { $regex: new RegExp(description, 'i') };
        }
        
        return await this.collection.find(filter).toArray();
    }

    async findById(id: string): Promise<IProduct | null> {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
}

export function getDb() {
    if (!db) {
        throw new Error ("La base de datos no ha sido inicializada. Llama a connectDb() en app.ts");
    }
    return db;
}

const repository = new FilteringMongoRepository();

export async function findAll(category?: string, description?: string) {
    return await repository.findAll(category, description);
}

export async function findById(id: string) {
    return await repository.findById(id);
}