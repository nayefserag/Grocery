import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { ConfigService } from '@nestjs/config';
import { ItemService } from './item/services/item.service';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
