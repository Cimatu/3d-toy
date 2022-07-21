import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'destroyer3000', description: 'Unique username'})
    readonly username: string
}
