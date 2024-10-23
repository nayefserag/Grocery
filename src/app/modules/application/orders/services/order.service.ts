import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Order } from 'src/app/modules/infrastructure/entites/order.entity';
import { OrderRepository } from 'src/app/modules/infrastructure/repositories/order/order.repositry';
import { CreateOrderDto } from '../model/order.dto';
import { RabbitMQPublisher } from 'src/app/rabbitMQ/rabbit-mq-publisher';
import { config } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly rabbitMQPublisher: RabbitMQPublisher,
  ) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items, totalPrice, status } = createOrderDto;

    try {
      const newOrder = await this.orderRepository.createOrder(
        customerId,
        items,
        totalPrice,
        status,
      );
      this.logger.log(`Order for customer ${customerId} created successfully`);
      this.rabbitMQPublisher.publishToQueue(
        { order: newOrder },
        { name: config.getString('ORDER_QUEUE') },
      );
      return newOrder;
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`);
      throw new BadRequestException('Failed to create order');
    }
  }

  // Get all orders
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  // Get an order by ID
  async getOrderById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      this.logger.warn(`Order with ID ${id} not found`);
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Get an order by any field (like customer ID)
  async getOrderByField(field: keyof Order, value: any): Promise<Order | null> {
    const order = await this.orderRepository.getOrderByField(field, value);
    if (!order) {
      this.logger.warn(`Order with ${field}: ${value} not found`);
      throw new NotFoundException(`Order with ${field}: ${value} not found`);
    }
    return order;
  }

  // Update an order
  async updateOrder(
    createOrderDto: Partial<CreateOrderDto>,
  ): Promise<Order | null> {
    const updatedOrder = await this.orderRepository.updateOrder(createOrderDto);

    if (!updatedOrder) {
      this.logger.warn(
        `Order with ID ${createOrderDto.id} not found for update`,
      );
      throw new NotFoundException(
        `Order with ID ${createOrderDto.id} not found`,
      );
    }

    this.logger.log(`Order with ID ${createOrderDto.id} updated successfully`);
    return updatedOrder;
  }

  // Delete an order
  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.deleteOrder(id);
    this.logger.log(`Order with ID ${id} deleted successfully`);
  }
}
