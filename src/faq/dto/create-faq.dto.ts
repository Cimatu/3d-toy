import { ApiProperty } from "@nestjs/swagger";


export class CreateFaqDto {
    @ApiProperty({ example: 'Our toys', description: 'FAQ name' })
    name: string;

    @ApiProperty({example: 'Текста пока нет', description: 'FAQ text'})
    text: string;
}
