import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CartItem } from "src/carts/cart-item/cart-item.entity";
import { User } from "src/users/users.entity";


@Entity('orders')
export class Order {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 50, description: 'Price of all parts of the car in order' })
    @Column({ default: 0 })
    total: number;

    @ApiProperty({example: 'Taiwan', description: "Country to deliver the order"})
    @Column()
    country: string;

    @ApiProperty({example: 'Taibei', description: "City to deliver the order"})
    @Column()
    city: string;

    @ApiProperty({ example: 5, description: 'Quantity of all parts of the car in order' })
    @Column({ default: 0 })
    quantity: number;

    @ApiProperty({ description: 'Array with all details in the order' })
    @OneToMany(() => CartItem, cartItem => cartItem.order)
    @JoinTable()
    cartItems: CartItem[];

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn()
    user: User
}
