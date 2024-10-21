// src/database/db.module.ts
import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connectMongoDB, closeMongoDBConnection } from './data-source';

@Module({})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    // Connect to MongoDB when the module is initialized
    await connectMongoDB();
  }

  async onModuleDestroy() {
    // Close the MongoDB connection when the module is destroyed
    await closeMongoDBConnection();
  }
}
