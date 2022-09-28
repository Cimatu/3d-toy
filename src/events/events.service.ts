import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
    ) { }

    async createEvent(dto: CreateEventDto) {
        return await this.eventsRepository.save(dto);
    }

    async updateEventById(id: number, dto: UpdateEventDto) {
        const event = await this.getEventById(id);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        await this.eventsRepository
            .createQueryBuilder()
            .update(Event)
            .set({ ...dto })
            .where("id = :id", { id })
            .execute();

        return await this.getEventById(id)
    }

    async deleteEventById(id: number) {
        let event = await this.getEventById(id);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        await this.eventsRepository.delete(id);
        event = await this.getEventById(id);
        if (!event) {
            return { message: "Event was successfuly deleted" }
        } else {
            return { message: "Event wasn't deleted" }
        }
    }

    async getAllEvents() {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .getMany();
    }

    async getAllEventsWithUserId(userId: number) {
        const events = await this.getAllEvents();
        let array = await Promise.all(
            events.map(async (event) => {
                if (event.usersData.length == 0) {
                    const userData = event.usersData
                    return { event, userData };
                }
                for (let i = 0; i < event.usersData.length; i++) {
                    if (event.usersData[i].userId == userId) {
                        const userData = event.usersData[i]
                        return { event, userData };
                    }
                }
            })
        )
        return array
    }

    async getEventById(id: number) {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .where('events.id = :id', { id })
            .getOne();
    }
}
