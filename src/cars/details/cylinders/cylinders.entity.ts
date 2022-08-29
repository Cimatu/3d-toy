import { ApiProperty } from "@nestjs/swagger";
import { ChildEntity, Column } from "typeorm";
import Detail from "../deltails.entity";


@ChildEntity()
class Cylinder extends Detail{
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'DOUBLE ALUMINUM ROLLERS(13-12mm/ORANGE)', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Detail color' })
    @Column({ unique: true })
    color: string;
}

export default Cylinder
