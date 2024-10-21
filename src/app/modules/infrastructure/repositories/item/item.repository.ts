// src/item/item.repository.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entites/item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemRepository {
  private readonly logger = new Logger(ItemRepository.name);

  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) {
    this.logger.log('ItemRepository initialized');
  }

  async createItem(
    name: string,
    description: string,
    price: number,
  ): Promise<Item> {
    const newItem = new this.itemModel({
      name,
      description,
      price,
    });
    return await newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }

  async findById(id: string): Promise<Item | null> {
    return await this.itemModel.findById(id).exec();
  }
  async getItemByFelid(field: keyof Item, value: any): Promise<Item | null> {
    try {
      this.logger.log(`Fetching Item by ${field}: ${value}`);
      const entity = await this.itemModel.findOne({
        where: { [field]: value },
      });

      if (!entity) {
        this.logger.warn(`No user Item with ${field}: ${value}`);
      } else {
        this.logger.log(`Item fetched successfully by ${field}: ${value}`);
      }

      return entity;
    } catch (error) {
      this.logger.error(`Error fetching Item by ${field}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to fetch Item by ${field}`,
      );
    }
  }

  async updateItem(
    id: string,
    name?: string,
    description?: string,
    price?: number,
  ): Promise<Item | null> {
    const item = await this.findById(id);
    if (!item) {
      this.logger.error(`Item with ID ${id} not found`);
      return null;
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (price) item.price = price;
    item.updatedAt = new Date();

    return await item.save();
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemModel.findByIdAndDelete(id).exec();
    this.logger.log(`Item with ID ${id} deleted`);
  }
  
}
