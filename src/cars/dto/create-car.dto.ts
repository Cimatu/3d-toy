import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty({ example: 10, description: 'Owner Id' })
    username: string;

    details?: InterfaceDetail[]
}
