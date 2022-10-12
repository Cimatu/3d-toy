import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SetUserDto } from './dto/set-user.dto';


@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        private userService: UsersService
    ) { }

    async createNotification(dto: CreateNotificationDto) {
        return await this.notificationRepository.save(dto);
    }

    async updateNotificationById(id: number, dto: CreateNotificationDto) {
        const { name, text, date } = dto;

        const video = await this.getNotificationsById(id);
        if (!video) {
            throw new HttpException("Notification not found", HttpStatus.NOT_FOUND);
        }

        if (!name && !text && !date) {
            throw new HttpException("No dto", HttpStatus.NOT_FOUND);
        }

        await this.notificationRepository
            .createQueryBuilder()
            .update(Notification)
            .set({ ...dto })
            .where("id = :id", { id })
            .execute();
        return await this.getNotificationsById(id);
    }

    async setSeenNotification(dto: SetUserDto) {
        const { userId, notificationId } = dto;
        const notification = await this.getNotificationsById(notificationId);
        if (!notification) {
            throw new HttpException("Notificaion not found", HttpStatus.NOT_FOUND);
        }

        const users = notification.users;

        const flag = users.find(item => item.id == userId);
        if (flag) {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        notification.users = [...users, user];

        await this.notificationRepository.save(notification)

        return await this.getNotificationsById(notificationId);
    }

    async getUnseenNotifications(userId: number) {
        const notifications = await this.getAllNotifications();

        return notifications.filter((el) => el.users.find(item => item.id == userId))
    }

    async deleteNotificationById(id: number) {
        let notification = await this.getNotificationsById(id);
        if (!notification) {
            throw new HttpException("Notificaion not found", HttpStatus.NOT_FOUND);
        }
        await this.notificationRepository.delete(id);
        notification = await this.getNotificationsById(id);
        if (!notification) {
            return { message: "Notificaion was successfuly deleted" }
        } else {
            return { message: "Notificaion wasn't deleted" }
        }
    }

    async getAllNotifications() {
        return await this.notificationRepository
            .createQueryBuilder('notifications')
            .leftJoinAndSelect('notifications.users', 'users')
            .getMany();
    }

    async getNotificationsById(id: number) {
        return await this.notificationRepository
            .createQueryBuilder('notifications')
            .leftJoinAndSelect('notifications.users', 'users')
            .where('notifications.id = :id', { id })
            .getOne();
    }
}
