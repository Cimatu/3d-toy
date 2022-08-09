import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cylinders')
class Cylinder {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Cylinder price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'DOUBLE ALUMINUM ROLLERS(13-12mm/ORANGE)', description: 'Cylinder name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Cylinder color' })
    @Column({ unique: true })
    color: string;
}

export default Cylinder