import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 50, description: 'Price of all parts of the car in cart' })
    @Column({ default: 0 })
    total: number;

    @ApiProperty({ example: 5, description: 'Quantity of all parts of the car in cart' })
    @Column({ default: 0 })
    quantity: number;

    @ApiProperty({ description: 'Array with all cart in the cart' })
    @OneToMany(() => Car, (car) => car.id)
    @JoinColumn()
    cars: Car[];
}
