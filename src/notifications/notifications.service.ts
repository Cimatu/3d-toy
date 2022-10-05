import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';



@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificaionService: Repository<Notification>,
        private userService: UsersService
    ) { }

    async createNotification(dto: CreateNotificationDto) {

    }

    async getOrdersByUserId(userId: number) {
        // const user = await this.userService.deteteUserById(userId)
        // return await this.orderRepository
        //     .createQueryBuilder('orders')
        //     .leftJoinAndSelect('orders.cartItems', 'cartItems')
        //     .where('orders.user = :user', { user })
        //     .getMany();
    }

    async getAllOrders() {
        // return await this.orderRepository
        //     .createQueryBuilder('orders')
        //     .leftJoinAndSelect('orders.cartItems', 'cartItems')
        //     .getMany();
    }
}
