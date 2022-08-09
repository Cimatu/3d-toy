import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { ChildEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Detail from "../../deltails.entity";

@ChildEntity()
class BallBearingSet extends Detail {
    @ApiProperty({ example: 'Ball Bearing Set' })
    @Column({ unique: true, default: 'Ball Bearing Set' })
    name: string;

    @ApiProperty({ example: 'Prime', description: 'Rollers name' })
    @Column({
        default:
            `
            Used to replace the bearing positions of chassis, 
            gear and guide wheel 520. After replacement, 
            the vehicle speed can be increased and the friction 
            at the contact position when the vehicle rotates can be reduced.
        `
    })
    note: string
}

export default BallBearingSet