import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ListRepository } from 'src/app/modules/infrastructure/repositories/list/items-list.repositry';
import { CreateListDto } from '../model/list.dto';
import { ListItems } from 'src/app/modules/infrastructure/entites/list.item.entity';

@Injectable()
export class ListService {
  private readonly logger = new Logger(ListService.name);

  constructor(private readonly groceryListRepository: ListRepository) {
    this.logger.log('GroceryListService initialized');
  }

  // Create a new grocery list
  async createGroceryList(createListDto: CreateListDto): Promise<ListItems> {
    const { name } = createListDto;

    try {
      const list =
        await this.groceryListRepository.createGroceryList(createListDto);
      this.logger.log(`Grocery list "${name}" created successfully`);
      return list;
    } catch (error) {
      this.logger.error(`Error creating grocery list: ${error.message}`);
      throw new BadRequestException('Failed to create grocery list');
    }
  }

  // Fetch all grocery lists
  async getAllGroceryLists(): Promise<ListItems[]> {
    try {
      const lists = await this.groceryListRepository.findAllGroceryLists();
      this.logger.log(`Retrieved ${lists.length} grocery lists`);
      return lists;
    } catch (error) {
      this.logger.error(`Error retrieving grocery lists: ${error.message}`);
      throw new BadRequestException('Failed to retrieve grocery lists');
    }
  }

  // Fetch a grocery list by ID
  async getGroceryList(id: string): Promise<ListItems | null> {
    try {
      const list = await this.groceryListRepository.findGroceryListById(id);
      if (!list) {
        this.logger.warn(`Grocery list with ID ${id} not found`);
        throw new NotFoundException(`Grocery list with ID ${id} not found`);
      }
      this.logger.log(`Grocery list with ID ${id} retrieved successfully`);
      return list;
    } catch (error) {
      this.logger.error(
        `Error retrieving grocery list with ID ${id}: ${error.message}`,
      );
      throw new BadRequestException('Failed to retrieve grocery list');
    }
  }

  // Update a grocery list by ID
  async updateGroceryList(
    id: string,
    updateListDto: Partial<CreateListDto>,
  ): Promise<ListItems | null> {
    const { name, items } = updateListDto;

    try {
      const updatedList = await this.groceryListRepository.updateGroceryList(
        id,
        name,
        items,
      );
      if (!updatedList) {
        this.logger.warn(`Grocery list with ID ${id} not found`);
        throw new NotFoundException(`Grocery list with ID ${id} not found`);
      }
      this.logger.log(`Grocery list with ID ${id} updated successfully`);
      return updatedList;
    } catch (error) {
      this.logger.error(
        `Error updating grocery list with ID ${id}: ${error.message}`,
      );
      throw new BadRequestException('Failed to update grocery list');
    }
  }

  // Delete a grocery list by ID
  async deleteGroceryList(id: string): Promise<void> {
    try {
      await this.groceryListRepository.deleteGroceryList(id);
      this.logger.log(`Grocery list with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(
        `Error deleting grocery list with ID ${id}: ${error.message}`,
      );
      throw new BadRequestException('Failed to delete grocery list');
    }
  }
}
