import { ApiProperty } from "@nestjs/swagger";

export class UpdateEventDto {
    @ApiProperty({ example: "Car toys Tournament In China", description: 'Event name' })
    name?: string;

    @ApiProperty({ example: "16 Sept 2020", description: 'Event date' })
    date?: string;

    @ApiProperty({ example: "Lorem ipsum", description: 'Event description' })
    description?: string;

    @ApiProperty({ example: "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg", description: 'Url to event image' })
    img?: string;
}
