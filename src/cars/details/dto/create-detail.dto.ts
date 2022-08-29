import { ApiProperty } from "@nestjs/swagger";


export class CreateDetailDto {
    @ApiProperty({example: 10, description: 'Car detail class from 1 to 10'})
    class: number;

    @ApiProperty({example: 100, description: 'Detail price'})
    price: number;

    @ApiProperty({example: 'Prime', description: 'Unique detail name'})
    name: string;

    @ApiProperty({example: 'spoiler', description: 'Detail type'})
    type: string;
}
