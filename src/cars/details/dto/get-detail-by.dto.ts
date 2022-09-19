import { ApiProperty } from "@nestjs/swagger";
import { Detail } from "../deltails.entity";


export class GetDetailByNameDto {
    @ApiProperty({ example: "Some gear name", description: 'Detail name' })
    name: string;
}

export class GetDetailsByPriceDto {
    @ApiProperty({
        example: [{
            "id": 16,
            "name": "hello",
            "color": null,
            "dimmensions": null,
            "price": 1,
            "img": null,
            "note": null,
            "type": {
                "id": 4,
                "name": "Gear",
                "img": null
            }
        },
        {
            "id": 17,
            "name": "a",
            "color": null,
            "dimmensions": null,
            "price": 1,
            "img": null,
            "note": null,
            "type": {
                "id": 4,
                "name": "Gear",
                "img": null
            }
        }
        ], description: 'Detailы list for filtering'
    })
    details: Detail[];

    @ApiProperty({ example: 0, description: 'Min price for filtering' })
    min: number;

    @ApiProperty({ example: 100, description: 'Max price for filtering' })
    max: number
}
