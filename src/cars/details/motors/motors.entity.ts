import { ApiProperty } from "@nestjs/swagger";
import { ChildEntity, Column } from "typeorm";
import Detail from "../deltails.entity";


@ChildEntity()
class Motor extends Detail {
    @ApiProperty({ example: 1, description: 'Motor price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'AILEMAO GRADE-UPLight Chaser Motor', description: 'Unique motor name' })
    @Column({ unique: true })
    name: string;
}

export default Motor
