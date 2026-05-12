"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const env_1 = require("./env");
let client;
let db;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('📡 Conectando a MongoDB...');
        console.log('🔗 URI:', env_1.env.mongoUri);
        console.log('📚 Database:', env_1.env.mongoDbName);
        if (!env_1.env.mongoUri) {
            throw new Error('MONGO_URI no está definida en .env');
        }
        client = new mongodb_1.MongoClient(env_1.env.mongoUri);
        yield client.connect();
        db = client.db(env_1.env.mongoDbName);
        console.log('✅ MongoDB conectado exitosamente!!!');
        // Crear colecciones si no existen
        yield createCollectionsIfNotExist();
    }
    catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
    }
});
exports.connectDB = connectDB;
const createCollectionsIfNotExist = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    const requiredCollections = ['specialties', 'patients', 'doctors', 'appointments'];
    for (const collectionName of requiredCollections) {
        if (!collectionNames.includes(collectionName)) {
            yield db.createCollection(collectionName);
            console.log(`📁 Colección creada: ${collectionName}`);
        }
    }
});
const getDb = () => {
    if (!db) {
        throw new Error('La base de datos no ha sido inicializada');
    }
    return db;
};
exports.getDb = getDb;
