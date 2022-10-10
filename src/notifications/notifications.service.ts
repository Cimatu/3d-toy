import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
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

    async deleteNotificationById(id: number) {
        let news = await this.getNotificationsById(id);
        if (!news) {
            throw new HttpException("Notificaion not found", HttpStatus.NOT_FOUND);
        }
        await this.notificationRepository.delete(id);
        news = await this.getNotificationsById(id);
        if (!news) {
            return { message: "Notificaion was successfuly deleted" }
        } else {
            return { message: "Notificaion wasn't deleted" }
        }
    }

    async getAllNotifications() {
        return await this.notificationRepository
            .createQueryBuilder('notifications')
            .getMany();
    }

    async getNotificationsById(id: number) {
        console.log(1)
        return await this.notificationRepository
            .createQueryBuilder('notifications')
            .where('notifications.id = :id', { id })
            .getOne();
    }
}
