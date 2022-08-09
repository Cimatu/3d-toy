import { ApiProperty } from "@nestjs/swagger";

export class UpdateCarDto {
    @ApiProperty({ example: 10, description: 'Owner Id' })
    carId: number;

    details?: InterfaceDetail[]
}
