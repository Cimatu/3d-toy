import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/carts/cart-item/cart-item.entity';
import { Cart } from 'src/carts/carts.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private userService: UsersService
    ) { }


    async createOrder(cart: Cart) {
        const order = await this.orderRepository.create({ cartItems: cart.cartItems, quantity: cart.quantity, total: cart.total })
        return await this.orderRepository.save(order);
    }

    async getOrdersByUserId(userId: number) {
        const user = await this.userService.deteteUserById(userId)
        return await this.orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.cartItems', 'cartItems')
            .where('orders.user = :user', { user })
            .getMany();
    }

    async getAllOrders() {
        return await this.orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.cartItems', 'cartItems')
            .getMany();
    }
}
