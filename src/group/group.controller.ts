import { Controller, Param, Post } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Controller('Group')
export class groupsController{
    constructor(private readonly usersService: UsersService,
       
      ) {}
    
    
}
