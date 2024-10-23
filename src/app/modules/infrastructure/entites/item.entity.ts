import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ required: true })
  category: string; 

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
