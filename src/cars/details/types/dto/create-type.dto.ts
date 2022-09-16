import { ApiProperty } from "@nestjs/swagger";


export class CreateTypeDto {
    @ApiProperty({ example: "Roller", description: 'Type name' })
    name: string;

    @ApiProperty({ example: "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg", description: 'Type image' })
    img: string
}
