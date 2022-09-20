import { ApiProperty } from "@nestjs/swagger";

export class SignDto {
    @ApiProperty({example: 'destroyer3000@gmail.com', description: 'Unique username'})
    email: string;

    @ApiProperty({example: '12345678', description: 'Unique username'})
    password: string;
}
