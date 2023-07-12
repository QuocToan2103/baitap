import { Controller, Delete, Get, NotFoundException, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')

export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    async findAll() {
      const users = await this.usersService.findAll();
      return { data: users };
    }
  
    @Get(':id')
    async findOne(@Param() params) {
      const user = await this.usersService.findOne(params.id);
      if (!user) {
        throw new NotFoundException();
      }
      return { data: user };
    }
  
    @Delete(':id')
    async remove(@Param() params) {
      await this.usersService.remove(params.id);
      return { message: 'User deleted' };
    }
}