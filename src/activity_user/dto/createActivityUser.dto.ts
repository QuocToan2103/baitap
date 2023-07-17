import { ApiProperty } from "@nestjs/swagger";

export class CreateUserActivityDto {
    @ApiProperty({ example: 0, description: '' })
    userId: number;

    @ApiProperty({ example: "string", description: '' })
    activityName: string;

    @ApiProperty({ example: "string", description: '' })
    oldData: string;

    @ApiProperty({ example: "string", description: '' })
    newData: string;

    @ApiProperty({ example: "string", description: '' })
    detailsChange: string;  
}