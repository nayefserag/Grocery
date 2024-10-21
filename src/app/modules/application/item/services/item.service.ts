import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ItemRepository } from 'src/app/modules/infrastructure/repositories/item/item.repository';
import { CreateItemDto } from '../model/item.dto';
import { Item } from 'src/app/modules/infrastructure/entites/item.entity';
import { ListRepository } from 'src/app/modules/infrastructure/repositories/list/items-list.repositry';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(private readonly itemRepository: ItemRepository, private readonly listRepository: ListRepository) {
    this.logger.log('ItemService initialized');
  }

  // Create a new item
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, description, price } = createItemDto;

    try {
      const item = await this.itemRepository.createItem(
        name,
        description,
        price,
      );
      this.logger.log(`Item with name "${name}" created successfully`);
      return item;
    } catch (error) {
      this.logger.error(`Error creating item: ${error.message}`);
      throw new BadRequestException('Failed to create item');
    }
  }

  // Fetch all items
  async getAllItems(): Promise<Item[]> {
    try {
      const items = await this.itemRepository.findAll();
      this.logger.log(`Retrieved ${items.length} items`);
      return items;
    } catch (error) {
      this.logger.error(`Error retrieving items: ${error.message}`);
      throw new BadRequestException('Failed to retrieve items');
    }
  }

  // Fetch an item by ID
  async getItemById(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      this.logger.warn(`Item with ID ${id} not found`);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.logger.log(`Item with ID ${id} retrieved successfully`);
    return item;
  }

  // Fetch an item by a specific field
  async getItemByField(field: keyof Item, value: any): Promise<Item | null> {
    try {
      const item = await this.itemRepository.getItemByFelid(field, value);
      if (!item) {
        this.logger.warn(`Item with ${field}: ${value} not found`);
        throw new NotFoundException(`Item with ${field}: ${value} not found`);
      }
      return item;
    } catch (error) {
      this.logger.error(`Error fetching item by ${field}: ${error.message}`);
      throw new BadRequestException(`Failed to fetch item by ${field}`);
    }
  }

  // Update an item by ID
  async updateItem(
    id: string,
    updateItemDto: Partial<Item>,
  ): Promise<Item | null> {
    const { name, description, price } = updateItemDto;
    try {
      const updatedItem = await this.itemRepository.updateItem(
        id,
        name,
        description,
        price,
      );
      if (!updatedItem) {
        this.logger.warn(`Item with ID ${id} not found`);
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      this.logger.log(`Item with ID ${id} updated successfully`);
      return updatedItem;
    } catch (error) {
      this.logger.error(`Error updating item with ID ${id}: ${error.message}`);
      throw new BadRequestException('Failed to update item');
    }
  }

  // Delete an item by ID
  async deleteItem(id: string): Promise<void> {
    try {
      await this.itemRepository.deleteItem(id);
      this.logger.log(`Item with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting item with ID ${id}: ${error.message}`);
      throw new BadRequestException('Failed to delete item');
    }
  }

}
