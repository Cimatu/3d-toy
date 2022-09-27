import { ApiProperty } from "@nestjs/swagger";

export class RecoveryDto {
    @ApiProperty({ example: 'destroyer3000@gmail.com', description: 'Unique email' })
    email: string;

    @ApiProperty({ example: 'https://vironit.timesummary.com/report/', description: 'Password recovery link' })
    link?: string;
}

export class SetNewPasswordDto {
    // @ApiProperty({ example: 'destroyer3000@gmail.com', description: 'Unique email' })
    // email: string;
    @ApiProperty({ example: '12345678', description: 'New password' })
    password1: string;

    @ApiProperty({ example: '12345678', description: 'Repeat password' })
    password2: string;
}
