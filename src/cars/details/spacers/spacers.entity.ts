import { ApiProperty } from "@nestjs/swagger";
import { ChildEntity, Column } from "typeorm";
import Detail from "../deltails.entity";


@ChildEntity()
class Spacer extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'RED ALUMINUM SPACER SET(1.5/3/6/12mm)', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Unique detail color' })
    @Column({ unique: true })
    color: string;
}

export default Spacer