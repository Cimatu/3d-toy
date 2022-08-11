import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item/cart-item.entity";


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

    @OneToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn()
    user: User;

    @ApiProperty({ description: 'Array with all details in the cart' })
    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    @JoinTable()
    cartItems: CartItem[];
}
