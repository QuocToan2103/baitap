import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserActivityDto } from './dto/createActivityUser.dto';
import { ActivityUser } from './activityUser.entity';


@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(ActivityUser)
    private readonly userActivityRepository: Repository<ActivityUser>,
  ) {}

  findAll(): Promise<ActivityUser[]> {
    return this.userActivityRepository.find();
  }

}