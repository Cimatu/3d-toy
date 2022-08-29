import { ApiProperty } from "@nestjs/swagger";


export class CreateBBSDto {
    @ApiProperty({ example: 1, description: 'Ball Bearing Set price' })
    price: number;

    @ApiProperty({ example: 'Ball Bearing Set', description: "Unique detail name" })
    name: string;

    @ApiProperty({
        example: `Used to replace the bearing positions of chassis, 
    gear and guide wheel 520. After replacement, 
    the vehicle speed can be increased and the friction at the 
    contact position when the vehicle rotates can be reduced.`,
        description: 'Description for detail'
    })
    note: string;
}
