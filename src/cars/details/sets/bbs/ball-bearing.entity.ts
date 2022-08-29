import { ChildEntity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import Detail from "../../deltails.entity";


@ChildEntity()
class BallBearingSet extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'Ball Bearing Set', description: "Unique detail name" })
    @Column({ unique: true, default: 'Ball Bearing Set' })
    name: string;

    @ApiProperty({
        example: `Used to replace the bearing positions of chassis, 
    gear and guide wheel 520. After replacement, 
    the vehicle speed can be increased and the friction at the 
    contact position when the vehicle rotates can be reduced.`,
        description: 'Description for detail'
    })
    @Column()
    note: string
}

export default BallBearingSet
