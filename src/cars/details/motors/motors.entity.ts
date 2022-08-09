import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('motors')
class Motor {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Motor price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'AILEMAO GRADE-UPLight Chaser Motor', description: 'Unique motor name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'motor', description: 'Detail type, default: motor' })
    @Column({ default: 'motor' })
    type: string;
}

export default Motor