import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty({ example: 10, description: 'Owner Id' })
    userId: number;

    @ApiProperty({ example: [1, 2, 3, 10], description: 'Details ids in car. Should be a least "CarBody"' })
    detailsIds?: number[]
}
