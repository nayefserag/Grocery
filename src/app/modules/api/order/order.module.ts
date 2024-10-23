import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { HttpModule } from '@nestjs/axios';
import { OrderController } from './controller/order.controller';
import { OrderService } from '../../application/orders/services/order.service';
import { RabbitMQModule } from 'src/app/rabbitMQ/rabbit-mq.module';

@Module({
  imports: [HttpModule, InfrastructureModule, RabbitMQModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
