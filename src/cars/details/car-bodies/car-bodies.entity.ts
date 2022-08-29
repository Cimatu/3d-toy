import { ApiProperty } from "@nestjs/swagger";
import { ChildEntity, Column } from "typeorm";
import Detail from "../deltails.entity";


@ChildEntity()
class BodyCar extends Detail {
    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'PINK BOOM', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: '570*465*285mm', description: 'Car body size in 3 dimmensions' })
    @Column({ nullable: true })
    dimmensions: string;
}

export default BodyCar
