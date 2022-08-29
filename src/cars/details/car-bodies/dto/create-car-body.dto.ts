import { ApiProperty } from "@nestjs/swagger";


export class CreateCarBodyDto {
    @ApiProperty({ example: 1, description: 'Detail price' })
    price: number;

    @ApiProperty({ example: 'PINK BOOM', description: 'Unique detail name' })
    name: string;

    @ApiProperty({ example: '570*465*285mm', description: 'Car body size in 3 dimmensions' })
    dimmensions: string;
}
