import { ApiProperty } from "@nestjs/swagger";


export class CreateNewsDto {
    @ApiProperty({ example: "Car toys Tournament In China", description: 'News name' })
    name: string;

    @ApiProperty({ example: "16 Sept 2020", description: 'News date' })
    date: string;

    @ApiProperty({ example: "Lorem ipsum", description: 'News text' })
    text: string;
}
