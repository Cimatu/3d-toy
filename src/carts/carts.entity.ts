import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;
 
    @Column()
    quantity: number;

    @OneToMany(() => Car, (car) => car.id)
    @JoinColumn()
    cars: Car[];

    @OneToOne(() => User, (user) => user.id)
    user: User;
}
