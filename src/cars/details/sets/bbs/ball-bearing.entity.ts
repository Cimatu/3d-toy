import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { ChildEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Detail from "../../deltails.entity";

@ChildEntity()
class BallBearingSet extends Detail {
    @ApiProperty({ example: 'Ball Bearing Set' })
    @Column({ unique: true, default: 'Ball Bearing Set' })
    name: string;

    @ApiProperty({ example: "BallBearingSet", description: 'Car body type' })
    @Column({ default: "BallBearingSet" })
    type: string;

    @ApiProperty({ example: 'Prime', description: 'Rollers name' })
    @Column()
    note: string
}

export default BallBearingSet