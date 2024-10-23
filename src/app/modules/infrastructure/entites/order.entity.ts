import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: string; // Reference to the Customer

  @Prop({ type: [{ itemId: { type: Types.ObjectId, ref: 'Item' }, quantity: Number }] })
  items: Array<{ itemId: string; quantity: number }>; // List of items and their quantities

  @Prop({ required: true })
  totalPrice: number; // Calculated total price

  @Prop({ default: 'pending' })
  status: string; // Order status, e.g., 'pending', 'completed', 'shipped'

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
