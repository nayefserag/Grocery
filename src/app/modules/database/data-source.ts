// src/database/data-source.ts
import { Logger } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'src/app/shared/module/config-module/config.service';

const uri = `mongodb+srv://${config.getString('DATABASE_USERNAME')}:${config.getString('DATABASE_PASSWORD')}@${config.getString('DATABASE_HOST')}/?retryWrites=true&w=majority&appName=@${config.getString('DATABASE_APP_NAME')}/`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectMongoDB() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    Logger.verbose('Successfully connected to MongoDB.');
  } catch (error) {
    Logger.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error);
  }
}
