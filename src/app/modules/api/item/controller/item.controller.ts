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
  Request,
} from '@nestjs/common';
import { ItemService } from 'src/app/modules/application/item/services/item.service';
import { ListService } from 'src/app/modules/application/item/services/list-items.service';
import { AuthServiceGuard } from 'src/app/shared/module/guards/jwt.guard';
@Controller('grocery')
@UseGuards(AuthServiceGuard) // Apply the guard at the controller level
export class ItemController {
  constructor(
    private readonly groceryService: ItemService,
    private readonly listService: ListService,
  ) {}

  // ------------------- Grocery Item Endpoints -------------------
  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  async createGroceryItem(@Body() createItemDto) {
    const newItem = await this.groceryService.createItem(createItemDto);
    return {
      message: 'Grocery item created successfully',
      item: newItem,
    };
  }

  @Get('items')
  @HttpCode(HttpStatus.OK)
  async getAllGroceryItems() {
    const items = await this.groceryService.getAllItems();
    return items;
  }

  @Get('items/:id')
  @HttpCode(HttpStatus.OK)
  async getGroceryItem(@Param('id') id: string) {
    const item = await this.groceryService.getItemByField('id', id);
    return item;
  }

  @Patch('items/:id')
  @HttpCode(HttpStatus.OK)
  async updateGroceryItem(@Param('id') id: string, @Body() updateItemDto) {
    const updatedItem = await this.groceryService.updateItem(id, updateItemDto);
    return {
      message: 'Grocery item updated successfully',
      item: updatedItem,
    };
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.OK)
  async deleteGroceryItem(@Param('id') id: string) {
    await this.groceryService.deleteItem(id);
    return {
      message: 'Grocery item deleted successfully',
    };
  }

  @Post('lists')
  @HttpCode(HttpStatus.CREATED)
  async createGroceryList(@Body() createListDto) {
    const newList = await this.listService.createGroceryList(createListDto);
    return {
      message: 'Grocery list created successfully',
      list: newList,
    };
  }

  @Get('lists')
  @HttpCode(HttpStatus.OK)
  async getAllGroceryLists() {
    const lists = await this.listService.getAllGroceryLists();
    return lists;
  }

  @Get('lists/:id')
  @HttpCode(HttpStatus.OK)
  async getGroceryList(@Param('id') id: string) {
    const list = await this.listService.getGroceryList(id);
    return list;
  }

  @Patch('lists/:id')
  @HttpCode(HttpStatus.OK)
  async updateGroceryList(@Param('id') id: string, @Body() updateListDto) {
    const updatedList = await this.listService.updateGroceryList(
      id,
      updateListDto,
    );
    return {
      message: 'Grocery list updated successfully',
      list: updatedList,
    };
  }

  @Delete('lists/:id')
  @HttpCode(HttpStatus.OK)
  async deleteGroceryList(@Param('id') id: string) {
    await this.listService.deleteGroceryList(id);
    return {
      message: 'Grocery list deleted successfully',
    };
  }
}
