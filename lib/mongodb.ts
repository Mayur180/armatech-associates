import { MongoClient } from "mongodb"

const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 0,
  retryWrites: true,
  retryReads: true,
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("MONGODB_URI is not defined. Add it to your environment variables.")
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect()
    }

    return global._mongoClientPromise
  }

  return new MongoClient(uri, options).connect()
}
