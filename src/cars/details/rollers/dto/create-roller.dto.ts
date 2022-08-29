import { ApiProperty } from "@nestjs/swagger";


export class CreateRollerDto {
    @ApiProperty({ example: 1, description: 'Detail price' })
    price: number;

    @ApiProperty({ example: '19MM ALUMINUM BALL-BEARING ROLLER SET (ORANGE)', description: 'Unique detail name' })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Unique detail color' })
    color: string;
}
