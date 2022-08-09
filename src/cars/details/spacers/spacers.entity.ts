import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('spacers')
class Spacer {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'Spacer price' })
    @Column({ default: 0 })
    price: number;

    @ApiProperty({ example: 'RED ALUMINUM SPACER SET(1.5/3/6/12mm)', description: 'Spacer name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'Orange', description: 'Spacer color' })
    @Column({ unique: true })
    color: string;

    @ApiProperty({ example: 'spacer', description: 'Detail type, default: wheels' })
    @Column({ default: 'spacer' })
    type: string;

    // @ManyToMany(() => Car, (cars) => cars.wheels)
    // cars: Car[];
}

export default Spacer