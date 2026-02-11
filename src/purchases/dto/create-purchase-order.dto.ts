import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

class PurchaseOrderItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  quantity!: number;
}

export class PurchaseOrderCreateDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  supplierId!: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PurchaseOrderItemDto)
  items!: PurchaseOrderItemDto[];
}
