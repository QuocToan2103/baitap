import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/conectdata';


@Module({
  imports: [DatabaseModule,UsersModule /* other modules */],
  providers: [/* providers */],
  exports: [/* providers */],
})
export class AppModule {}
