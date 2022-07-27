import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/carts/carts.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CarBody, Spoiler, Toning, Wheel } from "./details";


@Entity('cars')
export class Car{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.cars, {onDelete: 'CASCADE'})
    user: User;

    @ManyToMany(() => CarBody, (bodies) => bodies.cars)
    @JoinTable()
    bodies: CarBody[];

    @ManyToMany(() => Spoiler, (spoilers) => spoilers.cars)
    @JoinTable()
    spoilers: Spoiler[];

    @ManyToMany(() => Toning, (tonings) => tonings.cars)
    @JoinTable()
    tonings: Toning[];

    @ManyToMany(() => Wheel, (wheels) => wheels.cars)
    @JoinTable()
    wheels: Wheel[];

    @OneToMany(() => Cart, (cart) => cart.id)
    cart: Cart
}
