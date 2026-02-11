import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

class SalesOrderItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  quantity!: number;
}

export class SalesOrderCreateDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  clientId!: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SalesOrderItemDto)
  items!: SalesOrderItemDto[];
}
