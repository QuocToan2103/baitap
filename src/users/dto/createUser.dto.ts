import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";
export class CreateUserDto {

    @ApiProperty({ example: "string", description: '' })
    @IsEmpty()
    firstName: string;
  
    @ApiProperty({ example: "string", description: '' })
    @IsEmpty()
    lastName: string;
  
    @ApiProperty({ example: 1, description: '' })
    @IsEmpty()
    isActive: boolean;
}