import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set");

const dbName = process.env.MONGODB_DB || "dpvl";

declare global {
  // cache mongo client across hot reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
  // @ts-ignore
  global._mongoClientPromise = clientPromise;
} else {
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
}

export async function connectToDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}