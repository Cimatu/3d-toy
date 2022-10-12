import { ApiProperty } from "@nestjs/swagger";


export class SetUserDto {
    @ApiProperty({ example: 1, description: 'Unique username' })
    userId: number;

    @ApiProperty({ example: 1, description: 'Unique username' })
    notificationId: number;
}
