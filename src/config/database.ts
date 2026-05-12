import { MongoClient, Db } from "mongodb";
import { env } from "./env";

let client: MongoClient;
let db: Db;

export const connectDB = async (): Promise<void> => {
    try {
        console.log('📡 Conectando a MongoDB...');
        console.log('🔗 URI:', env.mongoUri);
        console.log('📚 Database:', env.mongoDbName);
        
        if (!env.mongoUri) {
            throw new Error('MONGO_URI no está definida en .env');
        }
        
        client = new MongoClient(env.mongoUri);
        await client.connect();
        db = client.db(env.mongoDbName);
        console.log('✅ MongoDB conectado exitosamente!!!');
        
        // Crear colecciones si no existen
        await createCollectionsIfNotExist();
        
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
    }
}

const createCollectionsIfNotExist = async () => {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['specialties', 'patients', 'doctors', 'appointments'];
    
    for (const collectionName of requiredCollections) {
        if (!collectionNames.includes(collectionName)) {
            await db.createCollection(collectionName);
            console.log(`📁 Colección creada: ${collectionName}`);
        }
    }
}

export const getDb = (): Db => {
    if (!db) {
        throw new Error('La base de datos no ha sido inicializada');
    }
    return db;
}