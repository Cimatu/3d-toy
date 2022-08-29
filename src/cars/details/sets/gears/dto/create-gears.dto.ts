import { ApiProperty } from "@nestjs/swagger";


export class CreateGearDto {
    @ApiProperty({ example: 'MINI 4WD PRO SUPER SPEED GEAR SET(for W-1 chassis Gear Ratio 3.0:1', description: "Unique detail name" })
    name: string;

    @ApiProperty({ example: 1, description: 'Detail price' })
    price: number
}
