import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDataDto {
    @ApiProperty({ example: 1, description: 'User id' })
    userId: number;

    @ApiProperty({ example: "Dimasik", description: 'Realy?' })
    firstName: string;

    @ApiProperty({ example: "Savritsky", description: 'Come on' })
    lastName: string;
    
    @ApiProperty({ example: "dimasikgonapivasik@gmail.com", description: 'Bro, r u kidding?' })
    email: string;

    @ApiProperty({ example: "Hello world", description: 'Message user send to event' })
    message: string;
}

