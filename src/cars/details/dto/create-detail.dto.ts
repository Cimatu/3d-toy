import { ApiProperty } from "@nestjs/swagger";


export class CreateDetailDto {
    @ApiProperty({ example: 'spoiler', description: 'Detail type' })
    type: string;

    @ApiProperty({ example: 'Prime', description: 'Unique detail name' })
    name: string;

    @ApiProperty({ example: 100, description: 'Detail price' })
    price: number;

    @ApiProperty({example: "Red"})
    color?: string;

    @ApiProperty({ example: '570*465*285mm', description: 'Detail dimmensions' })
    dimmensions?: string;

    @ApiProperty({ example: "Any url", description: 'Detail image' })
    img: string;

    @ApiProperty({
        example: `
    This component is in different colors 
    (Orange, Black, Silver, Red and Golden) 
    in the app shall be shown all`,
        description: 'Detail note'
    })
    note?: string;
}
