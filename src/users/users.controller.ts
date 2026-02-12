import { BadRequestException, Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UserCreateDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";
import { Public } from "src/common/decorators/public.decorator";

@Controller("users")
export class UsersController {
  private readonly usersRepository: UsersRepository;

  constructor(@Inject(UsersRepository) usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Public()
  @Post()
  create(@Body() dto: UserCreateDto) {
    if (!dto) {
      throw new BadRequestException("Request body is required");
    }
    return this.usersRepository.create(dto);
  }
}
