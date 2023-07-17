import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityUser } from './activityUser.entity';
import { UserActivityService } from './activityUser.service';
import { UserActivityController } from './activityUser.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ActivityUser])],
  providers: [UserActivityService],
  controllers: [UserActivityController],
})
export class ActivityUserModule {}