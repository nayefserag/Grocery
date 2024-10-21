// src/item/dto/create-list.dto.ts
import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  items: [];
}
