import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private userService: UsersService
    ) { }

    async createOrder(dto: CreateOrderDto) {
        const { country, city, cart } = dto;
        const { cartItems, quantity, total } = cart;
        const order = await this.orderRepository.create({ country, city, cartItems, quantity, total, user: cart.user })
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
