import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Group])],
    // providers: [UserActivityService],
    // controllers: [UserActivityController],
  })
  export class GroupModule {}