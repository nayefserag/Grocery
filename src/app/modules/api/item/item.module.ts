import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { NotificationCommunicator } from '../../infrastructure/communicator/notification.communicator';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { HttpModule } from '@nestjs/axios';
import { NotificationCommunicatorModule } from '../../infrastructure/communicator/communicator.module';
import { ItemService } from '../../application/item/services/item.service';
import { ItemRepository } from '../../infrastructure/repositories/item/item.repository';
import { ListRepository } from '../../infrastructure/repositories/list/items-list.repositry';
import { ItemController } from './controller/item.controller';
import { ListService } from '../../application/item/services/list-items.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [HttpModule ,InfrastructureModule],
  controllers: [ItemController],
  providers: [ItemService, ListService],
})
export class ItemModule {}
