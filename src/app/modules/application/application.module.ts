import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { RabbitMQModule } from 'src/app/rabbitMQ/rabbit-mq.module';
@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [RabbitMQModule],
  exports: [],
})
export class ApplicationModule {}
