// src/database/db.module.ts
import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connectMongoDB, closeMongoDBConnection } from './data-source';

@Module({})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await connectMongoDB();
  }

  async onModuleDestroy() {
    await closeMongoDBConnection();
  }
}
