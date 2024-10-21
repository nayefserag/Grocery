import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { HttpModule } from '@nestjs/axios';
import { ItemService } from '../../application/item/services/item.service';
import { ItemController } from './controller/item.controller';
import { ListService } from '../../application/item/services/list-items.service';

@Module({
  imports: [HttpModule ,InfrastructureModule],
  controllers: [ItemController],
  providers: [ItemService, ListService],
})
export class ItemModule {}
