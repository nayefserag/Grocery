import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/app/modules/application/orders/model/order.dto';
import { OrderService } from 'src/app/modules/application/orders/services/order.service';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { AuthServiceGuard } from 'src/app/shared/module/guards/jwt.guard';

@Controller('orders')
@UseGuards(AuthServiceGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create a new order
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(createOrderDto);
    return {
      message: 'Order created successfully',
      order: newOrder,
    };
  }

  // Get all orders
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  // Get a specific order by ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrderById(id);
    return order;
  }

  // Update the status of an order
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    const updatedOrder = await this.orderService.updateOrder({ id, status });
    return {
      message: 'Order status updated successfully',
      order: updatedOrder,
    };
  }

  // Delete an order by ID
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.deleteOrder(id);
    return {
      message: 'Order deleted successfully',
    };
  }
}
