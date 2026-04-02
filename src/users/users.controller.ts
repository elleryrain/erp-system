import { BadRequestException, Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { UserCreateDto } from "./dto/create-user.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  private readonly usersService: UsersService;

  constructor(@Inject(UsersService) usersService: UsersService) {
    this.usersService = usersService;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Post()
  create(@Body() dto: UserCreateDto) {
    if (!dto) {
      throw new BadRequestException("Request body is required");
    }
    return this.usersService.create(dto);
  }
}
