import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityUser } from 'src/activity_user/activityUser.entity';
import { Group } from 'src/group/group.entity';
import { User } from 'src/users/users.entity';
@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'testnode',
        entities: [User,ActivityUser,Group],
        synchronize: true,
      })],
    exports: [TypeOrmModule],
  })
  export class DatabaseModule {}
  