import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty({ example: 10, description: 'Owner Id' })
    userId: number;

    details: {
        body?: string;
        spoiler?: string;
        toning?: string;
        wheel?: string;
    }
}
