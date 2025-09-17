import { MongoClient, Db, Collection } from "mongodb";

const uri = process.env.MONGO_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;
let usersCollection: Collection;

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não definida");
}

if (process.env.ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

async function connectToDatabase() {
    const client = await clientPromise;
    db = client.db("Credenciais");
    usersCollection = db.collection("Credenciais");
    return { client, db, usersCollection };
}

export default clientPromise;
export { connectToDatabase, db, usersCollection };
