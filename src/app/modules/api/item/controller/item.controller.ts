import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateItemDto } from 'src/app/modules/application/item/model/item.dto';
import { CreateListDto } from 'src/app/modules/application/item/model/list.dto';
import { ItemService } from 'src/app/modules/application/item/services/item.service';
import { ListService } from 'src/app/modules/application/item/services/list-items.service';
import { AuthServiceGuard } from 'src/app/shared/module/guards/jwt.guard';

@Controller('grocery')
@UseGuards(AuthServiceGuard)
export class ItemController {
  constructor(
    private readonly groceryService: ItemService,
    private readonly listService: ListService,
  ) {}

  // Create a new grocery item
  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  async createGroceryItem(@Body() createItemDto: CreateItemDto) {
    const newItem = await this.groceryService.createItem(createItemDto);
    return {
      message: 'Grocery item created successfully',
      item: newItem,
    };
  }

  // Get all grocery items
  @Get('items')
  @HttpCode(HttpStatus.OK)
  async getAllGroceryItems(): Promise<CreateItemDto[]> {
    return await this.groceryService.getAllItems();
  }

  // Get a specific grocery item by ID
  @Get('items/:id')
  @HttpCode(HttpStatus.OK)
  async getGroceryItem(@Param('id') id: string) {
    const item = await this.groceryService.getItemByField('id', id);
    return item;
  }

  // Update a grocery item by ID
  @Patch('items/:id')
  @HttpCode(HttpStatus.OK)
  async updateGroceryItem(
    @Param('id') id: string,
    @Body() updateItemDto: Partial<CreateItemDto>,
  ) {
    const updatedItem = await this.groceryService.updateItem(id, updateItemDto);
    return {
      message: 'Grocery item updated successfully',
      item: updatedItem,
    };
  }

  // Delete a grocery item by ID
  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  async deleteGroceryItem(@Param('id') id: string) {
    await this.groceryService.deleteItem(id);
    return {
      message: 'Grocery item deleted successfully',
    };
  }

  // Create a new grocery list
  @Post('lists')
  @HttpCode(HttpStatus.CREATED)
  async createGroceryList(@Body() createListDto: CreateListDto) {
    const newList = await this.listService.createGroceryList(createListDto);
    return {
      message: 'Grocery list created successfully',
      list: newList,
    };
  }

  // Get all grocery lists
  @Get('lists')
  @HttpCode(HttpStatus.OK)
  async getAllGroceryLists() {
    return await this.listService.getAllGroceryLists();
  }

  // Get a specific grocery list by ID
  @Get('lists/:id')
  @HttpCode(HttpStatus.OK)
  async getGroceryList(@Param('id') id: string) {
    const list = await this.listService.getGroceryList(id);
    return list;
  }

  // Update a grocery list by ID
  @Patch('lists/:id')
  @HttpCode(HttpStatus.OK)
  async updateGroceryList(
    @Param('id') id: string,
    @Body() updateListDto: Partial<CreateListDto>,
  ) {
    const updatedList = await this.listService.updateGroceryList(
      id,
      updateListDto,
    );
    return {
      message: 'Grocery list updated successfully',
      list: updatedList,
    };
  }

  // Delete a grocery list by ID
  @Delete('lists/:id')
  @HttpCode(HttpStatus.OK)
  async deleteGroceryList(@Param('id') id: string) {
    await this.listService.deleteGroceryList(id);
    return {
      message: 'Grocery list deleted successfully',
    };
  }
}
