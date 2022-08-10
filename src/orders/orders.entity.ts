import { ApiProperty } from "@nestjs/swagger";
import { CartItem } from "src/carts/cart-item/cart-item.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('orders')
export class Order {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 50, description: 'Price of all parts of the car in cart' })
    @Column({ default: 0 })
    total: number;

    @Column()
    country: string;

    @Column()
    city: string;

    @ApiProperty({ example: 5, description: 'Quantity of all parts of the car in cart' })
    @Column({ default: 0 })
    quantity: number;

    @ApiProperty({ description: 'Array with all details in the cart' })
    @OneToMany(() => CartItem, cartItem => cartItem.order)
    @JoinTable()
    cartItems: CartItem[];

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn()
    user: User
}
