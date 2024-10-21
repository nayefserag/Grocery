import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entites/item.entity';
import { ItemRepository } from './repositories/item/item.repository';
import { ListRepository } from './repositories/list/items-list.repositry';
import { ApiModule } from '../api/api.module';
import { ApplicationModule } from '../application/application.module';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({
          filename: 'combined.log',
          level: 'info',
        }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
        new winston.transports.Console({}),
      ],
    }),
  ],
  controllers: [],
  providers: [ItemRepository,ListRepository],
  exports: [ItemRepository,ListRepository],
})
export class InfrastructureModule {}
