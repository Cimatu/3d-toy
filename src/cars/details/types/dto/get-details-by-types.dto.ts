import { ApiProperty } from "@nestjs/swagger";


export class GetDetailsTypesIdsDto {
    @ApiProperty({ example: [1, 3, 18], description: 'Types ids' })
    ids: number[];
}

export class GetDetailTypeNameDto {
    @ApiProperty({ example: "Roller", description: 'Typee name' })
    name: string;
}
