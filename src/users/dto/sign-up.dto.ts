import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty({example: 'destroyer3000@gmail.com', description: 'Unique username'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Unique username'})
    readonly password: string;
}
