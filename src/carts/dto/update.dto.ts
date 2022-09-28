import { ApiProperty } from "@nestjs/swagger";

export class AddCarDto {
    @ApiProperty({ example: 10, description: 'User Id' })
    userId: number;

    @ApiProperty({ example: [10, 11, 1], description: 'Details  Ids in car' })
    detailsIds: number[];
}


export class AddNewItemDto {
    @ApiProperty({ example: 10, description: 'User Id' })
    userId: number;

    @ApiProperty({ example: 10, description: 'Detail Id' })
    detailId: number;
}