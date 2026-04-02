import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsIn(['admin', 'manager', 'warehouse_keeper', 'кладовщик'])
  role!: string;
}
