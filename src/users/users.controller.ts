import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./users.entity";

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
    async deleteUser(@Param('id') id: number): Promise<void> {
      await this.usersService.remove(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      return await this.usersService.create(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.update(id, updateUserDto);
    }
}