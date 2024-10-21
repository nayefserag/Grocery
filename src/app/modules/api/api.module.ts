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

@Module({
  imports: [
    ItemModule,
    DatabaseModule,
    HttpModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService, ListService, ItemRepository, ListRepository],
  exports: [],
})
export class ApiModule {}
