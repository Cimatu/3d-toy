import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('bodies')
class CarBody {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Car body price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'PINK BOOM', description: 'Unique car body name' })
    @Column({ unique: true })
    name: string;

    @Column({ default: 'body' })
    type: string

    @ApiProperty({ example: '570*465*285mm', description: 'Size of car body' })
    @Column({ nullable: true })
    dimmensions: string
}

export default CarBody
