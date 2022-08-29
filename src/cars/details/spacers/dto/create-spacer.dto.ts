import { ApiProperty } from "@nestjs/swagger";


export class CreateSpaerDto {
    @ApiProperty({ example: 1, description: 'Detail price' })
    price: number;

    @ApiProperty({ example: 'RED ALUMINUM SPACER SET(1.5/3/6/12mm)', description: 'Unique detail name' })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Unique detail color' })
    color: string;
}