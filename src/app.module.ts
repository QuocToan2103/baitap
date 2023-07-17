import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/conectdata';
import { ActivityUser } from './activity_user/activityUser.entity';
import { ActivityUserModule } from './activity_user/activityUser.module';
import { GroupModule } from './group/group.module';


@Module({
  imports: [DatabaseModule,UsersModule,ActivityUserModule,GroupModule /* other modules */],
  providers: [/* providers */],
  exports: [/* providers */],
})
export class AppModule {}
