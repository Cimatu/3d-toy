import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('bodies')
class CarBody {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    class: number;

    @Column({ default: 0 })
    price: number;

    @Column({ unique: true })
    name: string;

    @Column({default: 'body'})
    type: string

    @ManyToMany(() => Car, (cars) => cars.bodies)
    cars: Car[];
}

export default CarBody