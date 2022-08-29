import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { EventsService } from '../events.service';
import { UserData } from './usersData.entity';
import { CreateUserDataDto } from '../dto/create-userData.dto';


@Injectable()
export class UserDataService {
    constructor(
        @InjectRepository(UserData)
        private readonly userDataRepository: Repository<UserData>,
        private userService: UsersService,
        private eventService: EventsService
    ) { }


    async createUserData(eventId: number, userData: CreateUserDataDto) {
        const user = await this.userService.getUserById(userData.userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const event = await this.eventService.getEventById(eventId);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        const order = await this.userDataRepository.create({ user, event, ...userData.fields })
        return await this.userDataRepository.save(order);
    }

    async getUserDataByUser(userId: number) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.userDataRepository
            .createQueryBuilder('user-data')
            .leftJoinAndSelect('user-data.event', 'event')
            .where('user-data.user = :user', { user })
            .getMany()
    }

    async getUserDataByEvent(eventId: number) {
        const event = await this.eventService.getEventById(eventId);
        if (!event) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.userDataRepository
            .createQueryBuilder('user-data')
            .leftJoinAndSelect('user-data.user', 'user')
            .where('user-data.event = :event', { event })
            .getMany()
    }
}
