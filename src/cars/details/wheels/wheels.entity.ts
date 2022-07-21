import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('wheels')
class Wheel {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @Column({ default: 1 })
    class: number;

    @Column({ default: 0 })
    price: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Car, (cars) => cars.wheels)
    cars: Car[];
}

export default Wheel