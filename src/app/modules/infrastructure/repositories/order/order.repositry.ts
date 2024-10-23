import {
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
import { Order } from '../../entites/order.entity';
import { CreateOrderDto } from 'src/app/modules/application/orders/model/order.dto';
  
  @Injectable()
  export class OrderRepository {
    private readonly logger = new Logger(OrderRepository.name);
  
    constructor(
      @InjectModel(Order.name)
      private readonly orderModel: Model<Order>,
    ) {
      this.logger.log('OrderRepository initialized');
    }
  
    // Create a new order
    async createOrder(
      customerId: string,
      items: Array<{ itemId: string; quantity: number }>,
      totalPrice: number,
      status: string = 'pending',
    ): Promise<Order> {
      const newOrder = new this.orderModel({
        customerId,
        items,
        totalPrice,
        status,
      });
      return await newOrder.save();
    }
  
    // Find all orders
    async findAll(): Promise<Order[]> {
      return await this.orderModel.find().exec();
    }
  
    // Find order by ID
    async findById(id: string): Promise<Order | null> {
      return await this.orderModel.findById(id).exec();
    }
  
    // Find order by field (flexible for different searches)
    async getOrderByField(field: keyof Order, value: any): Promise<Order | null> {
      try {
        this.logger.log(`Fetching order by ${field}: ${value}`);
        const entity = await this.orderModel.findOne({ [field]: value }).exec();
  
        if (!entity) {
          this.logger.warn(`No order found with ${field}: ${value}`);
        } else {
          this.logger.log(`Order fetched successfully by ${field}: ${value}`);
        }
  
        return entity;
      } catch (error) {
        this.logger.error(`Error fetching order by ${field}: ${error.message}`);
        throw new InternalServerErrorException(`Failed to fetch order by ${field}`);
      }
    }
  
    // Update an existing order
    async updateOrder(
        createOrderDto : Partial<CreateOrderDto>
    ): Promise<Order | null> {
      const order = await this.findById(createOrderDto.id);
      if (!order) {
        this.logger.error(`Order with ID ${createOrderDto.id} not found`);
        return null;
      }
  
      if (createOrderDto.items) order.items = createOrderDto.items;
      if (createOrderDto.totalPrice) order.totalPrice = createOrderDto.totalPrice;
      if (createOrderDto.status) order.status = createOrderDto.status;
      order.updatedAt = new Date();
  
      return await order.save();
    }
  
    // Delete an order by ID
    async deleteOrder(id: string): Promise<void> {
      await this.orderModel.findByIdAndDelete(id).exec();
      this.logger.log(`Order with ID ${id} deleted`);
    }
  }
  