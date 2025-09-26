import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const mongoClient = new MongoClient(uri);

await mongoClient.connect()

export let db = mongoClient.db(process.env.MONGODB_DB || 'mydatabase')

export async function createProduct (product: any) {
    const result = await db.collection('products').insertOne(product);
    return result.insertedId;
}
export async function findAll() {
    return await db.collection('products').find().toArray();
}
export async function findById(id: string) {
    return await db.collection('products').findOne({ _id: new ObjectId(id) });
}
export function getDB (){
    return db;
}