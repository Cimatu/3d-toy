import { ChildEntity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import Detail from "../../deltails.entity";

@ChildEntity()
class Gear extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'MINI 4WD PRO SUPER SPEED GEAR SET(for W-1 chassis Gear Ratio 3.0:1', description: "Unique detail name" })
    @Column({ unique: true })
    name: string;
}

export default Gear
