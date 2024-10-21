// src/item/grocery-list.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../../entites/item.entity'; // Assuming the list is also represented by the Item schema

@Injectable()
export class ListRepository {
  private readonly logger = new Logger(ListRepository.name);

  constructor(
    @InjectModel(Item.name) private readonly listModel: Model<Item>,
  ) {
    this.logger.log('GroceryListRepository initialized');
  }

  // Create a new grocery list
  async createGroceryList(name: string, items: string[]): Promise<Item> {
    const newList = new this.listModel({
      name,
      items,
      isList: true, // Flag to differentiate between lists and items
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newList.save();
  }

  // Find all grocery lists
  async findAllGroceryLists(): Promise<Item[]> {
    return await this.listModel.find({ isList: true }).exec();
  }

  // Find a grocery list by ID
  async findGroceryListById(id: string): Promise<Item | null> {
    return await this.listModel.findById(id).exec();
  }

  // Update a grocery list by ID
  async updateGroceryList(id: string, name?: string, items?: string[]): Promise<Item | null> {
    const list = await this.findGroceryListById(id);
    if (!list) {
      this.logger.error(`Grocery list with ID ${id} not found`);
      return null;
    }

    if (name) list.name = name;
    // if (items) list.items = items;
    list.updatedAt = new Date();

    return await list.save();
  }

  // Delete a grocery list by ID
  async deleteGroceryList(id: string): Promise<void> {
    await this.listModel.findByIdAndDelete(id).exec();
    this.logger.log(`Grocery list with ID ${id} deleted`);
  }
}
