import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Detail from "../deltails.entity";

@Entity('wheels')
class Wheel {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Detail price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: '19MM ALUMINUM BALL-BEARING ROLLER SET (ORANGE)', description: 'Rollers name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Rollers name' })
    @Column({ nullable: true })
    color: string;

    @ApiProperty({ example: '19mm', description: 'Rollers size' })
    @Column({ default: '19mm' })
    dimentions: string

    @ApiProperty({ example: 'wheel', description: 'Detail type, default: wheels' })
    @Column({ default: 'wheel' })
    type: string;
}

export default Wheel
