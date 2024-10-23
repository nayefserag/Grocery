import {
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status?: OrderStatus;
}
export class CreateOrderDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  customerId: string; // ID of the customer placing the order

  @IsArray()
  @IsNotEmpty({ each: true })
  items: Array<{ itemId: string; quantity: number }>; // Array of items with quantity

  @IsOptional()
  @IsNumber()
  totalPrice?: number; // Calculated total price of the order

  @IsOptional()
  @IsString()
  status?: OrderStatus; // e.g., 'pending', 'completed', 'shipped'
}
