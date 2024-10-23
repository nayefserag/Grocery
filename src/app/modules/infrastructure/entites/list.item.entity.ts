import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ListItems extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] }) // Reference to the items collection
  items: Types.ObjectId[];

  @Prop({ default: true })
  isList: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ListItemsSchema = SchemaFactory.createForClass(ListItems);
