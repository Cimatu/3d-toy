import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
    @ApiProperty({example: 'destroyer3000', description: 'Unique username'})
    name: string;

    @ApiProperty({example: 'destroyer3000', description: 'Unique username'})
    text: string;

    @ApiProperty({example: 'destroyer3000', description: 'Unique username'})
    date: Date
}
