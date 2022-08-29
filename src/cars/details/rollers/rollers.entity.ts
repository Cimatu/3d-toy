import { ChildEntity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import Detail from "../deltails.entity";


@ChildEntity()
class Roller extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: '19MM ALUMINUM BALL-BEARING ROLLER SET (ORANGE)', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: '19mm', description: 'Rollers size' })
    @Column({ nullable: true })
    dimmensions: string;

    @ApiProperty({ example: 'Orange', description: 'Unique detail color' })
    @Column({ unique: true })
    color: string;
}

export default Roller
