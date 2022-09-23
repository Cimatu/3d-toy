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

    async createUserData(eventId: number, dto: CreateUserDataDto) {
        const event = await this.eventService.getEventById(eventId);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        for (let i = 0; i < event.usersData.length; i++) {
            if (event.usersData[i].userId == dto.userId){
                throw new HttpException("User already registred on this event", HttpStatus.FORBIDDEN);
            }
        }
        const user = await this.userService.getUserById(dto.userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const userData = await this.userDataRepository.create({ ...dto, user, event })
        return await this.userDataRepository.save(userData);
    }

    async getUserDataByUser(userId: number) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.userDataRepository
            .createQueryBuilder('user-data')
            .leftJoinAndSelect('user-data.event', 'event')
            .where('user-data.userId = :userId', { userId })
            .getMany()
    }

    async getUserDataByEvent(eventId: number) {
        const event = await this.eventService.getEventById(eventId);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        return await this.userDataRepository
            .createQueryBuilder('user-data')
            .leftJoinAndSelect('user-data.user', 'user')
            .where('user-data.eventId = :eventId', { eventId: event.id })
            .getMany()
    }
}
