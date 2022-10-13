import { ApiProperty } from "@nestjs/swagger";


export class SetUserDto {
    @ApiProperty({ example: 1, description: 'User id' })
    userId: number;

    @ApiProperty({ example: 1, description: 'Notification id' })
    notificationId: number;
}
