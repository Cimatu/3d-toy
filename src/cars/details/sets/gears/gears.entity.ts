import { ApiProperty } from "@nestjs/swagger";
import { ChildEntity, Column } from "typeorm";
import Detail from "../../deltails.entity";

@ChildEntity()
class Gear extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: "Gear", description: 'Car body type' })
    @Column({ default: "Gear" })
    type: string;

    @ApiProperty({ example: 'MINI 4WD PRO SUPER SPEED GEAR SET(for W-1 chassis Gear Ratio 3.0:1' })
    @Column({ unique: true })
    name: string;
}

export default Gear