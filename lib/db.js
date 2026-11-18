import mongoose from "mongoose";

const cached =
  globalThis._mongoose ??
  (globalThis._mongoose = { connection: null, promise: null });

export async function dbConnect() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("DATABASE_URL is not configured");

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri);
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection.connection.db;
}

export async function getDb() {
  return dbConnect();
}
