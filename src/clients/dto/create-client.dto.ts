import { IsOptional, IsString } from 'class-validator';

export class ClientCreateDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
