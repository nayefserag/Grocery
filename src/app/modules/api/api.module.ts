import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HttpModule } from '@nestjs/axios';
import { ItemService } from '../application/item/services/item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../infrastructure/entites/item.entity';
import { ItemController } from './item/controller/item.controller';
import { ListService } from '../application/item/services/list-items.service';
import { ListRepository } from '../infrastructure/repositories/list/items-list.repositry';
import { ItemRepository } from '../infrastructure/repositories/item/item.repository';
import { ItemModule } from './item/item.module';
import {
  ListItems,
  ListItemsSchema,
} from '../infrastructure/entites/list.item.entity';
import { OrderController } from './order/controller/order.controller';
import { OrderService } from '../application/orders/services/order.service';
import { OrderRepository } from '../infrastructure/repositories/order/order.repositry';
import { OrderModule } from './order/order.module';
import { Order, OrderSchema } from '../infrastructure/entites/order.entity';
import { RabbitMQModule } from 'src/app/rabbitMQ/rabbit-mq.module';

@Module({
  imports: [
    ItemModule,
    OrderModule,
    DatabaseModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: ListItems.name, schema: ListItemsSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    RabbitMQModule,
  ],
  controllers: [ItemController, OrderController],
  providers: [
    ItemService,
    ListService,
    ItemRepository,
    ListRepository,
    OrderService,
    OrderRepository,
  ],
  exports: [],
})
export class ApiModule {}
