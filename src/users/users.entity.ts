import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Cart } from "src/carts/carts.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('users')
export class User {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'destroyer3000', description: 'Unique username' })
    @Column({ unique: true })
    username: string;

    @ApiProperty({ example: 'user', description: 'User role, default: user' })
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => Car, (car) => car.user)
    @JoinColumn()
    cars: Car[];

    @ApiProperty({ description: 'Cart entity' })
    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;
}
