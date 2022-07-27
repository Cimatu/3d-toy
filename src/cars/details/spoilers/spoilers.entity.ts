import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('spoilers')
class Spoiler{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    class: number;

    @Column({ default: 0 })
    price: number;

    @Column({ unique: true })
    name: string;

    @Column({default: 'spoiler'})
    type: string

    @ManyToMany(() => Car, (cars) => cars.spoilers)
    cars: Car[];
}

export default Spoiler