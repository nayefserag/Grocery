import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entites/item.entity';
import { ItemRepository } from './repositories/item/item.repository';
import { ListRepository } from './repositories/list/items-list.repositry';
import { ListItems, ListItemsSchema } from './entites/list.item.entity';
import { OrderRepository } from './repositories/order/order.repositry';
import { Order, OrderSchema } from './entites/order.entity';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: ListItems.name, schema: ListItemsSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
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
  providers: [ItemRepository, ListRepository, OrderRepository],
  exports: [ItemRepository, ListRepository, OrderRepository],
})
export class InfrastructureModule {}
