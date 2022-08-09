import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { ChildEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Detail from "../deltails.entity";

@ChildEntity()
class BodyCar extends Detail{
    @ApiProperty({ example: 1, description: 'Car body price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'PINK BOOM', description: 'Unique car body name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: '570*465*285mm', description: 'Size of car body' })
    @Column({ nullable: true })
    dimmensions: string
}

export default BodyCar