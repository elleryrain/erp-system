import { IsOptional, IsString } from 'class-validator';

export class SupplierCreateDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
