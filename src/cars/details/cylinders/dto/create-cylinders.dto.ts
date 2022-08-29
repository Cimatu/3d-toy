import { ApiProperty } from "@nestjs/swagger";


export class CreateCylinderDto {
    @ApiProperty({ example: 1, description: 'Detail price' })
    price: number;

    @ApiProperty({ example: 'DOUBLE ALUMINUM ROLLERS(13-12mm/ORANGE)', description: 'Unique detail name' })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Detail color' })
    color: string;
}
