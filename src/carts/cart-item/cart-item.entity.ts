import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "../carts.entity";
import { Detail } from "src/cars/details/deltails.entity";
import { Order } from "src/orders/orders.entity";


@Entity('cart-item')
export class CartItem {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 5, description: 'Quantity of all parts of the car in cart' })
    @Column({ default: 0 })
    quantity: number;

    @ApiProperty({ example: 50, description: 'Price of all parts of the car in cart' })
    @Column({ default: 0 })
    total: number;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    @JoinColumn()
    cart: Cart;

    @ManyToOne(() => Order, (order) => order.cartItems, { onDelete: "CASCADE" })
    @JoinColumn()
    order: Order;

    @ApiProperty({ description: 'Array with all details in the cart' })
    @ManyToOne(() => Detail)
    @JoinColumn()
    detail: Detail;

    @ApiProperty({ example: 3, description: 'User id' })
    @Column({ nullable: false })
    detailId: number;
}
