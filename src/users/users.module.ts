import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ActivityUser } from 'src/activity_user/activityUser.entity';
import { Group } from 'src/group/group.entity';


@Module({
    controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, ActivityUser, Group])],
  providers: [UsersService],
  exports: [TypeOrmModule,UsersService]
})
export class UsersModule {}