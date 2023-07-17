import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";

export class CreateGroupDto {

    @ApiProperty({ example: "string", description: '' })
    @IsEmpty()
    groupName: string;
  
    @ApiProperty({ example: "string", description: '' })
    @IsEmpty()
    description: string; 
}