import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ListItems } from '../../entites/list.item.entity';
import { CreateListDto } from 'src/app/modules/application/item/model/list.dto';

@Injectable()
export class ListRepository {
  private readonly logger = new Logger(ListRepository.name);

  constructor(
    @InjectModel(ListItems.name) private readonly listModel: Model<ListItems>,
  ) {}

  // Create a new grocery list
  async createGroceryList(createListDto: CreateListDto): Promise<ListItems> {
    const { name, items } = createListDto;

    // Convert the array of item ObjectId strings to actual ObjectIds
    const itemObjectIds = items.map(itemId => new Types.ObjectId(itemId));

    const newList = new this.listModel({
      name,
      items: itemObjectIds, // Assign the ObjectIds
      isList: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await newList.save();
  }

  // Find all grocery lists
  async findAllGroceryLists(): Promise<ListItems[]> {
    return await this.listModel
      .find({ isList: true })
      .populate('items') // Populate item details from the Item collection
      .exec();
  }

  // Find a grocery list by ID
  async findGroceryListById(id: string): Promise<ListItems | null> {
    return await this.listModel
      .findById(id)
      .populate('items')
      .exec();
  }

  // Update a grocery list by ID
  async updateGroceryList(
    id: string,
    name?: string,
    items?: string[],
  ): Promise<ListItems | null> {
    const list = await this.findGroceryListById(id);
    if (!list) {
      this.logger.error(`Grocery list with ID ${id} not found`);
      return null;
    }

    if (name) list.name = name;

    if (items) {
      // Convert the array of item ObjectId strings to actual ObjectIds
      const itemObjectIds = items.map(itemId => new Types.ObjectId(itemId));
      list.items = itemObjectIds; // Update items
    }

    list.updatedAt = new Date();
    return await list.save();
  }

  // Delete a grocery list by ID
  async deleteGroceryList(id: string): Promise<void> {
    await this.listModel.findByIdAndDelete(id).exec();
    this.logger.log(`Grocery list with ID ${id} deleted`);
  }
}
