import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserActivityService } from './activityUser.service';
import { CreateUserActivityDto } from './dto/createActivityUser.dto';


@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Get()
  async findAll() {
    const activityuser = await this.userActivityService.findAll();
    return { data: activityuser };
  }

//   @Post()
//   async create(@Body() createUserActivityDto: CreateUserActivityDto) {
//     return this.userActivityService.create(createUserActivityDto);
//   }
}