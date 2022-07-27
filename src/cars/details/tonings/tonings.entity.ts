import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tonings')
class Toning{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    class: number;

    @Column({ default: 0 })
    price: number;

    @Column({ unique: true })
    name: string;

    @Column({default: 'toning'})
    type: string

    @ManyToMany(() => Car, (cars) => cars.tonings)
    cars: Car[];
}

export default Toning