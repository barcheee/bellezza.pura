import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
    if (db) return db; 

    const uri = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/';
    const dbName = process.env.MONGO_DB || 'test'; // Valor por defecto

    if (!uri) throw new Error("La URI de la base de datos no fue encontrada.");

    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);

        console.log(`Conectado exitosamente a la base de datos: ${dbName}`);
        return db;
    } catch (error) {
        console.error(" Error al conectar con la base de datos:", error);
        throw error;
    }
}

export function getDB(): Db {
    if (!db) throw new Error(" La base de datos no esta conectada. Llama a connectDB() primero.");
    return db;
}

export async function closeDB() {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log(" Conexion con la base de datos cerrada.");
    }
}
