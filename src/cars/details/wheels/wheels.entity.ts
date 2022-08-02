import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('wheels')
class Wheel {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Detail level' })
    @Column({ default: 1 })
    class: number;

    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;
    
    @ApiProperty({ example: 'Prime', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;
    
    @ApiProperty({ example: 'wheel', description: 'Detail type, default: wheels' })
    @Column({default: 'wheel'})
    type: string;

    @ManyToMany(() => Car, (cars) => cars.wheels)
    cars: Car[];
}

export default Wheel